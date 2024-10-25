export function checkOtherCollegeEmail(email) {
  // Check if email is valid
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function checkEmail(email) {
  const emailRegex = /^[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*@mnnit\.ac\.in$/;
  return emailRegex.test(email);
}

export function checkPassword(password) {
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
  return passwordRegex.test(password);
}

export function checkName(name) {
  const nameRegex = /^[a-zA-Z]+$/;
  const nameArray = name.split(" ");
  for (let i = 0; i < nameArray.length; i++) {
    if (!nameRegex.test(nameArray[i])) {
      return false;
    }
  }
  return true;
}

export function checkPhone(phone) {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone);
}

export function generateVerificationEmail(verificationToken, subject) {
  return `
        Please enter that code in the web page to verify your email for ${subject}:
        ${verificationToken}
    `;
}

export function sendPasswordEmail(password) {
  return `
        Your password is: ${password}
  `;
}

export function generateVerificationToken() {
  return Math.floor(100000 + Math.random() * 900000);
}
