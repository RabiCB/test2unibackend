const jwt = require("jsonwebtoken");
const { prisma } = require("../lib/prima");
const JWT_SECRET = "xyztest2uni2024";

async function authMiddleware(req, res, next) {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Bearer token
    if (!token) return res.status(401).json({ error: "No token provided" });

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });

    console.log(user,"skksks")

    if (!user) return res.status(404).json({ error: "User not found" });

    req.user = user; // Attach user to request
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(401).json({ error: "Invalid or expired token" });
  }
}

module.exports = authMiddleware;
