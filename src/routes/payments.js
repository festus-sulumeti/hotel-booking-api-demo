import express from "express";
import { v4 as uuidv4 } from "uuid";
import db from "../data/store.js";
import requireAuth from "../middleware/auth.js";

const router = express.Router();

// Initiate payment
router.post("/", requireAuth, (req, res) => {
  const { bookingId, amount, currency, method, mpesa } = req.body || {};
  if (!bookingId || !amount || !currency || !method) {
    return res.status(400).json({ error: { code: "MISSING_FIELDS", message: "bookingId, amount, currency, method required" } });
  }

  const booking = db.bookings.find(b => b.bookingId === bookingId);
  if (!booking) return res.status(404).json({ error: { code: "BOOKING_NOT_FOUND", message: "Booking not found" } });
  if (booking.userId !== req.user.id) return res.status(403).json({ error: { code: "FORBIDDEN", message: "Not allowed" } });

  const paymentId = "pay_" + uuidv4().slice(0, 8);
  const payment = { paymentId, bookingId, amount, currency, method, status: "PENDING", provider: method === "mpesa" ? "mpesa-sim" : "mock" };
  db.payments.push(payment);

  // simulate success
  setTimeout(() => {
    payment.status = "CONFIRMED";
    booking.status = "CONFIRMED";
  }, 1500);

  return res.json({ paymentId: payment.paymentId, status: payment.status, provider: payment.provider });
});

// Get payment status
router.get("/:id", requireAuth, (req, res) => {
  const p = db.payments.find(x => x.paymentId === req.params.id);
  if (!p) return res.status(404).json({ error: { code: "NOT_FOUND", message: "Payment not found" } });

  const booking = db.bookings.find(b => b.bookingId === p.bookingId);
  if (booking && booking.userId !== req.user.id) return res.status(403).json({ error: { code: "FORBIDDEN", message: "Not allowed" } });

  return res.json(p);
});

// Refund payment
router.post("/:id/refund", requireAuth, (req, res) => {
  const p = db.payments.find(x => x.paymentId === req.params.id);
  if (!p) return res.status(404).json({ error: { code: "NOT_FOUND", message: "Payment not found" } });

  const booking = db.bookings.find(b => b.bookingId === p.bookingId);
  if (!booking) return res.status(404).json({ error: { code: "NOT_FOUND", message: "Booking not found" } });
  if (booking.userId !== req.user.id) return res.status(403).json({ error: { code: "FORBIDDEN", message: "Not allowed" } });

  if (p.status !== "CONFIRMED") {
    return res.status(400).json({ error: { code: "NOT_REFUNDABLE", message: "Payment not confirmed or already refunded" } });
  }

  p.status = "REFUND_PENDING";
  booking.status = "REFUND_PENDING";

  setTimeout(() => {
    p.status = "REFUNDED";
    booking.status = "REFUNDED";
  }, 1500);

  return res.json({ paymentId: p.paymentId, status: p.status });
});

export default router;
