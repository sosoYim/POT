import { render } from '../view/main';

const state = {
  filter: {
    type: '2 POT',
    position: 'all',
  },
  board: {
    currentPageNo: 1,
    recordsPerPage: 8,
    list: [],
  },
};

const setTypeFilter = type => {
  state.filter.type = type;
};

const setPositionFilter = position => {
  state.filter.position = position;
};

const setCurrentPageNo = currentPageNo => {
  state.board.currentPageNo = currentPageNo;
};

const setBoards = newBoards => {
  state.board.list = newBoards;

  render(state.board.list);
};

const getCurrentPageNo = () => state.board.currentPageNo;

const getFilter = () => state.filter;

const getBoards = () => state.board;

export { setTypeFilter, setPositionFilter, setCurrentPageNo, setBoards, getCurrentPageNo, getFilter, getBoards };
