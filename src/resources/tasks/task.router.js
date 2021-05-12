const { StatusCodes } = require('http-status-codes');
const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const tasksService = require('./task.service');

// GET ALL
router.route('/').get(async (_req, res) => {
  return res.json(await tasksService.getAll());
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
  return res.status(StatusCodes.CREATED).json(await tasksService.create(req));
});

// UPDATE
router.route('/:id').put(async (req, res) => {
  return res.json(await tasksService.update(req));
});

// DELETE
router.route('/:id').delete(async (req, res) => {
  return res.json(await tasksService.remove(req));
});

module.exports = router;
