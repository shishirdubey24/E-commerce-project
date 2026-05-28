import jwt from "jsonwebtoken";
export const JwtValiadtion = (req, res, next) => {
  const token = req?.cookie?.token;
  if (!token) {
    return res.status(400).json({
      isAuthenticated: false,
      message: "Authentication token missing.",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Middleware Token Validation Failure:", error.message);
    return res.status(401).json({
      isAuthenticated: false,
      message: "Session expired or altered.",
    });
  }
};
