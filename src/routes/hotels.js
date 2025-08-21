import express from "express";
import db from "../data/store.js";

const router = express.Router();

// List hotels
router.get("/", (req, res) => {
  const { city } = req.query;
  let list = db.hotels;
  if (city) list = list.filter(h => h.city.toLowerCase() === (city + "").toLowerCase());
  return res.json(list);
});

// Get hotel by id
router.get("/:id", (req, res) => {
  const hotel = db.hotels.find(h => h.id === req.params.id);
  if (!hotel) return res.status(404).json({ error: { code: "NOT_FOUND", message: "Hotel not found" } });
  return res.json(hotel);
});

export default router;
