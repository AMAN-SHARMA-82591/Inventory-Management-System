const GET_PURCHASE_LIST = "SELECT * FROM purchase";
const GET_PURCHASE_BY_ID = "SELECT * FROM purchase WHERE id = ?";
const CREATE_PURCHASE =
  "INSERT INTO purchase (product_id, supplier_id, store_id, quantity, purchase_date, total_cost) VALUES (?, ?, ?, ?, ?, ?)";
const UPDATE_PURCHASE =
  "UPDATE purchase SET product_id = ?, supplier_id = ?, store_id = ?, quantity = ?, purchase_date = ?, total_cost";
const DELETE_PURCHASE = "DELETE FROM purchase WHERE id = ?";
const GET_PURCHASE_LIST_WITH_DETAILS = `
SELECT 
    purchase.id,
    p.name AS product_name,
    st.name AS store_name,
    sp.name AS supplier_name,
    purchase.purchase_date,
    purchase.quantity,
    purchase.total_cost
FROM
    purchase
        JOIN
    products AS p ON purchase.product_id = p.id
        JOIN
    stores AS st ON purchase.store_id = st.id
        JOIN
    suppliers AS sp ON purchase.supplier_id = sp.id
`;

module.exports = {
  GET_PURCHASE_LIST,
  GET_PURCHASE_BY_ID,
  CREATE_PURCHASE,
  UPDATE_PURCHASE,
  DELETE_PURCHASE,
  GET_PURCHASE_LIST_WITH_DETAILS,
};
