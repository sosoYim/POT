import { render } from '../view/main';

let boards = [];

const setBoards = newBoards => {
  boards = newBoards;

  render(boards);
};

export { setBoards };
