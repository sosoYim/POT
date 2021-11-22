import axios from '../utils/axiosConfig';
import {
  setCurrentPageNo,
  setTypeFilter,
  setPositionFilter,
  setBoards,
  getCurrentPageNo,
  getFilter,
  getBoards,
} from '../store/main';

const resetBoard = () => {
  try {
    setCurrentPageNo(0);
    setBoards([]);
  } catch (error) {
    console.error(error);
  }
};

const fetchBoards = async () => {
  try {
    setCurrentPageNo(getCurrentPageNo() + 1);

    const { type, position } = getFilter();
    const { currentPageNo, recordsPerPage, list } = getBoards();
    const { data } = await axios.get(`/api/boards/list`, {
      params: {
        type,
        position,
        currentPageNo,
        recordsPerPage,
      },
    });

    if (!data.length) document.querySelector('.loading').classList.add('hidden');

    setBoards([...list, ...data]);
  } catch (error) {
    console.error(error);
  }
};

const changeTypeFilter = type => {
  setTypeFilter(type);
  resetBoard();
};

const changePositionFilter = position => {
  setPositionFilter(position);
  resetBoard();
};

export { resetBoard, fetchBoards, changeTypeFilter, changePositionFilter };
