/**
 * Capitalize the first letter of a string
 */
export const capitalizeFirstLetter = (val) => {
  if (!val) return "";
  return `${val.charAt(0).toUpperCase()}${val.slice(1)}`;
};
/**
 * Format a number to currency
 */

/**
 * Phía FE sẽ tự tạo 1 card đăc biệt để placeholder
 * Card này sẽ được ẩn ở giao diện UI người dùng
 * Cấu trúc Id của card này là Unique rất đơn giản, không cần random phức tạp:
 * "columnId-placeholder-card" (mỗi column chỉ có thể có tối đa 1 cái Placeholder card)
 * Quan trọng nhất là phải đầy đủ (-id, boardId, columnId, FE_PlaceholderCard) để tránh trùng lặp với các card khác
 */
export const generatePlacehodelrCard = (column) => {
  return {
    _id: `${column._id}-placeholder-card`,
    boardId: column.boardId,
    columnId: column._id,
    FE_PlaceholderCard: true,
  };
};
