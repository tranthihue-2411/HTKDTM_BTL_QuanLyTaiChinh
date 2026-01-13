import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "./api/firebase";

import MainLayout from "./layouts/MainLayout";

import Login from "./pages/Login";
import Register from "./pages/Register";

import AddTransaction from "./pages/AddTransaction";
import Budget from "./pages/Budget";
import Dashboard from "./pages/Dashboard";
import Insight from "./pages/Insight";

import Profile from "./pages/Profile";


// Component chặn route khi chưa đăng nhập
function RequireAuth({ children }) {
  const [user, loading] = useAuthState(auth);

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;

  return children;
}

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected routes */}
      <Route
        path="/*"
        element={
          <RequireAuth>
            <MainLayout>
              <Routes>
                <Route path="/" element={<AddTransaction />} />
                <Route path="/budget" element={<Budget />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/insight" element={<Insight />} />
                <Route path="/profile" element={<Profile />} />

              </Routes>
            </MainLayout>
          </RequireAuth>
        }
      />
    </Routes>
  );
}

export default App;
