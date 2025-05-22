const express = require("express");
const cors = require("cors");
const cookieparser = require("cookie-parser");

const app = express();
require("./config/db");

const allowedOrigins = process.env.FRONTEND_URL.split(",");

app.use(cookieparser(process.env.JWT_SECRET));
app.use(express.json());
app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Main Route File
require("./routes")(app);

app.use((err, req, res, next) => {
  console.error(err);
  return res.status(err.status || 500).json({ msg: "Something went wrong!" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on Port: ${process.env.PORT}`);
});
