import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../api/firebase";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="form-page">
      <form className="form-container" onSubmit={handleRegister}>
        <h2>Đăng ký</h2>
        <p className="form-subtitle">
          Tạo tài khoản quản lý tài chính
        </p>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Mật khẩu</label>
          <input
            type="password"
            placeholder="Tối thiểu 6 ký tự"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && (
          <p className="form-error">{error}</p>
        )}

        <button className="form-btn">Đăng ký</button>

        <div className="form-footer">
          Đã có tài khoản?{" "}
          <Link to="/login">Đăng nhập</Link>
        </div>
      </form>
    </div>
  );
}

export default Register;
