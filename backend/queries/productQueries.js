const GET_PRODUCT_LIST = (fieldName) => {
  const updatedField =
    fieldName === "all"
      ? `
    p.id,
    p.name,
    p.description,
    p.price,
    p.quantity,
    c.name AS category_name
  `
      : fieldName;
  let query = `
    SELECT 
      ${updatedField}
    FROM
        products AS p
        LEFT JOIN
      categories AS c ON p.category_id = c.id
    ORDER BY quantity DESC
    `;
  return query;
};
const GET_PRODUCT_INPUT_LIST = (filterQuantity) => {
  let query = "SELECT id,name FROM products";
  if (parseInt(filterQuantity)) {
    query += " WHERE quantity > 0";
  }
  return query;
};
const GET_PRODUCT_BY_ID = (selectedFields) =>
  `SELECT ${selectedFields} FROM products WHERE id = ?`;
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
  GET_PRODUCT_INPUT_LIST,
};
