const { StatusCodes } = require('http-status-codes');
const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

// GET ALL
router.route('/').get(async (_req, res) => {
  return res.json(await usersService.getAll());
});

// GET BY ID
router.route('/:id').get(async (req, res) => {
  return res.json(await usersService.get(req.params.id));
});

// CREATE
router.route('/').post(async (req, res) => {
  const user = await usersService.create(
    new User({
      login: req.body.login,
      password: req.body.password,
      name: req.body.name,
    })
  );
  return res.status(StatusCodes.CREATED).json(User.toResponse(user));
});

// UPDATE
router.route('/:id').put(async (req, res) => {
  try {
    const user = await usersService.update(req.params.id, req.body);
    return res.json(User.toResponse(user));
  } catch (err) {
    return res.status(StatusCodes.NOT_FOUND).send(err.message);
  }
});

// DELETE
router.route('/:id').delete(async (req, res) => {
  try {
    const user = await usersService.remove(req.params.id);
    return res.json(User.toResponse(user));
  } catch (err) {
    return res.status(StatusCodes.NOT_FOUND).send(err.message);
  }
});

module.exports = router;
