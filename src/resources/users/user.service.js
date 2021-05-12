const usersRepo = require('./user.memory.repository');
const User = require('./user.model');

const getAll = async () => {
  const users = await usersRepo.getAll();
  return users.map(User.toResponse);
};

const get = async (id) => {
  const user = await usersRepo.get(id);
  return User.toResponse(user);
};

const create = (user) => {
  return usersRepo.create(user);
};

const update = (id, body) => usersRepo.update(id, body);

const remove = (id) => usersRepo.remove(id);

module.exports = { getAll, get, create, remove, update };
