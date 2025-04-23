const GET_SALE_LIST = "SELECT * FROM sales";
const GET_SALE_BY_ID = "SELECT * FROM sales WHERE id = ?";
const CREATE_SALE =
  "INSERT INTO sales (product_id, store_id, quantity, sales_date, total_amount) VALUES (?, ?, ?, ?, ?)";
const UPDATE_SALE =
  "UPDATE sales SET product_id = ?, store_id = ?, quantity = ?, sales_date = ?, total_amount = ? WHERE id = ?";
const DELETE_SALE = "DELETE FROM sales WHERE id = ?";
const GET_SALE_LIST_WITH_DETAILS = `
  SELECT 
    s.id,
    p.name AS product_name,
    st.name AS store_name,
    s.sales_date,
    s.quantity,
    s.total_amount
  FROM sales AS s
  JOIN products AS p ON s.product_id = p.id
  JOIN stores AS st ON s.store_id = st.id
`;

module.exports = {
  CREATE_SALE,
  UPDATE_SALE,
  DELETE_SALE,
  GET_SALE_LIST,
  GET_SALE_BY_ID,
  GET_SALE_LIST_WITH_DETAILS,
};
