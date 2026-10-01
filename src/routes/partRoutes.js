const express = require('express');
const controller = require('../controllers/partController');
const { validatePart, validatePartPatch } = require('../middlewares/validatePart');

const router = express.Router();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', validatePart, controller.create);
router.put('/:id', validatePart, controller.replace);
router.patch('/:id', validatePartPatch, controller.update);
router.delete('/:id', controller.remove);

module.exports = router;
