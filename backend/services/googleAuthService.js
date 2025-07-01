const { OAuth2Client } = require("google-auth-library");

const clientId = process.env.GOOGLE_CLIENT_ID;

const client = new OAuth2Client({
  clientId,
});

async function verifyIDToken(idToken) {
  const loginTicket = await client.verifyIdToken({
    idToken,
    audience: clientId,
  });
  const userData = loginTicket.getPayload();
  return userData;
}

module.exports = verifyIDToken;
