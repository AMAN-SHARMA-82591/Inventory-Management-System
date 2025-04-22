const GET_SUPPLIER_LIST = "SELECT * FROM suppliers";
const GET_SUPPLIER_BY_ID = "SELECT * FROM suppliers WHERE id = ?";
const CREATE_SUPPLIER =
  "INSERT INTO suppliers (name, contact_person, email, address) VALUES (?, ?, ?, ?)";
const UPDATE_SUPPLIER =
  "UPDATE suppliers SET name = ?, contact_person = ?, email = ?, address = ? WHERE id = ?";
const DELETE_SUPPLIER = "DELETE FROM suppliers WHERE id = ?";

module.exports = {
  GET_SUPPLIER_LIST,
  GET_SUPPLIER_BY_ID,
  CREATE_SUPPLIER,
  UPDATE_SUPPLIER,
  DELETE_SUPPLIER,
};
