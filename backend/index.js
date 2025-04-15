const express = require("express");
const cors = require("cors");

const app = express();
require("./config/db");

app.use(express.json());
app.use(cors());

// Main Route File
require("./routes")(app);

app.use((err, req, res, next) => {
  console.error(err);
  return res.status(err.status || 500).json({ msg: "Something went wrong!" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on Port: ${process.env.PORT}`);
});
