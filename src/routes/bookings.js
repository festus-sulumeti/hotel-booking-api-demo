import express from "express";
import { v4 as uuidv4 } from "uuid";
import db from "../data/store.js";
import requireAuth from "../middleware/auth.js";
import { formatDateIso, datesOverlap } from "../utils/date.js";

const router = express.Router();

// Create booking
router.post("/", requireAuth, (req, res) => {
  const { roomId, checkIn, checkOut, guests, customer } = req.body || {};
  if (!roomId || !checkIn || !checkOut || !guests || !customer) {
    return res.status(400).json({ error: { code: "MISSING_FIELDS", message: "roomId, checkIn, checkOut, guests, customer required" } });
  }

  const cIn = formatDateIso(checkIn);
  const cOut = formatDateIso(checkOut);
  if (!cIn || !cOut || new Date(cOut) <= new Date(cIn)) {
    return res.status(400).json({ error: { code: "INVALID_DATE_RANGE", message: "checkOut must be after checkIn" } });
  }

  const room = db.rooms.find(r => r.id === roomId);
  if (!room) return res.status(404).json({ error: { code: "ROOM_NOT_FOUND", message: "Room not found" } });

  // Check overlapping bookings
  const bookingsForRoom = db.bookings.filter(
    b => b.roomId === roomId && ["PENDING_PAYMENT", "CONFIRMED"].includes(b.status)
  );
  for (const b of bookingsForRoom) {
    if (datesOverlap(cIn, cOut, b.checkIn, b.checkOut)) {
      return res.status(400).json({ error: { code: "ROOM_NOT_AVAILABLE", message: "Room not available for these dates" } });
    }
  }

  const bookingId = "bkg_" + uuidv4().slice(0, 8);
  const amount = room.price;
  const booking = {
    bookingId,
    roomId: room.id,
    hotelId: room.hotelId,
    userId: req.user.id,
    checkIn: cIn,
    checkOut: cOut,
    guests,
    status: "PENDING_PAYMENT",
    amount,
    currency: room.currency || "KES",
    customer
  };

  db.bookings.push(booking);
  return res.status(201).json(booking);
});

// Get booking
router.get("/:id", requireAuth, (req, res) => {
  const b = db.bookings.find(x => x.bookingId === req.params.id);
  if (!b) return res.status(404).json({ error: { code: "NOT_FOUND", message: "Booking not found" } });
  if (b.userId !== req.user.id) return res.status(403).json({ error: { code: "FORBIDDEN", message: "Not allowed" } });
  return res.json(b);
});

// Cancel booking
router.post("/:id/cancel", requireAuth, (req, res) => {
  const b = db.bookings.find(x => x.bookingId === req.params.id);
  if (!b) return res.status(404).json({ error: { code: "NOT_FOUND", message: "Booking not found" } });
  if (b.userId !== req.user.id) return res.status(403).json({ error: { code: "FORBIDDEN", message: "Not allowed" } });

  if (["CANCELLED", "REFUNDED"].includes(b.status)) {
    return res.status(400).json({ error: { code: "ALREADY_CANCELLED", message: "Booking already cancelled/refunded" } });
  }

  const payment = db.payments.find(p => p.bookingId === b.bookingId && p.status === "CONFIRMED");
  if (payment) {
    b.status = "REFUND_PENDING";
  } else {
    b.status = "CANCELLED";
  }

  return res.json({ bookingId: b.bookingId, status: b.status });
});

export default router;
