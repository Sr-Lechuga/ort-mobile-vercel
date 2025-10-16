const jwt = require("jsonwebtoken");

// userData = { id: user._id, username: user.username, name: user.name }
const signToken = (userData, userType) => {
  const payload = { userType, ...userData };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "24h" });
};

const verifyToken = (token) => {
  try {
    const decodedUserData = jwt.verify(token, process.env.JWT_SECRET);
    return decodedUserData;
  } catch (err) {
    console.log("===> ERROR VERIFYING TOKEN: ", err);
    return null;
  }
};

module.exports = {
  signToken,
  verifyToken,
};
