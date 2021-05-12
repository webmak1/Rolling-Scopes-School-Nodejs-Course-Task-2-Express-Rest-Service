const tasksRepo = require('./task.memory.repository');
const Task = require('./task.model');

const getAll = async () => {
  const tasks = await tasksRepo.getAll();
  return tasks.map(Task.toResponse);
};
const get = (boardId, taskId) => tasksRepo.get(boardId, taskId);
const create = async (req) => {
  const task = await tasksRepo.create(
    new Task({
      title: req.body.title,
      order: req.body.order,
      description: req.body.description,
      userId: req.body.userId,
      boardId: req.params.boardId,
      columnId: req.body.columnId,
    })
  );
  return Task.toResponse(task);
};
const update = async (req) => {
  const boardId = req.params.boardId;
  const taskId = req.params.id;
  const body = req.body;

  const updatedTask = await tasksRepo.update(boardId, taskId, body);
  return Task.toResponse(updatedTask);
};

const remove = async (req) => {
  const task = await tasksRepo.remove(req.params.id);
  return Task.toResponse(task);
};

module.exports = { getAll, get, create, update, remove };
