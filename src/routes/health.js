import express from "express"
const router = express.Router();

router.get("/", (req, res) => {
  res.json({healthy: true, time: new Date().toISOString() });
});

export default router
