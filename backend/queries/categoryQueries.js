const GET_CATEGORY_LIST = "SELECT * FROM categories";
const GET_CATEGORY_BY_ID = "SELECT * FROM categories WHERE id = ?";
const CREATE_CATEGORY =
  "INSERT INTO categories (name, description) VALUES (?, ?)";
const UPDATE_CATEGORY =
  "UPDATE categories SET name = ?, description = ? WHERE id = ?";
const DELETE_CATEGORY = "DELETE FROM categories WHERE id = ?";

module.exports = {
  GET_CATEGORY_LIST,
  GET_CATEGORY_BY_ID,
  CREATE_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
};
