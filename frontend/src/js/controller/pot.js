import axios from '../utils/axiosConfig';
import { getLastPath } from '../utils/helper';
import setHeader from '../utils/header';
import { setBoardType, setBoards } from '../store/pot';

const fetchBoards = async () => {
  try {
    const $potTitle = document.querySelector('.pot-title');

    setHeader();
    const params = getLastPath(window.location.href);
    $potTitle.innerHTML = params === 'created' ? '작성한 POT' : '신청한 POT';

    setBoardType(params);

    const { data } = await axios.get(`/api/boards/list/${params}`);

    setBoards(data);
  } catch (error) {
    console.error(error);
  }
};
export { fetchBoards };
