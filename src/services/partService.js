const parts = require('./store');

let nextId = 1;

function getAll(filter = {}) {
  let result = parts;
  if (filter.name) {
    result = result.filter((p) => p.name.toLowerCase() === filter.name.toLowerCase());
  }
  return result;
}

function getById(id) {
  return parts.find((p) => p.id === id);
}

function isSerialTaken(serialNumber, exceptId) {
  return parts.some((p) => p.serialNumber === serialNumber && p.id !== exceptId);
}

function create(data) {
  const part = {
    id: nextId++,
    name: data.name,
    quantity: data.quantity,
    serialNumber: data.serialNumber,
  };
  parts.push(part);
  return part;
}

function replace(id, data) {
  const part = getById(id);
  if (!part) return undefined;
  part.name = data.name;
  part.quantity = data.quantity;
  part.serialNumber = data.serialNumber;
  return part;
}

function update(id, data) {
  const part = getById(id);
  if (!part) return undefined;
  if (data.name !== undefined) part.name = data.name;
  if (data.quantity !== undefined) part.quantity = data.quantity;
  if (data.serialNumber !== undefined) part.serialNumber = data.serialNumber;
  return part;
}

function remove(id) {
  const index = parts.findIndex((p) => p.id === id);
  if (index === -1) return false;
  parts.splice(index, 1);
  return true;
}

module.exports = { getAll, getById, isSerialTaken, create, replace, update, remove };
