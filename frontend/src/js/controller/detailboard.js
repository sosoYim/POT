import axios from '../utils/axiosConfig';
import { setBoard } from '../store/detailboard';

const fetchBoard = async () => {
  try {
    const boardId = sessionStorage.getItem('boardId');
    const { data } = await axios.get(`/api/boards/detail?boardId=${boardId}`);
    // console.log('detailboard controller', data.board, data.myRequest);
    setBoard(data.board, data.myRequest);
  } catch (error) {
    console.log(error);
  }
};

const createRequest = async () => {
  try {
    // TODO: 로그인 유저 아이디
    const loginUserId = 2;

    const boardId = sessionStorage.getItem('boardId');
    const userId = loginUserId;
    // position정보 가져오기

    const { data } = await axios.post('/api/boards/detail', boardId);
    console.log(data);
    // setBoard ... setState?
  } catch (error) {
    console.log(error);
  }
};

export { fetchBoard, createRequest };
