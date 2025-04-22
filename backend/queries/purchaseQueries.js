const GET_PURCHASE_LIST = "SELECT * FROM purchase";
const GET_PURCHASE_BY_ID = "SELECT * FROM purchase WHERE id = ?";
const CREATE_PURCHASE =
  "INSERT INTO purchase (product_id, supplier_id, store_id, quantity, purchase_date, total_cost) VALUES (?, ?, ?, ?, ?, ?)";
const UPDATE_PURCHASE =
  "UPDATE purchase SET product_id = ?, supplier_id = ?, store_id = ?, quantity = ?, purchase_date = ?, total_cost";
const DELETE_PURCHASE = "DELETE FROM purchase WHERE id = ?";

module.exports = {
  GET_PURCHASE_LIST,
  GET_PURCHASE_BY_ID,
  CREATE_PURCHASE,
  UPDATE_PURCHASE,
  DELETE_PURCHASE,
};
