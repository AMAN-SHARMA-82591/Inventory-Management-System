const mysql = require("mysql2");
require('dotenv').config();

const connection = mysql.createConnection({
  user: process.env.USER,
  host: process.env.HOST,
  port: process.env.DB_PORT,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

connection.connect((error) => {
  if (error) throw error;
  console.log("DB Connected!!");
});

module.exports = connection;