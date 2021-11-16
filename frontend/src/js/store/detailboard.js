import { render, renderMyRequest } from '../view/detailboard';

let board = {};
let state;
// setState? (myRequest)

const setBoard = (newBoard, myRequest) => {
  board = newBoard;
  state = myRequest;
  render(board, state);
};

const setState = isMyRequest => {
  renderMyRequest(isMyRequest);
};

export { setBoard, setState };
