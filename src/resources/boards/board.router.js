const { StatusCodes } = require('http-status-codes');
const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');

// GET ALL
router.route('/').get(async (_req, res) => {
  return res.json(await boardsService.getAll());
});

// GET BY ID
router.route('/:id').get(async (req, res) => {
  const boardId = req.params.id;

  try {
    const board = await boardsService.get(boardId);
    return res.json(Board.toResponse(board));
  } catch (err) {
    res.status(StatusCodes.NOT_FOUND).send(err.message);
  }
});

// CREATE
router.route('/').post(async (req, res) => {
  return res.status(StatusCodes.CREATED).json(await boardsService.create(req));
});

// UPDATE
router.route('/:id').put(async (req, res) => {
  return res.json(await boardsService.update(req));
});

// DELETE
router.route('/:id').delete(async (req, res) => {
  return res.json(await boardsService.remove(req));
});

module.exports = router;
