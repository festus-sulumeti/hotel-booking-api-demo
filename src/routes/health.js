export default function handler(req, res) {
  return res.status(200).json({
    healthy: true,
    time: new Date().toISOString()
  });
}
