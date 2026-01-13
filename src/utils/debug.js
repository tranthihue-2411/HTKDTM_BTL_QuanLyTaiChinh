// Utility để debug và kiểm tra cấu hình

import { N8N_CONFIG, GOOGLE_SHEETS_CONFIG } from "./constants";

/**
 * Kiểm tra và log cấu hình webhook
 */
export function checkWebhookConfig() {
  console.log("=== WEBHOOK CONFIGURATION CHECK ===");
  console.log("N8N_CONFIG.WEBHOOK_URL:", N8N_CONFIG.WEBHOOK_URL || "❌ CHƯA CẤU HÌNH");
  console.log("GOOGLE_SHEETS_CONFIG.WEBHOOK_URL:", GOOGLE_SHEETS_CONFIG.WEBHOOK_URL || "❌ CHƯA CẤU HÌNH");
  
  const webhookUrl = N8N_CONFIG.WEBHOOK_URL || GOOGLE_SHEETS_CONFIG.WEBHOOK_URL;
  
  if (webhookUrl) {
    console.log("✅ Webhook URL được tìm thấy:", webhookUrl);
    console.log("URL hợp lệ:", webhookUrl.startsWith("http"));
  } else {
    console.error("❌ Không tìm thấy webhook URL!");
    console.log("Vui lòng kiểm tra file .env trong thư mục gốc của project");
  }
  
  console.log("===================================");
  
  return webhookUrl;
}

/**
 * Test kết nối đến webhook
 */
export async function testWebhookConnection(webhookUrl) {
  try {
    console.log("Testing webhook connection to:", webhookUrl);
    
    const testData = {
      userId: "test-user",
      type: "expense",
      amount: 1000,
      category: "Test",
      date: new Date().toISOString().split("T")[0],
      month: new Date().toISOString().substring(0, 7),
      description: "Test connection",
      createdAt: new Date().toISOString(),
      timestamp: Date.now()
    };
    
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testData),
    });
    
    console.log("Test response status:", response.status);
    console.log("Test response ok:", response.ok);
    
    return {
      success: response.ok,
      status: response.status,
      statusText: response.statusText
    };
  } catch (error) {
    console.error("Test connection error:", error);
    return {
      success: false,
      error: error.message
    };
  }
}

