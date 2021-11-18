import axios from '../utils/axiosConfig';
import { getLastPath } from '../utils/helper';
import { setBoardType, setBoards } from '../store/createdpot';

const fetchBoards = async () => {
  try {
    const params = getLastPath(window.location.href);
    setBoardType(params);

    const { data } = await axios.get(`/api/boards/list/${params}`);
  } catch (error) {
    console.error(error);
  }
};
export { fetchBoards };
