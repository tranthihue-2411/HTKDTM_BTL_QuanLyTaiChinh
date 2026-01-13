// Hằng số dùng chung cho ứng dụng

// Danh mục thu - chi
export const CATEGORIES = {
  INCOME: [
    "Lương",
    "Thưởng",
    "Đầu tư",
    "Kinh doanh",
    "Khác"
  ],
  EXPENSE: [
    "Ăn uống",
    "Đi lại",
    "Mua sắm",
    "Giải trí",
    "Y tế",
    "Giáo dục",
    "Hóa đơn",
    "Khác"
  ]
};

// Loại giao dịch
export const TRANSACTION_TYPES = {
  INCOME: "income",
  EXPENSE: "expense"
};

// Màu sắc cho biểu đồ
export const CHART_COLORS = {
  PRIMARY: "#8ac5db",
  SECONDARY: "#b7b4ea",
  ACCENT: "#7ac7ed",
  SUCCESS: "#10b981",
  WARNING: "#f59e0b",
  DANGER: "#ef4444"
};

// Cấu hình Google Sheets (sẽ được thay thế bằng biến môi trường)
export const GOOGLE_SHEETS_CONFIG = {
  // URL webhook để ghi vào Google Sheets (qua n8n hoặc Apps Script)
  WEBHOOK_URL: import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK_URL || "",
  // Hoặc Sheet ID và Range nếu dùng API trực tiếp
  SHEET_ID: import.meta.env.VITE_GOOGLE_SHEET_ID || "",
  SHEET_NAME: "Transactions"
};

// Cấu hình n8n
export const N8N_CONFIG = {
  WEBHOOK_URL: import.meta.env.VITE_N8N_WEBHOOK_URL || ""
};

