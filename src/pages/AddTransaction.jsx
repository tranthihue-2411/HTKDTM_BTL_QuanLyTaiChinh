import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { saveTransactionToSheets } from "../api/googleSheets";
import { validateTransaction } from "../utils/validation";
import { CATEGORIES, TRANSACTION_TYPES } from "../utils/constants";
import { checkWebhookConfig } from "../utils/debug";

function AddTransaction() {
  const auth = getAuth();
  const user = auth.currentUser;

  const [formData, setFormData] = useState({
    type: TRANSACTION_TYPES.EXPENSE,
    amount: "",
    category: "",
    date: new Date().toISOString().split("T")[0], // Ngày hôm nay
    description: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: "", text: "" });

  // Kiểm tra cấu hình webhook khi component mount
  useEffect(() => {
    checkWebhookConfig();
  }, []);

  // Kiểm tra cấu hình webhook khi component mount
  useEffect(() => {
    checkWebhookConfig();
  }, []);

  // Lấy danh sách danh mục theo loại giao dịch
  const categories = formData.type === TRANSACTION_TYPES.INCOME 
    ? CATEGORIES.INCOME 
    : CATEGORIES.EXPENSE;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Xóa lỗi khi người dùng bắt đầu nhập lại
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitMessage({ type: "", text: "" });

    // Validate dữ liệu
    const validation = validateTransaction(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Ghi vào Google Sheets qua n8n webhook
      await saveTransactionToSheets(formData, user?.uid || "");

      // Reset form sau khi lưu thành công
      setFormData({
        type: TRANSACTION_TYPES.EXPENSE,
        amount: "",
        category: "",
        date: new Date().toISOString().split("T")[0],
        description: ""
      });
      setErrors({});
      setSubmitMessage({
        type: "success",
        text: "✅ Đã lưu giao dịch thành công!"
      });

      // Xóa thông báo sau 3 giây
      setTimeout(() => {
        setSubmitMessage({ type: "", text: "" });
      }, 3000);
    } catch (error) {
      console.error("Error saving transaction:", error);
      let errorMessage = "Không thể lưu giao dịch";
      
      if (error.message) {
        errorMessage = error.message;
      } else if (error.toString().includes("webhook")) {
        errorMessage = "Lỗi kết nối với n8n webhook. Vui lòng kiểm tra cấu hình.";
      }
      
      setSubmitMessage({
        type: "error",
        text: `❌ Lỗi: ${errorMessage}`
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-page">
      <form className="form-container" onSubmit={handleSubmit}>
        <h2>💰 Nhập thu – chi</h2>
        <p className="form-subtitle">
          Ghi lại khoản thu hoặc chi tiêu của bạn
        </p>

        {/* Loại giao dịch */}
        <div className="form-group">
          <label>Loại giao dịch</label>
          <div className="radio-group">
            <label className="radio-label">
              <input
                type="radio"
                name="type"
                value={TRANSACTION_TYPES.EXPENSE}
                checked={formData.type === TRANSACTION_TYPES.EXPENSE}
                onChange={handleChange}
              />
              <span>Chi tiêu</span>
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="type"
                value={TRANSACTION_TYPES.INCOME}
                checked={formData.type === TRANSACTION_TYPES.INCOME}
                onChange={handleChange}
              />
              <span>Thu nhập</span>
            </label>
          </div>
          {errors.type && <span className="error-text">{errors.type}</span>}
        </div>

        {/* Số tiền */}
        <div className="form-group">
          <label>Số tiền (VNĐ)</label>
          <input
            type="number"
            name="amount"
            placeholder="Ví dụ: 500000"
            value={formData.amount}
            onChange={handleChange}
            className={errors.amount ? "error" : ""}
            min="1"
            step="1000"
          />
          {errors.amount && <span className="error-text">{errors.amount}</span>}
        </div>

        {/* Danh mục */}
        <div className="form-group">
          <label>Danh mục</label>
          <select
            name="category"
            value={formData.category === "Khác" || categories.includes(formData.category) ? formData.category : ""}
            onChange={(e) => {
              if (e.target.value === "Khác") {
                setFormData(prev => ({ ...prev, category: "" }));
              } else {
                handleChange(e);
              }
            }}
            className={errors.category ? "error" : ""}
          >
            <option value="">-- Chọn danh mục --</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
            <option value="Khác">Khác (tự nhập)</option>
          </select>
          {(!categories.includes(formData.category) && formData.category !== "") && (
            <input
              type="text"
              name="category"
              placeholder="Nhập danh mục khác..."
              value={formData.category}
              onChange={handleChange}
              className="mt-2"
            />
          )}
          {errors.category && <span className="error-text">{errors.category}</span>}
        </div>

        {/* Ngày */}
        <div className="form-group">
          <label>Ngày</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className={errors.date ? "error" : ""}
            max={new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split("T")[0]}
            min={new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString().split("T")[0]}
          />
          {errors.date && <span className="error-text">{errors.date}</span>}
        </div>

        {/* Mô tả (tùy chọn) */}
        <div className="form-group">
          <label>Mô tả (tùy chọn)</label>
          <textarea
            name="description"
            placeholder="Ghi chú thêm về giao dịch..."
            value={formData.description}
            onChange={handleChange}
            rows="3"
            maxLength="200"
          />
        </div>

        {/* Thông báo */}
        {submitMessage.text && (
          <div className={`submit-message ${submitMessage.type}`}>
            {submitMessage.text}
          </div>
        )}

        {/* Nút submit */}
        <button 
          type="submit" 
          className="form-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Đang lưu..." : "💾 Lưu giao dịch"}
        </button>
      </form>
    </div>
  );
}

export default AddTransaction;
