const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Access denied, token missing" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      ...decoded,
      role: decoded.role.toUpperCase().trim(),
    };

    next();
  } catch (error) {
    return res.status(401).json({
      error:
        error.name === "TokenExpiredError"
          ? "Session expired, please login again"
          : "Invalid token",
    });
  }
};
