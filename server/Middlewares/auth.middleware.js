const jwt = require("jsonwebtoken");

// Middleware to authenticate and verify JWT token
function AuthenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token." });
    }
    next();
  });
}

export default AuthenticateToken;
