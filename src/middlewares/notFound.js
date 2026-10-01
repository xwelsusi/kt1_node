function notFound(req, res, next) {
  res.status(404).json({ error: `Маршрут ${req.method} ${req.originalUrl} не найден` });
}

module.exports = notFound;
