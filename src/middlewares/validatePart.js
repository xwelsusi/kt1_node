const partService = require('../services/partService');

const SERIAL_REGEX = /^[A-Za-z]{2}-\d{4}$/;

function checkFields(body, requireAll) {
  const { name, quantity, serialNumber } = body;

  if (requireAll || name !== undefined) {
    if (typeof name !== 'string' || name.trim() === '') {
      return 'Поле name обязательно и должно быть заполнено';
    }
  }
  if (requireAll || quantity !== undefined) {
    if (!Number.isInteger(quantity) || quantity < 0) {
      return 'Поле quantity обязательно и должно быть целым числом >= 0';
    }
  }
  if (requireAll || serialNumber !== undefined) {
    if (typeof serialNumber !== 'string' || !SERIAL_REGEX.test(serialNumber)) {
      return 'Поле serialNumber обязательно и должно быть в формате XX-0000 (например, AB-1234)';
    }
  }
  return null;
}

function validatePart(req, res, next) {
  req.body = req.body || {};

  const error = checkFields(req.body, true);
  if (error) return res.status(400).json({ error });

  const currentId = req.params.id ? Number(req.params.id) : undefined;
  if (partService.isSerialTaken(req.body.serialNumber, currentId)) {
    return res.status(400).json({ error: 'Такой serialNumber уже существует' });
  }
  next();
}

function validatePartPatch(req, res, next) {
  req.body = req.body || {};

  const error = checkFields(req.body, false);
  if (error) return res.status(400).json({ error });

  if (req.body.serialNumber !== undefined) {
    const currentId = Number(req.params.id);
    if (partService.isSerialTaken(req.body.serialNumber, currentId)) {
      return res.status(400).json({ error: 'Такой serialNumber уже существует' });
    }
  }
  next();
}

module.exports = { validatePart, validatePartPatch };
