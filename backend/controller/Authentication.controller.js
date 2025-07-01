const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
// const generator = require("generate-password");
const connection = require("../config/db");
const { ROLES } = require("../utils/staticData");
const verifyIDToken = require("../services/googleAuthService");
const { GET_USER_EMAIL, CREATE_NEW_USER } = require("../queries/userQueries");
const { setAuthCookie } = require("../utils/cookieHelpers");

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
          connection.execute(
            CREATE_NEW_USER,
            [username, email, encryptPassword, role],
            async (error, result) => {
              if (error) {
                console.error("Error inserting data:", error);
                return res
                  .status(400)
                  .json({ success: false, msg: "Error Inserting Data" });
              }
              if (result.affectedRows) {
                const [user] = await connection
                  .promise()
                  .query(GET_USER_EMAIL, email);
                setAuthCookie(res, user[0]);
                return res.status(201).json({
                  success: true,
                  msg: "New user created!",
                  user: user[0],
                });
              } else {
                console.error("Error inserting data:", error);
                return res
                  .status(400)
                  .json({ success: false, msg: "Error Inserting Data" });
              }
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
    connection.execute(
      "Select * FROM users WHERE email = ?",
      [email],
      async (error, result) => {
        if (error) {
          console.error("error", error);
          return res
            .status(500)
            .json({ msg: "There's an issue while login. Please try again." });
        }
        if (!result.length) {
          return res
            .status(404)
            .json({ success: false, msg: "User not found." });
        } else {
          const { password: userPassword, ...entities } = result[0];
          if (userPassword === null) {
            return res.status(403).json({
              success: false,
              msg: "Password login is not yet supported for Google-authenticated accounts. Please use Google to continue.",
            });
          }
          const isPasswordMatch = await bcrypt.compare(password, userPassword);
          if (!isPasswordMatch) {
            return res
              .status(401)
              .json({ success: false, msg: "Invalid password" });
          }
          setAuthCookie(res, entities);
          return res
            .status(200)
            .json({ success: true, msg: "Login Successful", user: entities });
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

const loginWithGoogle = async (req, res) => {
  try {
    const { idToken } = req.body;
    const { name, email } = await verifyIDToken(idToken);
    connection.execute(GET_USER_EMAIL, [email], async (error, result) => {
      if (error) {
        return res.status(400).json({
          success: false,
          msg: "Error fetching data",
        });
      }
      if (!result.length) {
        // const password = generator.generate({
        //   length: 10,
        //   numbers: true,
        //   uppercase: true,
        //   lowercase: true,
        //   excludeSimilarCharacters: true,
        // });
        // const salt = await bcrypt.genSalt(5);
        // const encryptPassword = await bcrypt.hash(password, salt);
        connection.execute(
          CREATE_NEW_USER,
          [name, email, null, "staff"],
          async (error, result) => {
            if (error) {
              return res
                .status(400)
                .json({ success: false, msg: "Error inserting data" });
            }
            if (result.affectedRows) {
              const [user] = await connection
                .promise()
                .query(GET_USER_EMAIL, email);
              setAuthCookie(res, user[0]);
              return res.status(201).json({
                success: true,
                msg: "Login successful",
                user: user[0],
              });
            }
          }
        );
      } else {
        const { ...entities } = result[0];
        setAuthCookie(res, entities);
        return res
          .status(200)
          .json({ success: true, msg: "Login Successfull", user: entities });
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};

const logout = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
  return res.status(200).json({ msg: "Logout successful" });
};

module.exports = { register, login, logout, loginWithGoogle };
