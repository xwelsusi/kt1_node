const partService = require('../services/partService');

function getAll(req, res) {
  res.status(200).json(partService.getAll(req.query));
}

function getById(req, res, next) {
  try {
    const part = partService.getById(Number(req.params.id));
    if (!part) return res.status(404).json({ error: 'Запчасть не найдена' });
    res.status(200).json(part);
  } catch (err) {
    next(err); // 
  }
}

function create(req, res, next) {
  try {
    const part = partService.create(req.body);
    res.status(201).json(part);
  } catch (err) {
    next(err);
  }
}

function replace(req, res, next) {
  try {
    const part = partService.replace(Number(req.params.id), req.body);
    if (!part) return res.status(404).json({ error: 'Запчасть не найдена' });
    res.status(200).json(part);
  } catch (err) {
    next(err);
  }
}

function update(req, res, next) {
  try {
    const part = partService.update(Number(req.params.id), req.body);
    if (!part) return res.status(404).json({ error: 'Запчасть не найдена' });
    res.status(200).json(part);
  } catch (err) {
    next(err);
  }
}

function remove(req, res, next) {
  try {
    const deleted = partService.remove(Number(req.params.id));
    if (!deleted) return res.status(404).json({ error: 'Запчасть не найдена' });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = { getAll, getById, create, replace, update, remove };
