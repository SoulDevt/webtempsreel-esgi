const jwt = require("jsonwebtoken");

exports.createToken = (user) => {
  const payload = {
    id: user.id,
    name: user.username,
    isAdmin: user.isAdmin,
  };
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1d",
    algorithm: "HS512",
  });
};

exports.verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return {
      id: decoded.id,
      name: decoded.name,
    };
  } catch (error) {
    return null;
  }
};
