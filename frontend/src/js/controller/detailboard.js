import axios from '../utils/axiosConfig';
import { setBoard, setState } from '../store/detailboard';
import { getLastPath } from '../utils/helper';
import setHeader from '../utils/header';
// import setHeaderRequest from '../utils/modal';

const fetchBoard = async () => {
  setHeader();
  try {
    const boardId = getLastPath(window.location.href);
    const { data } = await axios.get(`/api/boards/detail/${boardId}`);
    const state = { myBoard: data.userId === data.board.userId, myRequest: data.myRequest };
    setBoard(data.board, state);
    document.body.removeChild(document.querySelector('.loading__container'));
  } catch (error) {
    console.log(error);
  }
};

const createRequest = async () => {
  try {
    const boardId = getLastPath(window.location.href);
    const position = document.querySelector('input[name="position"]:checked').value;
    const request = { boardId, position };
    await axios.post('/api/boards/detail', request);
    setState({ myBoard: false, myRequest: true });
  } catch (error) {
    console.log(error);
  }
};

export { fetchBoard, createRequest };
