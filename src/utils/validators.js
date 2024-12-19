// Một vài biểu thức chính quy - Regular Expression và custom message.
// Về Regular Expression khá hại não: https://viblo.asia/p/hoc-regular-expression-va-cuoc-doi-ban-se-bot-kho-updated-v22-Az45bnoO5xY
export const FIELD_REQUIRED_MESSAGE = "This field is required.";
export const EMAIL_RULE = /^\S+@\S+\.\S+$/;
export const EMAIL_RULE_MESSAGE = "Email is invalid. (example@namnguyen.com)";
export const PASSWORD_RULE = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d\W]{8,256}$/;
export const PASSWORD_RULE_MESSAGE =
  "Password must include at least 1 letter, a number, and at least 8 characters.";
export const PASSWORD_CONFIRMATION_MESSAGE =
  "Password Confirmation does not match!";

// Liên quan đến Validate File
export const LIMIT_COMMON_FILE_SIZE = 10485760; // byte = 10 MB
export const ALLOW_COMMON_FILE_TYPES = ["image/jpg", "image/jpeg", "image/png"];
export const singleFileValidator = (file) => {
  if (!file || !file.name || !file.size || !file.type) {
    return "File cannot be blank.";
  }
  if (file.size > LIMIT_COMMON_FILE_SIZE) {
    return "Maximum file size exceeded. (10MB)";
  }
  if (!ALLOW_COMMON_FILE_TYPES.includes(file.type)) {
    return "File type is invalid. Only accept jpg, jpeg and png";
  }
  return null;
};

// Liên quan đến Validate room call
export const ROOM_ID_RULE = /^[a-zA-Z0-9]{15,}$/; // 10 ký tự trở lên
export const ROOM_ID_RULE_MESSAGE = "Room ID must be at least 15 characters.";
export const ROOM_ID_REQUIRED_MESSAGE = "Room ID is required.";
export const ROOM_ID_INVALID_MESSAGE = "Room ID is invalid.";
