const GET_PRODUCT_SUPPLIER_LIST = "SELECT * FROM product_suppliers";
const GET_PRODUCT_SUPPLIER_BY_ID = "SELECT * FROM product_suppliers WHERE id = ?";
const CREATE_PRODUCT_SUPPLIER =
  "INSERT INTO product_suppliers (product_id, supplier_id) VALUES (?, ?)";
const UPDATE_PRODUCT_SUPPLIER =
  "UPDATE product_suppliers  SET product_id = ?, supplier_id = ?";
const DELETE_PRODUCT_SUPPLIER = "DELETE FROM product_suppliers WHERE id = ?";

module.exports = {
  GET_PRODUCT_SUPPLIER_LIST,
  GET_PRODUCT_SUPPLIER_BY_ID,
  CREATE_PRODUCT_SUPPLIER,
  UPDATE_PRODUCT_SUPPLIER,
  DELETE_PRODUCT_SUPPLIER,
};
