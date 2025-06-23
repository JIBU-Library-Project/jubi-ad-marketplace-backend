const { verifyToken } = require("../utils/jwt.util");

const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res
        .status(401)
        .json({ message: "Authorization header is missing" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token is missing" });
    }
    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};

const authorize = (allowedRoles) => {
  return (req, res, next) => {
    const role = req.user.role;
    if (!role) {
      return res.status(403).json({
        message: "Access denied. No role provided.",
      });
    }

    if (allowedRoles.includes(role)) {
      next();
    } else {
      res.status(403).json({
        message:
          "Access denied. You do not have access to the required permissions",
      });
    }
  };
};

module.exports = {
  authenticate,
  authorize,
};
