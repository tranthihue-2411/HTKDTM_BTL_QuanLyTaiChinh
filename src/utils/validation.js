// Utility functions để validate dữ liệu nhập vào

/**
 * Validate số tiền
 * @param {number|string} amount - Số tiền cần validate
 * @returns {object} { isValid: boolean, error: string }
 */
export function validateAmount(amount) {
  if (!amount || amount === "") {
    return { isValid: false, error: "Vui lòng nhập số tiền" };
  }

  const numAmount = Number(amount);
  
  if (isNaN(numAmount)) {
    return { isValid: false, error: "Số tiền phải là số hợp lệ" };
  }

  if (numAmount <= 0) {
    return { isValid: false, error: "Số tiền phải lớn hơn 0" };
  }

  if (numAmount > 1000000000) {
    return { isValid: false, error: "Số tiền quá lớn (tối đa 1 tỷ)" };
  }

  return { isValid: true, error: "" };
}

/**
 * Validate ngày tháng
 * @param {string} date - Ngày cần validate (format: YYYY-MM-DD)
 * @returns {object} { isValid: boolean, error: string }
 */
export function validateDate(date) {
  if (!date || date === "") {
    return { isValid: false, error: "Vui lòng chọn ngày" };
  }

  const selectedDate = new Date(date);
  const today = new Date();
  today.setHours(23, 59, 59, 999); // Đặt về cuối ngày hôm nay

  if (isNaN(selectedDate.getTime())) {
    return { isValid: false, error: "Ngày không hợp lệ" };
  }

  // Cho phép nhập từ 1 năm trước đến tương lai
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  
  if (selectedDate < oneYearAgo) {
    return { isValid: false, error: "Ngày không được quá 1 năm trước" };
  }

  // Cho phép nhập đến 1 năm sau
  const oneYearLater = new Date();
  oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);
  
  if (selectedDate > oneYearLater) {
    return { isValid: false, error: "Ngày không được quá 1 năm sau" };
  }

  return { isValid: true, error: "" };
}

/**
 * Validate danh mục
 * @param {string} category - Danh mục cần validate
 * @returns {object} { isValid: boolean, error: string }
 */
export function validateCategory(category) {
  if (!category || category.trim() === "") {
    return { isValid: false, error: "Vui lòng chọn hoặc nhập danh mục" };
  }

  if (category.length > 50) {
    return { isValid: false, error: "Danh mục không được quá 50 ký tự" };
  }

  return { isValid: true, error: "" };
}

/**
 * Validate loại giao dịch
 * @param {string} type - Loại giao dịch (income/expense)
 * @returns {object} { isValid: boolean, error: string }
 */
export function validateTransactionType(type) {
  if (!type || (type !== "income" && type !== "expense")) {
    return { isValid: false, error: "Vui lòng chọn loại giao dịch" };
  }

  return { isValid: true, error: "" };
}

/**
 * Validate toàn bộ form giao dịch
 * @param {object} transaction - Object chứa thông tin giao dịch
 * @returns {object} { isValid: boolean, errors: object }
 */
export function validateTransaction(transaction) {
  const errors = {};
  
  const amountValidation = validateAmount(transaction.amount);
  if (!amountValidation.isValid) {
    errors.amount = amountValidation.error;
  }

  const dateValidation = validateDate(transaction.date);
  if (!dateValidation.isValid) {
    errors.date = dateValidation.error;
  }

  const categoryValidation = validateCategory(transaction.category);
  if (!categoryValidation.isValid) {
    errors.category = categoryValidation.error;
  }

  const typeValidation = validateTransactionType(transaction.type);
  if (!typeValidation.isValid) {
    errors.type = typeValidation.error;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

