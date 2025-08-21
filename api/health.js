export default function handler(req, res) {
  res.status(200).json({ healthy: true, time: new Date().toISOString() });
}
