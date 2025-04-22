const GET_STORE_LIST = "SELECT * FROM stores";
const GET_STORE_BY_ID = "SELECT * FROM stores WHERE id = ?";
const CREATE_STORE =
  "INSERT INTO stores (name, location, manager) VALUES (?, ?, ?)"; // manager: Name of store manager
const UPDATE_STORE =
  "UPDATE stores SET name = ?, location = ?, manager = ? WHERE id = ?";
const DELETE_STORE = "DELETE FROM stores WHERE id = ?";

module.exports = {
  GET_STORE_LIST,
  GET_STORE_BY_ID,
  CREATE_STORE,
  UPDATE_STORE,
  DELETE_STORE,
};
