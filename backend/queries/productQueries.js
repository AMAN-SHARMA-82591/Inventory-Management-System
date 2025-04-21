const GET_PRODUCT_LIST =
  "SELECT p.id, p.name, p.description, p.price, p.quantity, s.name AS supplier_name from products AS p LEFT JOIN suppliers AS s on p.supplier_id = s.id";
const GET_PRODUCT_BY_ID = "SELECT * FROM products WHERE id = ?";
const CREATE_PRODUCT =
  "INSERT INTO products (name, description, price, quantity, category_id, supplier_id) VALUES (?, ?, ?, ?, ?, ?)";
const UPDATE_PRODUCT =
  "UPDATE products  SET name = ?, description = ?, price = ?, quantity = ?, category_id = ?, supplier_id = ? WHERE id = ?";
const DELETE_PRODUCT = "DELETE FROM products WHERE id = ?";

module.exports = {
  GET_PRODUCT_LIST,
  GET_PRODUCT_BY_ID,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
};
