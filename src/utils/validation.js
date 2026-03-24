export const validateEmail = (email) => {
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return passwordRegex.test(password);
};

export const validateRequired = (value) => {
  return;
};

export const validateLength = (value, min, max) => {
  return;
};

export const sanitizeInput = (input) => {
  return input;
};