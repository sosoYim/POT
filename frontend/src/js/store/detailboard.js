import { render, renderMyBoard, renderMyRequest } from '../view/detailboard';

let board = {};

let state = {};
// state = {myBoard: false, myRequest:true}

const setBoard = (newBoard, newState = state) => {
  board = newBoard;
  state = newState;
  // console.log(board, 'store');
  render(board, state);
};

const setState = newState => {
  state = newState;
  state.myBoard ? renderMyBoard() : renderMyRequest(state.myRequest);
};

export { setBoard, setState };
