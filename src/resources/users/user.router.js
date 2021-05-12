const { StatusCodes } = require('http-status-codes');
const router = require('express').Router();
const usersService = require('./user.service');

// GET ALL
router.route('/').get(async (_req, res) => {
  return res.json(await usersService.getAll());
});

// GET BY ID
router.route('/:id').get(async (req, res) => {
  return res.json(await usersService.get(req));
});

// CREATE
router.route('/').post(async (req, res) => {
  return res.status(StatusCodes.CREATED).json(await usersService.create(req));
});

// UPDATE
router.route('/:id').put(async (req, res) => {
  return res.json(await usersService.update(req.params.id, req.body));
});

// DELETE
router.route('/:id').delete(async (req, res) => {
  return res.json(await usersService.remove(req.params.id));
});

module.exports = router;
