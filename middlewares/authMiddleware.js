const JWT = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    // 🔥 check if header exists
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).send({
        success: false,
        message: "No token provided",
      });
    }

    // extract token
    const token = authHeader.split(" ")[1];

    // verify token
    const decoded = JWT.verify(token, process.env.JWT_SECRET);

    // attach user info (BEST PRACTICE)
    req.user = decoded;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

module.exports = authMiddleware;
