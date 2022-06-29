export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json({ response: "Welcome to my e-commerce website😇" });
  }
}
