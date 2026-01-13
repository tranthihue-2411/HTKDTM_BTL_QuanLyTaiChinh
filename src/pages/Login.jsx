import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../api/firebase";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Vui lòng nhập đầy đủ email và mật khẩu");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setError("Email hoặc mật khẩu không đúng");
    }
  };

  return (
    <div className="form-page">
      <form className="form-container" onSubmit={handleLogin}>
        <h2>Đăng nhập</h2>
        <p className="form-subtitle">
          Chào mừng bạn quay lại 👋
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
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && (
          <p className="form-error">{error}</p>
        )}

        <button className="form-btn">Đăng nhập</button>

        <div className="form-footer">
          Chưa có tài khoản?{" "}
          <Link to="/register">Đăng ký</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
