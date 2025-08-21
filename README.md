# 🏨 Hotel Booking API Demo

A lightweight **Hotel Booking Management System API** built with **Node.js (Express 5)**.  
Includes authentication, hotels, rooms, bookings, and payments — with a Postman collection for testing.  

---

## ✨ Features
- 🔐 **User Authentication** (JWT-based register/login)  
- 🏨 **Hotels & Rooms** (list, search availability)  
- 📅 **Bookings** (create, fetch by user, cancel)  
- 💳 **Payments** (simulate M-Pesa / card payments)  
- 🛠 **Postman-ready** collection for quick testing  
- ☁️ **Vercel-ready** serverless deployment  

---

## 📂 Project Structure
```bash
hotel-booking-api-demo/
│── api/                   # Vercel entrypoint
│   └── index.js
│── src/
│   ├── app.js             # Express app
│   ├── server.js          # Local dev entrypoint
│   ├── config/            # Config (JWT, env)
│   │   └── index.js
│   ├── data/              # In-memory DB
│   │   └── store.js
│   ├── middleware/        # Auth middleware
│   │   └── auth.js
│   ├── routes/            # API endpoints
│   │   ├── auth.js
│   │   ├── bookings.js
│   │   ├── health.js
│   │   ├── hotels.js
│   │   ├── payments.js
│   │   └── rooms.js
│   └── utils/             # Helper utilities
│       └── date.js
│── package.json
│── .env.example
│── README.md
│── .gitignore
```
## 🚀 Getting Started
1. Clone Repo
```bash
git clone https://github.com/festus-sulumeti/hotel-booking-api-demo.git

```
```bash
cd hotel-booking-api-demo

```

Environment
cp .env.example .env
# edit .env as needed


.env.example (example):

PORT=5000
NODE_ENV=development
JWT_SECRET=supersecret_demo_key
MPESA_SIMULATOR_URL=http://localhost:4040
STRIPE_API_KEY=sk_test_xxx

Run
npm run dev
# or
npm start

Base URL (local)
http://localhost:5000/api

🧭 API Endpoints
Health

GET /api/health

Response:

{ "healthy": true, "time": "2025-08-21T12:00:00.000Z" }

Auth
Register

POST /api/auth/register

Body:

{
  "name": "Alice",
  "email": "alice@example.com",
  "password": "password123"
}


Response:

{
  "message": "User registered successfully",
  "token": "jwt_token_here"
}

Login

POST /api/auth/login

Body:

{
  "email": "alice@example.com",
  "password": "password123"
}


Response:

{
  "message": "Login successful",
  "token": "jwt_token_here"
}

Hotels
List Hotels

GET /api/hotels

Response:

[
  { "id": 1, "name": "Hilton Nairobi", "location": "Nairobi", "rating": 4.5 },
  { "id": 2, "name": "Serena Hotel", "location": "Mombasa", "rating": 4.7 }
]

Rooms
List Rooms for a Hotel

GET /api/hotels/:hotelId/rooms

Response:

[
  { "id": 101, "type": "Deluxe", "price": 120, "available": true },
  { "id": 102, "type": "Standard", "price": 80, "available": false }
]

Bookings
Create Booking

POST /api/bookings

Body:

{
  "hotelId": 1,
  "roomId": 101,
  "checkIn": "2025-09-01",
  "checkOut": "2025-09-05"
}


Response:

{
  "id": 1,
  "status": "pending_payment",
  "hotelId": 1,
  "roomId": 101,
  "checkIn": "2025-09-01",
  "checkOut": "2025-09-05"
}

Payments
Initiate Payment

POST /api/payments/initiate

Body:

{
  "bookingId": 1,
  "method": "mpesa",
  "amount": 480
}


Response:

{
  "paymentId": "pay_123",
  "status": "processing",
  "redirectUrl": "https://sandbox.mpesa.com/checkout/pay_123"
}

Webhook (Provider → API)

POST /api/payments/webhook

Body:

{
  "paymentId": "pay_123",
  "status": "confirmed"
}


Response:

{ "message": "Payment updated and booking confirmed" }