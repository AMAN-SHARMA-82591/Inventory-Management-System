const GET_USER =
  "SELECT id, username, email, role, created_at, updated_at FROM users WHERE id=?";
const GET_USER_EMAIL =
  "SELECT id, username, email, role, created_at, updated_at FROM users WHERE email=?";
const CREATE_NEW_USER =
  "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)";

module.exports = {
  GET_USER,
  GET_USER_EMAIL,
  CREATE_NEW_USER,
};
