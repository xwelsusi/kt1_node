const partService = require('./services/partService');

function seed() {
  partService.create({ name: 'Фильтр масляный', quantity: 15, serialNumber: 'AB-1001' });
  partService.create({ name: 'Свеча зажигания', quantity: 40, serialNumber: 'CD-2002' });
}

module.exports = seed;