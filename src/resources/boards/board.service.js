const boardsRepo = require('./board.memory.repository');
const Board = require('./board.model');

const getAll = async () => {
  const boards = await boardsRepo.getAll();
  return boards.map(Board.toResponse);
};

const get = (id) => {
  return boardsRepo.get(id);
};

const create = async (req) => {
  const board = await boardsRepo.create(
    new Board({
      title: req.body.title,
      columns: req.body.columns,
    })
  );
  return Board.toResponse(board);
};

const update = async (req) => {
  const board = await boardsRepo.update(req.params.id, req.body);
  return Board.toResponse(board);
};

const remove = (boardId) => boardsRepo.remove(boardId);

module.exports = {
  getAll,
  get,
  create,
  remove,
  update,
};
