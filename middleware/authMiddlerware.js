const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // Get the token from the request headers or query parameters
  const token = req.header("Authorization") || req.query.token;

  // Check if a token was provided
  if (!token) {
    return res
      .status(401)
      .json({ message: "Authentication failed: No token provided" });
  }

  try {
    const secretKey = "vish";

    const tokenn = token.split(" ")[1];

    // Verify the token with your secret key
    const decoded = jwt.verify(tokenn, secretKey);

    req.id = decoded;

    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Authentication failed: Invalid token" });
  }
};

module.exports = authMiddleware;
