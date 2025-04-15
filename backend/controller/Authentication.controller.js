const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const connection = require("../config/db");
const { ROLES } = require("../utils/staticData");

const register = (req, res) => {
  const { username, email, password, role = "staff" } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      msg: "Errors",
      errors: errors.array(),
    });
  }
  if (!ROLES.includes(role)) {
    return res.status(400).json({
      success: false,
      msg: `Invalid role. Allowed roles are: ${ROLES.join(", ")}`,
    });
  }
  try {
    connection.query(
      "SELECT * FROM users WHERE email = ?",
      email,
      async (error, result) => {
        if (error) {
          console.error("Error fetching data:", error);
          return res
            .status(400)
            .json({ success: false, msg: "Error Fetching Users data!" });
        }
        if (result.length) {
          return res.status(409).json({
            success: false,
            msg: "User already exists with this email!",
          });
        } else {
          const salt = await bcrypt.genSalt(5);
          const encryptPassword = await bcrypt.hash(password, salt);
          connection.query(
            "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)",
            [username, email, encryptPassword, role],
            (error, result) => {
              if (error) {
                console.error("Error inserting data:", error);
                return res
                  .status(400)
                  .json({ success: false, msg: "Error Inserting Data" });
              }
              const token = jwt.sign(
                { username, email, role },
                process.env.JWT_SECRET,
                {
                  expiresIn: "1d",
                }
              );
              return res.status(201).json({ success: true, result, token });
            }
          );
        }
      }
    );
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, msg: "Something weng wrong" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      msg: "Errors",
      errors: errors.array(),
    });
  }
  try {
    connection.query(
      "Select * FROM users WHERE email = ?",
      email,
      async (error, result) => {
        const { password: userPassword, ...entities } = result[0];
        if (error) {
          console.error("error", error);
        }
        if (!result.length) {
          return res
            .status(404)
            .json({ success: false, msg: "User not found" });
        }
        const isPasswordMatch = await bcrypt.compare(password, userPassword);
        if (!isPasswordMatch) {
          return res
            .status(401)
            .json({ success: false, msg: "Invalid password" });
        }
        if (result.length) {
          const token = jwt.sign({ ...entities }, process.env.JWT_SECRET, {
            expiresIn: "1d",
          });
          return res
            .status(200)
            .json({ success: true, msg: "Login Successful", token });
        }
      }
    );
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      msg: "Something went wrong",
    });
  }
};

module.exports = { register, login };
