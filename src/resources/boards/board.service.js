const boardsRepo = require('./board.memory.repository');
const Board = require('./board.model');

const getAll = async () => {
  const boards = await boardsRepo.getAll();
  return boards.map(Board.toResponse);
};

const get = (id) => boardsRepo.get(id);

const create = (board) => boardsRepo.create(board);

const update = (id, body) => boardsRepo.update(id, body);

const remove = (boardId) => boardsRepo.remove(boardId);

module.exports = {
  getAll,
  get,
  create,
  remove,
  update,
};
