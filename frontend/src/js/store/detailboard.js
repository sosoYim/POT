// boards.js 로 합치는건 어떤가
import { render } from '../view/detailboard';

let board = {};

const setBoard = newBoard => {
  board = newBoard;

  render(board);
};

export { setBoard };
