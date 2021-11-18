import axios from '../utils/axiosConfig';
import { getLastPath } from '../utils/helper';
import setHeader from '../utils/header';
import { setBoardType, setBoards } from '../store/createdpot';

const fetchBoards = async () => {
  try {
    setHeader();
    const params = getLastPath(window.location.href);
    setBoardType(params);

    const { data } = await axios.get(`/api/boards/list/${params}`);

    setBoards(data);
  } catch (error) {
    console.error(error);
  }
};
export { fetchBoards };
