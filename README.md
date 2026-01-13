
## npm install react-router-dom : Gắn Router (chuyển trang)
## Các bước để chạy: 
Chỉ hoạt động chỉnh sửa trong folder src mọi cái khác không được động vào 
## Tạo project: 
npm create vite@latest my-project
## Chạy project
npm run dev
## Cấu trúc và công nghệ hiện tại của toàn dự án
Frontend (React)
   ├─ Firebase Auth (Login / Register)
   ├─ Google Sheet (Thu – chi)
   ├─ n8n (ETL)
   └─ Superset (Dashboard)
## Cấu trúc để hiểu các file 
BTL_QUANLYTAICHINH/
│
├src/
├─ api/
│  └─ apiClient.js
│     → Nơi gọi API / Firebase / backend sau này
│     → FE chỉ gửi – nhận JSON, không xử lý logic nghiệp vụ
│
├─ components/
│  ├─ Header.jsx
│  │   → Thanh trên cùng (tên app, user, logout)
│  │
│  ├─ Sidebar.jsx
│  │   → Menu điều hướng: Dashboard, Thu–chi, Ngân sách, Insight
│  │
│  └─ NotificationBox.jsx
│      → Hiển thị cảnh báo thông minh
│      → Ví dụ: vượt ngân sách, chi tiêu tăng bất thường
│
├─ pages/
│  ├─ AddTransaction.jsx
│  │   → Trang nhập thu – chi
│  │
│  ├─ Budget.jsx
│  │   → Trang quản lý ngân sách
│  │
│  ├─ Dashboard.jsx
│  │   → Trang tổng quan BI (biểu đồ, số liệu)
│  │
│  └─ Insight.jsx
│      → Trang diễn giải thông minh (AI / rule-based)
│
├─ layouts/
│  └─ MainLayout.jsx
│      → Khung giao diện CHUNG cho toàn app
│      → Gồm: Sidebar + Header + vùng hiển thị page
│
├─ utils/
│  └─ constants.js
│      → Hằng số dùng chung
│      → Ví dụ: category chi tiêu, màu biểu đồ, role
│
├─ App.jsx 
│   → Khai báo router + bọc MainLayout
│
└─ main.jsx
    → Entry point khởi động React


## Sử dụng để lưu trữ ng dùng Firebase: 
npm install firebase
npm install react-firebase-hooks

