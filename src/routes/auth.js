import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../data/store.js";
import config from "../config/index.js";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const { email, password, name } = req.body || {};
  if (!email || !password || !name) {
    return res.status(400).json({ error: { code: "MISSING_FIELDS", message: "email, password, and name are required" } });
  }

  const existing = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existing) return res.status(409).json({ error: { code: "USER_EXISTS", message: "User already exists" } });

  const passwordHash = await bcrypt.hash(password, 10);
  const user = { id: "usr_" + uuidv4().slice(0, 8), email, name, passwordHash };
  db.users.push(user);

  return res.status(201).json({ userId: user.id, email: user.email });
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: { code: "MISSING_FIELDS", message: "email and password required" } });

  const user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!user) return res.status(401).json({ error: { code: "INVALID_CREDENTIALS", message: "Invalid email or password" } });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: { code: "INVALID_CREDENTIALS", message: "Invalid email or password" } });

  const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, config.jwtSecret, { expiresIn: "8h" });
  return res.json({ token });
});

export default router;

