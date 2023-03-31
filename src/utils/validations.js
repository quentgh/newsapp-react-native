export function validateEmail(email) {
  return email.includes("@");
}

export function validateUsername(username) {
  return (
    validateUsernameTooShort(username) && validateUsernameTooLong(username)
  );
}

export function validateUsernameTooShort(username) {
  return username.length >= 3;
}

export function validateUsernameTooLong(username) {
  return username.length <= 12;
}

export function validatePassword(password) {
  return password.length >= 6;
}

export function validateConfirmPassword(password, confirmPassword) {
  return password == confirmPassword;
}


export function getEmailError(email) {
  return !validateEmail(email) ? "Error with your email" : "";
}

export function getPasswordError(password) {
  return !validatePassword(password) ? "Too short password - 6 digit min" : "";
}

export function getConfirmPasswordError(password, confirmPassword) {
  return !validateConfirmPassword(password, confirmPassword)
    ? "Password are not the same"
    : "";
}

export function getUsernameError(username) {
  if (!validateUsernameTooShort(username)) {
    return "Too short username";
  }
  if (!validateUsernameTooLong(username)) {
    return "Too long username";
  }
  return "";
}
