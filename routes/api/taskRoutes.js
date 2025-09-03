app.delete('/route/:id', (req, res) => {
  const { id } = req.params;
  res.json({ message: `DELETE route with ID id removed ✅` });
});