import express from "express";
import cors from "cors";

import healthRoutes from "./routes/health.js";
import authRoutes from "./routes/auth.js";
import hotelsRoutes from "./routes/hotels.js";
import roomsRoutes from "./routes/rooms.js";
import bookingsRoutes from "./routes/bookings.js";
import paymentsRoutes from "./routes/payments.js";

const app = express();
app.use(cors());
app.use(express.json());

// Mount routes
app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/hotels", hotelsRoutes);
app.use("/api/rooms", roomsRoutes);
app.use("/api/bookings", bookingsRoutes);
app.use("/api/payments", paymentsRoutes);
// ✅ Catch-all (works in Express 5)
app.use((req, res) => {
  res.status(404).json({ error: { code: "NOT_FOUND", message: "Endpoint not found" } });
});

export default app;

