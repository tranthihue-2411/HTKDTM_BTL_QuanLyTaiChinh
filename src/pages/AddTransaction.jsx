function AddTransaction() {
  return (
    <div className="form-page">
      <form className="form-container">
        <h2>Nhập thu – chi</h2>
        <p className="form-subtitle">
          Ghi lại khoản thu hoặc chi tiêu của bạn
        </p>

        <div className="form-group">
          <label>Số tiền</label>
          <input
            type="number"
            placeholder="Ví dụ: 500000"
          />
        </div>

        <div className="form-group">
          <label>Danh mục</label>
          <input
            placeholder="Ăn uống, đi lại, mua sắm..."
          />
        </div>

        <div className="form-group">
          <label>Ngày</label>
          <input type="date" />
        </div>

        <button className="form-btn">
          Lưu giao dịch
        </button>
      </form>
    </div>
  );
}

export default AddTransaction;
