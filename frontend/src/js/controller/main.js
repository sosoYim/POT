import axios from '../utils/axiosConfig';
import { setBoards } from '../store/main';

const fetchBoards = async () => {
  try {
    const { data } = await axios.get(`/api/boards/list`, {
      params: {
        currentPageNo: 1,
        recordsPerPage: 8,
      },
    });

    setBoards(data);
  } catch (error) {
    console.log(error);
  }
};

export { fetchBoards };
