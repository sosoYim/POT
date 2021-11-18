import axios from '../utils/axiosConfig';
import { setBoard, setState } from '../store/detailboard';
import { getLastPath } from '../utils/helper';

const fetchBoard = async () => {
  try {
    const boardId = getLastPath(window.location.href);
    const { data } = await axios.get(`/api/boards/detail/${boardId}`);
    const state = { myBoard: data.userId === data.board.userId, myRequest: data.myRequest };
    setBoard(data.board, state);
  } catch (error) {
    console.log(error);
  }
};

const createRequest = async () => {
  try {
    // TODO: 쿠키 값으로 가져와야 함
    const loginUserId = 3;
    const userId = loginUserId;

    const boardId = getLastPath(window.location.href);
    const position = document.querySelector('input[name="position"]:checked').value;
    const request = { userId, boardId, position };
    const { data } = await axios.post('/api/boards/detail', request);
    console.log(data);
    setState(true);
  } catch (error) {
    console.log(error);
  }
};

export { fetchBoard, createRequest };
