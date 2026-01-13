// Utility functions để chuẩn hóa dữ liệu theo tháng

/**
 * Chuẩn hóa ngày thành format YYYY-MM để nhóm theo tháng
 * @param {string|Date} date - Ngày cần chuẩn hóa
 * @returns {string} Format YYYY-MM
 */
export function normalizeDateToMonth(date) {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
}

/**
 * Chuẩn hóa ngày thành format YYYY-MM-DD
 * @param {string|Date} date - Ngày cần chuẩn hóa
 * @returns {string} Format YYYY-MM-DD
 */
export function normalizeDate(date) {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Gom dữ liệu giao dịch theo tháng
 * @param {Array} transactions - Mảng các giao dịch
 * @returns {object} Object với key là YYYY-MM và value là mảng giao dịch
 */
export function groupTransactionsByMonth(transactions) {
  const grouped = {};
  
  transactions.forEach(transaction => {
    const monthKey = normalizeDateToMonth(transaction.date);
    if (!grouped[monthKey]) {
      grouped[monthKey] = [];
    }
    grouped[monthKey].push(transaction);
  });

  return grouped;
}

/**
 * Tính tổng thu - chi theo tháng
 * @param {Array} transactions - Mảng các giao dịch
 * @returns {object} Object với key là YYYY-MM và value là { income, expense, net }
 */
export function calculateMonthlyTotals(transactions) {
  const grouped = groupTransactionsByMonth(transactions);
  const totals = {};

  Object.keys(grouped).forEach(month => {
    const monthTransactions = grouped[month];
    let income = 0;
    let expense = 0;

    monthTransactions.forEach(transaction => {
      const amount = Number(transaction.amount) || 0;
      if (transaction.type === 'income') {
        income += amount;
      } else if (transaction.type === 'expense') {
        expense += amount;
      }
    });

    totals[month] = {
      income,
      expense,
      net: income - expense
    };
  });

  return totals;
}

/**
 * Format số tiền thành chuỗi có dấu phẩy
 * @param {number} amount - Số tiền
 * @returns {string} Chuỗi đã format
 */
export function formatCurrency(amount) {
  return new Intl.NumberFormat('vi-VN').format(amount);
}

/**
 * Lấy tên tháng bằng tiếng Việt
 * @param {string} monthKey - Format YYYY-MM
 * @returns {string} Tên tháng
 */
export function getMonthName(monthKey) {
  const [year, month] = monthKey.split('-');
  const monthNames = [
    'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4',
    'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8',
    'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
  ];
  return `${monthNames[parseInt(month) - 1]} ${year}`;
}

