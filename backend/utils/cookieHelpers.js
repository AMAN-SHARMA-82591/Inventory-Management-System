const { expirySeconds } = require("../utils/staticData");

function setAuthCookie(res, user) {
  const cookiePayload = JSON.stringify({
    ...user,
    expiry: Math.round(Date.now() / 1000 + expirySeconds),
  });
  res.cookie(
    "token",
    Buffer.from(cookiePayload).toString("base64url"),
    {
      httpOnly: true,
      signed: true,
      maxAge: expirySeconds * 1000, // in milliseconds
      sameSite: "None",
      secure: true,
    }
  );
}

module.exports = { setAuthCookie };