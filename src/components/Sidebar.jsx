import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <h3>💰 Quản lý tài chính</h3>

      <nav>
        <p><Link to="/">Thu – Chi</Link></p>
        <p><Link to="/dashboard">Dashboard</Link></p>
        <p><Link to="/budget">Ngân sách</Link></p>
        <p><Link to="/insight">Insight</Link></p>
      </nav>
    </div>
  );
}

export default Sidebar;
