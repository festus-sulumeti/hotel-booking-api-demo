import express from "express";
import db from "../data/store.js";
import { formatDateIso, datesOverlap } from "../utils/date.js";

const router = express.Router();

// Search available rooms
router.get("/", (req, res) => {
  const { hotelId, checkIn, checkOut, guests } = req.query;
  if (!hotelId || !checkIn || !checkOut) {
    return res.status(400).json({ error: { code: "MISSING_FIELDS", message: "hotelId, checkIn and checkOut required" } });
  }

  const cIn = formatDateIso(checkIn);
  const cOut = formatDateIso(checkOut);
  if (!cIn || !cOut || new Date(cOut) <= new Date(cIn)) {
    return res.status(400).json({ error: { code: "INVALID_DATE_RANGE", message: "checkOut must be after checkIn" } });
  }

  let rooms = db.rooms.filter(r => r.hotelId === hotelId);
  if (guests) rooms = rooms.filter(r => r.maxGuests >= Number(guests));

  const available = rooms.filter(room => {
    const bookingsForRoom = db.bookings.filter(
      b => b.roomId === room.id && ["PENDING_PAYMENT", "CONFIRMED"].includes(b.status)
    );
    for (const b of bookingsForRoom) {
      if (datesOverlap(cIn, cOut, b.checkIn, b.checkOut)) return false;
    }
    return true;
  });

  return res.json(available);
});

export default router;
