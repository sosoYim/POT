import { fetchBoard, createRequest } from '../controller/detailboard';

import { getLastPath } from '../utils/helper';
import setHeaderRequest from '../utils/modal';

const isPositionChecked = $positionInputs => [...$positionInputs].some(position => position.checked);

document.addEventListener('DOMContentLoaded', fetchBoard);

document.querySelector('.detailboard-button').onclick = e => {
  const boardId = getLastPath(window.location.href);

  e.target.matches('.myBoard')
    ? (window.location.href = `${window.location.origin}/manage/${boardId}`)
    : isPositionChecked(document.querySelectorAll('input[name="position"]'))
    ? setHeaderRequest()
    : (document.querySelector('.msg').innerText = '포지션을 선택해주세요');
};
