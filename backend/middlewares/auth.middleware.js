const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ success: false, msg: "No token, authorization denied" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    return next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      console.error("Token expired at:", error.expiredAt);
      return res.status(401).json({
        success: false,
        msg: "Token has expired. Please log in again.",
        expiredAt: error.expiredAt, // Optional: Include the expiration time
      });
    }
    console.error("Something went wrong", error);
    return res.status(401).json({ success: false, msg: "Token is not valid!" });
  }
};
