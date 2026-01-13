// API client để ghi dữ liệu vào Google Sheets
// Có thể dùng Google Sheets API trực tiếp hoặc qua webhook (n8n/Apps Script)

import { GOOGLE_SHEETS_CONFIG, N8N_CONFIG } from "../utils/constants";
import { normalizeDateToMonth, normalizeDate } from "../utils/dataNormalization";

/**
 * Ghi giao dịch vào Google Sheets qua webhook (n8n hoặc Apps Script)
 * @param {object} transaction - Object chứa thông tin giao dịch
 * @param {string} userId - User ID từ Firebase Auth
 * @returns {Promise<object>} Response từ API
 */
export async function saveTransactionToSheets(transaction, userId) {
  // Chuẩn hóa dữ liệu trước khi gửi
  const normalizedData = {
    userId: userId,
    type: transaction.type, // "income" hoặc "expense"
    amount: Number(transaction.amount),
    category: transaction.category,
    date: normalizeDate(transaction.date),
    month: normalizeDateToMonth(transaction.date), // Chuẩn hóa theo tháng
    description: transaction.description || "",
    createdAt: new Date().toISOString(),
    timestamp: Date.now()
  };

  // Ưu tiên dùng n8n webhook nếu có
  const webhookUrl = N8N_CONFIG.WEBHOOK_URL || GOOGLE_SHEETS_CONFIG.WEBHOOK_URL;

  if (!webhookUrl) {
    throw new Error("Chưa cấu hình webhook URL. Vui lòng thêm VITE_N8N_WEBHOOK_URL hoặc VITE_GOOGLE_SHEETS_WEBHOOK_URL vào file .env");
  }

  try {
    console.log("Sending data to webhook:", webhookUrl);
    console.log("Data:", normalizedData);
    
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(normalizedData),
    });

    console.log("Response status:", response.status);
    console.log("Response ok:", response.ok);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error response:", errorText);
      throw new Error(`Lỗi khi ghi vào Google Sheets (${response.status}): ${errorText || response.statusText}`);
    }

    // Kiểm tra xem response có phải JSON không
    const contentType = response.headers.get("content-type");
    let result;
    
    if (contentType && contentType.includes("application/json")) {
      result = await response.json();
    } else {
      const text = await response.text();
      console.log("Non-JSON response:", text);
      // Nếu n8n trả về text thay vì JSON, vẫn coi là thành công
      result = { success: true, message: text || "Data saved successfully" };
    }

    return {
      success: true,
      data: result,
      normalizedData: normalizedData
    };
  } catch (error) {
    console.error("Error saving to Google Sheets:", error);
    
    // Xử lý các loại lỗi khác nhau
    if (error.name === "TypeError" && error.message.includes("fetch")) {
      throw new Error("Không thể kết nối đến n8n webhook. Vui lòng kiểm tra URL và đảm bảo workflow đã được publish.");
    }
    
    if (error.message.includes("Failed to fetch") || error.message.includes("NetworkError")) {
      throw new Error("Lỗi kết nối mạng. Vui lòng kiểm tra kết nối internet và URL webhook.");
    }
    
    throw error;
  }
}

/**
 * Ghi nhiều giao dịch cùng lúc (batch)
 * @param {Array} transactions - Mảng các giao dịch
 * @param {string} userId - User ID từ Firebase Auth
 * @returns {Promise<object>} Response từ API
 */
export async function saveBatchTransactionsToSheets(transactions, userId) {
  const normalizedData = transactions.map(transaction => ({
    userId: userId,
    type: transaction.type,
    amount: Number(transaction.amount),
    category: transaction.category,
    date: normalizeDate(transaction.date),
    description: transaction.description || "",
    createdAt: new Date().toISOString(),
    timestamp: Date.now()
  }));

  const webhookUrl = N8N_CONFIG.WEBHOOK_URL || GOOGLE_SHEETS_CONFIG.WEBHOOK_URL;

  if (!webhookUrl) {
    throw new Error("Chưa cấu hình webhook URL");
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        batch: true,
        transactions: normalizedData
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Lỗi khi ghi batch vào Google Sheets: ${errorText}`);
    }

    const result = await response.json();
    return {
      success: true,
      data: result,
      count: normalizedData.length
    };
  } catch (error) {
    console.error("Error saving batch to Google Sheets:", error);
    throw error;
  }
}

