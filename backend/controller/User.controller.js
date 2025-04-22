const connection = require("../config/db");
const { validationResult } = require("express-validator");

const getUsersList = (req, res) => {
  try {
    connection.query(
      "SELECT id, username, email, role, created_at, updated_at FROM users",
      (error, result) => {
        if (error) {
          console.error("Error fetching data:", error);
          return res
            .status(400)
            .json({ success: false, msg: "Error fetching users data." });
        }
        return res.status(200).json({ success: true, result });
      }
    );
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};

const getUser = (req, res) => {
  const { id } = req.params;
  try {
    connection.query(
      "SELECT id, username, email, role, created_at, updated_at FROM USERS WHERE id=?",
      id,
      (error, result) => {
        if (error) {
          console.error("Error inserting data:", error);
          return res
            .status(400)
            .json({ success: false, msg: "Error Inserting Data" });
        }
        res.status(200).json({ success: true, result: result[0] });
      }
    );
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};

module.exports = { getUsersList, getUser };
