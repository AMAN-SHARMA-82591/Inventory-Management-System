const connection = require("../config/db");

const checkIfExists = async (tableName, columnName, id) => {
  const query = `SELECT id FROM ${tableName} WHERE ${columnName} = ?`;
  const [rows] = await connection.promise().query(query, [id]);
  return rows.length > 0;
};

module.exports = {
  checkIfExists,
};
