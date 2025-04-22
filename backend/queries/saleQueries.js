const GET_SALE_LIST = "SELECT * FROM sales";
const GET_SALE_BY_ID = "SELECT * FROM sales WHERE id = ?";
const CREATE_SALE =
  "INSERT INTO sales (product_id, store_id, quantity, sales_date, total_amount) VALUES (?, ?, ?, ?, ?)";
const UPDATE_SALE = "UPDATE sales SET product_id = ?, store_id = ?, quantity = ?, sales_date = ?, total_amount = ? WHERE id = ?";
const DELETE_SALE = "DELETE FROM sales WHERE id = ?";

module.exports = {
  GET_SALE_LIST,
  GET_SALE_BY_ID,
  CREATE_SALE,
  UPDATE_SALE,
  DELETE_SALE,
};
