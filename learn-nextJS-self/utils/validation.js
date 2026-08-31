// validation.js — client-side form checks used from section 4.5 onward.
//
// Every function returns an errors object:
//   {}                       -> valid
//   { email: 'Invalid...' }  -> invalid, keyed by field name
// Returning a plain object (rather than throwing) lets the form render one
// message per field instead of stopping at the first problem.

export const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
export const isPhone = (value) => /^\d{7,15}$/.test(value);

export function validateRegisterForm(data) {
  const errors = {};

  if (!data.firstname?.trim()) errors.firstname = 'First name is required';
  if (!data.lastname?.trim()) errors.lastname = 'Last name is required';

  if (!data.email?.trim()) {
    errors.email = 'Email is required';
  } else if (!isEmail(data.email)) {
    errors.email = 'Invalid email format';
  }

  if (data.phonenumber && !isPhone(data.phonenumber)) {
    errors.phonenumber = 'Phone must be 7-15 digits';
  }

  if (!data.password) {
    errors.password = 'Password is required';
  } else if (data.password.length < 4) {
    errors.password = 'Password must be at least 4 characters';
  }

  return errors;
}

export function validateLoginForm(data) {
  const errors = {};

  if (!data.email?.trim()) {
    errors.email = 'Email is required';
  } else if (!isEmail(data.email)) {
    errors.email = 'Invalid email format';
  }

  if (!data.password) errors.password = 'Password is required';

  return errors;
}

export function validateEditUserForm(data) {
  const errors = {};

  if (!data.firstname?.trim()) errors.firstname = 'First name is required';
  if (!data.lastname?.trim()) errors.lastname = 'Last name is required';

  if (!data.email?.trim()) {
    errors.email = 'Email is required';
  } else if (!isEmail(data.email)) {
    errors.email = 'Invalid email format';
  }

  if (data.phonenumber && !isPhone(data.phonenumber)) {
    errors.phonenumber = 'Phone must be 7-15 digits';
  }

  return errors;
}
