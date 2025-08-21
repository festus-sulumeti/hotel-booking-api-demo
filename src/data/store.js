// src/data/store.js
const db = {
  users: [],

  hotels: [
    { id: "htl_001", name: "Serene Stay Nairobi", city: "Nairobi" },
    { id: "htl_002", name: "Coastal Breeze Mombasa", city: "Mombasa" },
    { id: "htl_003", name: "Lakefront Haven Kisumu", city: "Kisumu" },
    { id: "htl_004", name: "Safari View Lodge Nakuru", city: "Nakuru" },
    { id: "htl_005", name: "Crater Lake Retreat Naivasha", city: "Naivasha" },
    { id: "htl_006", name: "Diani Sands Resort", city: "Diani" },
    { id: "htl_007", name: "Mara Explorer Camp", city: "Masai Mara" }
  ],

  rooms: [
    // Nairobi
    { id: "rm_101", hotelId: "htl_001", type: "Deluxe", price: 8500, currency: "KES", maxGuests: 2 },
    { id: "rm_102", hotelId: "htl_001", type: "Suite", price: 12500, currency: "KES", maxGuests: 3 },

    // Mombasa
    { id: "rm_201", hotelId: "htl_002", type: "Standard", price: 6000, currency: "KES", maxGuests: 2 },
    { id: "rm_202", hotelId: "htl_002", type: "Ocean View", price: 10500, currency: "KES", maxGuests: 2 },

    // Kisumu
    { id: "rm_301", hotelId: "htl_003", type: "Standard", price: 5500, currency: "KES", maxGuests: 2 },
    { id: "rm_302", hotelId: "htl_003", type: "Executive", price: 9000, currency: "KES", maxGuests: 2 },

    // Nakuru
    { id: "rm_401", hotelId: "htl_004", type: "Safari Tent", price: 7500, currency: "KES", maxGuests: 2 },
    { id: "rm_402", hotelId: "htl_004", type: "Luxury Suite", price: 13500, currency: "KES", maxGuests: 4 },

    // Naivasha
    { id: "rm_501", hotelId: "htl_005", type: "Cottage", price: 8000, currency: "KES", maxGuests: 3 },
    { id: "rm_502", hotelId: "htl_005", type: "Villa", price: 14500, currency: "KES", maxGuests: 5 },

    // Diani
    { id: "rm_601", hotelId: "htl_006", type: "Beachfront Room", price: 11000, currency: "KES", maxGuests: 2 },
    { id: "rm_602", hotelId: "htl_006", type: "Family Suite", price: 17500, currency: "KES", maxGuests: 4 },

    // Masai Mara
    { id: "rm_701", hotelId: "htl_007", type: "Tent", price: 9500, currency: "KES", maxGuests: 2 },
    { id: "rm_702", hotelId: "htl_007", type: "Luxury Tent", price: 16000, currency: "KES", maxGuests: 3 }
  ],

  bookings: [], // { bookingId, roomId, hotelId, userId, checkIn, checkOut, guests, status, amount, currency, customer }
  payments: []  // { paymentId, bookingId, amount, currency, method, status, provider }
};

export default db;
