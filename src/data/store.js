// src/data/store.js
const db = {
  users: [],

  hotels: [
    { id: "htl_001", name: "Serene Stay Nairobi", city: "Nairobi" },
    { id: "htl_002", name: "Coastal Breeze Mombasa", city: "Mombasa" }
  ],

  rooms: [
    { id: "rm_101", hotelId: "htl_001", type: "Deluxe", price: 8500, currency: "KES", maxGuests: 2 },
    { id: "rm_201", hotelId: "htl_001", type: "Suite", price: 12500, currency: "KES", maxGuests: 3 },
    { id: "rm_301", hotelId: "htl_002", type: "Standard", price: 6000, currency: "KES", maxGuests: 2 }
  ],

  bookings: [], // { bookingId, roomId, hotelId, userId, checkIn, checkOut, guests, status, amount, currency, customer }
  payments: []  // { paymentId, bookingId, amount, currency, method, status, provider }
};

export default db;
