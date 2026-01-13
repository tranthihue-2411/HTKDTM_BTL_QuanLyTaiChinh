import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Header() {
  const auth = getAuth();
  const navigate = useNavigate();
  const user = auth.currentUser;

  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const displayName = user?.email
    ? user.email.split("@")[0]
    : "User";

  return (
    <div className="header">
      <h3>💰 Quản lý tài chính</h3>

      <div className="user-box">
        {/* Click vào đây */}
        <div
          className="user-info clickable"
          onClick={() => setOpen(!open)}
        >
          <div className="avatar">
            {displayName.charAt(0).toUpperCase()}
          </div>
          <span className="user-name">{displayName}</span>
        </div>

        {open && (
          <div className="user-dropdown">
            <p className="user-email">{user?.email}</p>

            <button
              className="profile-btn"
              onClick={() => navigate("/profile")}
            >
              Xem thông tin
            </button>

            <button
              className="logout-btn danger"
              onClick={handleLogout}
            >
              Đăng xuất
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
