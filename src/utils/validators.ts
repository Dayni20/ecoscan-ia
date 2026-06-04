export const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
};

export const isValidPassword = (password: string): boolean => {
  return password.length >= 6;
};

export const passwordsMatch = (
  password: string,
  confirmPassword: string
): boolean => {
  return password === confirmPassword;
};
