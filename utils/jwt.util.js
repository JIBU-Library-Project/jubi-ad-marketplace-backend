const jwt = require("jsonwebtoken");
const { config } = require("dotenv");
config();
const secret = process.env.JWT_SECRET;

const signToken = (payload) => {
  return jwt.sign(payload, secret);
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
};

module.exports = {
  signToken,
  verifyToken,
};
