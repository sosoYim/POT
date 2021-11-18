const state = {
  board: {
    type: '',
    list: [],
  },
};

const setBoardType = type => {
  state.board.type = type;
};

const setBoards = boards => {
  state.board.list = boards;
};

export { setBoardType, setBoards };
