import { useState, useEffect } from "react";
import { formatCurrency, getMonthName } from "../utils/dataNormalization";

function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [isLoading, setIsLoading] = useState(false);

  // Dữ liệu mẫu (sau này sẽ lấy từ API/Superset)
  const mockData = {
    totalIncome: 15000000,
    totalExpense: 8500000,
    netIncome: 6500000,
    topCategories: [
      { name: "Ăn uống", amount: 2500000, percentage: 29 },
      { name: "Mua sắm", amount: 2000000, percentage: 24 },
      { name: "Đi lại", amount: 1500000, percentage: 18 },
      { name: "Giải trí", amount: 1000000, percentage: 12 },
      { name: "Khác", amount: 1500000, percentage: 17 }
    ]
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>📈 Dashboard</h2>
        <p className="page-subtitle">
          Tổng quan tài chính và phân tích chi tiêu
        </p>
        <div className="period-selector">
          <button
            className={selectedPeriod === "week" ? "active" : ""}
            onClick={() => setSelectedPeriod("week")}
          >
            Tuần
          </button>
          <button
            className={selectedPeriod === "month" ? "active" : ""}
            onClick={() => setSelectedPeriod("month")}
          >
            Tháng
          </button>
          <button
            className={selectedPeriod === "year" ? "active" : ""}
            onClick={() => setSelectedPeriod("year")}
          >
            Năm
          </button>
        </div>
      </div>

      {/* Thống kê tổng quan */}
      <div className="stats-grid">
        <div className="stat-card income">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <h3>Tổng thu</h3>
            <div className="stat-amount">{formatCurrency(mockData.totalIncome)} VNĐ</div>
          </div>
        </div>

        <div className="stat-card expense">
          <div className="stat-icon">💸</div>
          <div className="stat-content">
            <h3>Tổng chi</h3>
            <div className="stat-amount">{formatCurrency(mockData.totalExpense)} VNĐ</div>
          </div>
        </div>

        <div className="stat-card net">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3>Số dư</h3>
            <div className={`stat-amount ${mockData.netIncome >= 0 ? 'positive' : 'negative'}`}>
              {formatCurrency(mockData.netIncome)} VNĐ
            </div>
          </div>
        </div>
      </div>

      {/* Biểu đồ phân bổ chi tiêu */}
      <div className="chart-section">
        <h3>Phân bổ chi tiêu theo danh mục</h3>
        <div className="chart-container">
          {mockData.topCategories.map((category, index) => (
            <div key={category.name} className="chart-item">
              <div className="chart-label">
                <span>{category.name}</span>
                <span className="chart-amount">{formatCurrency(category.amount)}</span>
              </div>
              <div className="chart-bar">
                <div
                  className="chart-fill"
                  style={{
                    width: `${category.percentage}%`,
                    backgroundColor: `hsl(${200 + index * 30}, 70%, 60%)`
                  }}
                />
                <span className="chart-percentage">{category.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Nhúng Superset Dashboard */}
      <div className="superset-section">
        <h3>Dashboard nâng cao (Apache Superset)</h3>
        <div className="superset-placeholder">
          <p>📊 Nhúng Apache Superset tại đây</p>
          <p className="placeholder-note">
            Sử dụng iframe để nhúng dashboard Superset:
            <br />
            <code>{'<iframe src="YOUR_SUPERSET_URL" />'}</code>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
