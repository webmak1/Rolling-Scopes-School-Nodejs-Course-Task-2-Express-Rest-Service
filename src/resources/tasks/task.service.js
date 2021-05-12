const tasksRepo = require('./task.memory.repository');
const Task = require('./task.model');

const getAll = async () => {
  const tasks = await tasksRepo.getAll();
  return tasks.map(Task.toResponse);
};
const get = (boardId, taskId) => tasksRepo.get(boardId, taskId);
const create = (task) => tasksRepo.create(task);
const update = (boardId, taskId, body) =>
  tasksRepo.update(boardId, taskId, body);
const remove = (id) => tasksRepo.remove(id);

module.exports = { getAll, get, create, update, remove };
