const { StatusCodes } = require('http-status-codes');
const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const tasksService = require('./task.service');

router.route('/').get(async (req, res) => {
  const tasks = await tasksService.getAll();
  return res.json(tasks.map(Task.toResponse));
});

// GET BY ID
router.route('/:id').get(async (req, res) => {
  const boardId = req.params.boardId;
  const taskId = req.params.id;
  try {
    const task = await tasksService.get(boardId, taskId);
    return res.json(Task.toResponse(task));
  } catch (err) {
    return res.status(StatusCodes.NOT_FOUND).send(err.message);
  }
});

// CREATE
router.route('/').post(async (req, res) => {
  const task = await tasksService.create(
    new Task({
      title: req.body.title,
      order: req.body.order,
      description: req.body.description,
      userId: req.body.userId,
      boardId: req.params.boardId,
      columnId: req.body.columnId,
    })
  );
  return res.status(StatusCodes.CREATED).json(Task.toResponse(task));
});

router.route('/:id').put(async (req, res) => {
  const boardId = req.params.boardId;
  const taskId = req.params.id;
  const body = req.body;
  try {
    const updatedTask = await tasksService.update(boardId, taskId, body);
    return res.json(Task.toResponse(updatedTask));
  } catch (err) {
    res.status(StatusCodes.NOT_FOUND).send(err.message);
  }
});

router.route('/:id').delete(async (req, res) => {
  try {
    const task = await tasksService.remove(req.params.id);
    return res.json(Task.toResponse(task));
  } catch (err) {
    res.status(StatusCodes.NOT_FOUND).send(err.message);
  }
});

module.exports = router;
