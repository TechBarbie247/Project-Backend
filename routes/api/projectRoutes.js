app.post('/route', (req, res) => {
  const data = req.body;
  res.json({ message: 'POST route endpoint working ✅', data });
});