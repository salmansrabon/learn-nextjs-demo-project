// validation.js — Client-side form validation helpers
//
// Each function returns an errors object.
// Empty object {} = valid. Non-empty = has errors.

export const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
export const validatePhone = (phone) => /^\d{7,15}$/.test(phone);

export const validateRegisterForm = (data) => {
  const errors = {};
  if (!data.firstname?.trim()) errors.firstname = 'First name is required';
  if (!data.lastname?.trim())  errors.lastname  = 'Last name is required';
  if (!data.email?.trim()) {
    errors.email = 'Email is required';
  } else if (!validateEmail(data.email)) {
    errors.email = 'Invalid email format';
  }
  if (data.phonenumber && !validatePhone(data.phonenumber)) {
    errors.phonenumber = 'Phone must be 7-15 digits';
  }
  if (!data.password) {
    errors.password = 'Password is required';
  } else if (data.password.length < 4) {
    errors.password = 'Password must be at least 4 characters';
  }
  return errors;
};

export const validateLoginForm = (data) => {
  const errors = {};
  if (!data.email?.trim()) {
    errors.email = 'Email is required';
  } else if (!validateEmail(data.email)) {
    errors.email = 'Invalid email format';
  }
  if (!data.password) errors.password = 'Password is required';
  return errors;
};

export const validateEditUserForm = (data) => {
  const errors = {};
  if (!data.firstname?.trim()) errors.firstname = 'First name is required';
  if (!data.lastname?.trim())  errors.lastname  = 'Last name is required';
  if (!data.email?.trim()) {
    errors.email = 'Email is required';
  } else if (!validateEmail(data.email)) {
    errors.email = 'Invalid email format';
  }
  if (data.phonenumber && !validatePhone(data.phonenumber)) {
    errors.phonenumber = 'Phone must be 7-15 digits';
  }
  return errors;
};
