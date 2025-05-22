const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const { token } = req.signedCookies;
  // const jwtToken = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.clearCookie("token");
    return res
      .status(401)
      .json({ success: false, msg: "No token, authorization denied" });
  }
  try {
    const { expiry, ...entities } = JSON.parse(
      Buffer.from(token, "base64url").toString()
    );

    const currentTime = Math.round(Date.now() / 1000);
    if (currentTime > expiry) {
      res.clearCookie("token");
      return res.status(401).json({ error: "Not Logged in!" });
    }

    // const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
    req.user = entities;
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
    res.clearCookie("token");
    console.error("Something went wrong", error);
    return res.status(401).json({ success: false, msg: "Token is not valid!" });
  }
};
