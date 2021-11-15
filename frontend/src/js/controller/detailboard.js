import axios from 'axios';
import { setBoard } from '../store/detailboard';

const fetchBoard = async () => {
  try {
    console.log('fetchBoard', sessionStorage.getItem('boardId'));
    const { data } = await axios.get(`/api/boards/detail?boardId=${sessionStorage.getItem('boardId')}`);
    console.log(data);
    // setBoard(data);
  } catch (error) {
    console.log(error);
  }
};

export { fetchBoard };
