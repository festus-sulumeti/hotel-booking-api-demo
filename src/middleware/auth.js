// src/middleware/auth.js
import jwt from "jsonwebtoken";
import config from "../config/index.js";

function requireAuth(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({ error: { code: "UNAUTHENTICATED", message: "Missing bearer token" } });
  }

  const token = auth.split(" ")[1];
  try {
    const payload = jwt.verify(token, config.jwtSecret);
    req.user = payload; // { id, email, name }
    return next();
  } catch (err) {
    return res.status(401).json({ error: { code: "INVALID_TOKEN", message: "Invalid or expired token" } });
  }
}

export default requireAuth;
