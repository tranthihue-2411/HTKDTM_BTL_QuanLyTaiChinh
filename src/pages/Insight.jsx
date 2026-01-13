import { useState } from "react";
import { formatCurrency } from "../utils/dataNormalization";

function Insight() {
  // Dữ liệu mẫu cho insights và cảnh báo
  const [insights] = useState([
    {
      type: "warning",
      icon: "⚠️",
      title: "Chi tiêu ăn uống vượt ngân sách",
      message: "Bạn đã chi 2.5 triệu trong tháng này, vượt 25% so với ngân sách 2 triệu.",
      category: "Ăn uống",
      amount: 2500000,
      budget: 2000000
    },
    {
      type: "info",
      icon: "💡",
      title: "Gợi ý tiết kiệm",
      message: "Chi tiêu đi lại của bạn giảm 15% so với tháng trước. Tiếp tục phát huy!",
      category: "Đi lại"
    },
    {
      type: "success",
      icon: "✅",
      title: "Đạt mục tiêu tiết kiệm",
      message: "Bạn đã tiết kiệm được 6.5 triệu trong tháng này, đạt 130% mục tiêu.",
      amount: 6500000,
      target: 5000000
    },
    {
      type: "alert",
      icon: "🚨",
      title: "Chi tiêu tăng bất thường",
      message: "Chi tiêu tuần này tăng 40% so với tuần trước. Hãy kiểm tra lại các khoản chi.",
      trend: "+40%"
    }
  ]);

  const getInsightClass = (type) => {
    const classes = {
      warning: "insight-warning",
      info: "insight-info",
      success: "insight-success",
      alert: "insight-alert"
    };
    return classes[type] || "insight-info";
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>🧠 Insight & Cảnh báo</h2>
        <p className="page-subtitle">
          Phân tích thông minh và cảnh báo về tình hình tài chính của bạn
        </p>
      </div>

      <div className="insights-grid">
        {insights.map((insight, index) => (
          <div key={index} className={`insight-card ${getInsightClass(insight.type)}`}>
            <div className="insight-header">
              <span className="insight-icon">{insight.icon}</span>
              <h3>{insight.title}</h3>
            </div>
            <div className="insight-body">
              <p>{insight.message}</p>
              {insight.category && (
                <div className="insight-detail">
                  <strong>Danh mục:</strong> {insight.category}
                </div>
              )}
              {insight.amount && (
                <div className="insight-detail">
                  <strong>Số tiền:</strong> {formatCurrency(insight.amount)} VNĐ
                </div>
              )}
              {insight.budget && (
                <div className="insight-detail">
                  <strong>Ngân sách:</strong> {formatCurrency(insight.budget)} VNĐ
                </div>
              )}
              {insight.target && (
                <div className="insight-detail">
                  <strong>Mục tiêu:</strong> {formatCurrency(insight.target)} VNĐ
                </div>
              )}
              {insight.trend && (
                <div className="insight-trend">
                  <strong>Xu hướng:</strong> <span className="trend-value">{insight.trend}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Phần gợi ý hành động */}
      <div className="recommendations-section">
        <h3>💡 Gợi ý hành động</h3>
        <div className="recommendations-list">
          <div className="recommendation-item">
            <span className="rec-number">1</span>
            <div className="rec-content">
              <h4>Giảm chi tiêu ăn uống</h4>
              <p>Hãy cân nhắc nấu ăn tại nhà nhiều hơn để tiết kiệm chi phí.</p>
            </div>
          </div>
          <div className="recommendation-item">
            <span className="rec-number">2</span>
            <div className="rec-content">
              <h4>Đánh giá lại ngân sách</h4>
              <p>Cân nhắc điều chỉnh ngân sách cho phù hợp với thực tế chi tiêu.</p>
            </div>
          </div>
          <div className="recommendation-item">
            <span className="rec-number">3</span>
            <div className="rec-content">
              <h4>Lập kế hoạch tiết kiệm</h4>
              <p>Với số dư hiện tại, bạn có thể đặt mục tiêu tiết kiệm cao hơn.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Insight;
