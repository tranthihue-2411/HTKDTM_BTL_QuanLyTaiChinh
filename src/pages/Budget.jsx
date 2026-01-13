import { useState } from "react";
import { CATEGORIES } from "../utils/constants";
import { formatCurrency } from "../utils/dataNormalization";

function Budget() {
  const [budgets, setBudgets] = useState({
    "Ăn uống": 2000000,
    "Đi lại": 1000000,
    "Mua sắm": 1500000,
    "Giải trí": 500000,
    "Y tế": 1000000,
    "Giáo dục": 2000000,
    "Hóa đơn": 1500000
  });

  const [editingCategory, setEditingCategory] = useState(null);
  const [editValue, setEditValue] = useState("");

  const handleEdit = (category) => {
    setEditingCategory(category);
    setEditValue(budgets[category]?.toString() || "");
  };

  const handleSave = (category) => {
    const amount = Number(editValue);
    if (amount >= 0) {
      setBudgets(prev => ({
        ...prev,
        [category]: amount
      }));
    }
    setEditingCategory(null);
    setEditValue("");
  };

  const handleCancel = () => {
    setEditingCategory(null);
    setEditValue("");
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>📊 Quản lý ngân sách</h2>
        <p className="page-subtitle">
          Thiết lập ngân sách theo danh mục để kiểm soát chi tiêu
        </p>
      </div>

      <div className="budget-grid">
        {CATEGORIES.EXPENSE.map(category => (
          <div key={category} className="budget-card">
            <div className="budget-header">
              <h3>{category}</h3>
            </div>
            <div className="budget-content">
              {editingCategory === category ? (
                <div className="budget-edit">
                  <input
                    type="number"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    placeholder="Nhập số tiền"
                    min="0"
                    step="10000"
                    autoFocus
                  />
                  <div className="budget-actions">
                    <button
                      className="btn-save"
                      onClick={() => handleSave(category)}
                    >
                      Lưu
                    </button>
                    <button
                      className="btn-cancel"
                      onClick={handleCancel}
                    >
                      Hủy
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="budget-amount">
                    {formatCurrency(budgets[category] || 0)} VNĐ
                  </div>
                  <button
                    className="btn-edit"
                    onClick={() => handleEdit(category)}
                  >
                    Chỉnh sửa
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="budget-summary">
        <div className="summary-card">
          <h3>Tổng ngân sách</h3>
          <div className="summary-amount">
            {formatCurrency(
              Object.values(budgets).reduce((sum, val) => sum + (val || 0), 0)
            )} VNĐ
          </div>
        </div>
      </div>
    </div>
  );
}

export default Budget;
