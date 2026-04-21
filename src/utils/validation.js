const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

export const validateEmail = (email) => {
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return passwordRegex.test(password);
};

export const validateRequired = (value) => {
  return value !== undefined && value !== null && value !== '';
};

export const validateLength = (value, min, max) => {
  if (typeof value !== 'string') return false;
  return value.length >= min && value.length <= max;
};

export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  return input.trim();
};