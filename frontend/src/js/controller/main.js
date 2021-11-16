import { debounce } from 'lodash';
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

const fetchBoards = async () => {
  try {
    setCurrentPageNo(1);

    const { type, position } = getFilter();
    const { currentPageNo, recordsPerPage } = getBoards();
    const { data } = await axios.get(`/api/boards/list`, {
      params: {
        type,
        position,
        currentPageNo,
        recordsPerPage,
      },
    });

    setBoards(data);
  } catch (error) {
    console.error(error);
  }
};

const fetchMoreBoards = debounce(async () => {
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

    setBoards([...list, ...data]);
  } catch (error) {
    console.error(error);
  }
}, 500);

const changeTypeFilter = type => {
  setTypeFilter(type);
  fetchBoards();
};
const changePositionFilter = position => {
  setPositionFilter(position);
  fetchBoards();
};

export { fetchBoards, fetchMoreBoards, changeTypeFilter, changePositionFilter };
