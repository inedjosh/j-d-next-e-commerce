const valid = (name, email, password, confirmPassword) => {
  if (!name || !email || !password) return "Please add all fields.";

  if (!validateEmail(email)) return "Invalid email.";

  if (password.length < 6) return "Password must be at least 6 characters.";

  if (password !== confirmPassword) return "Confirm password did not match.";
};

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export default valid;
