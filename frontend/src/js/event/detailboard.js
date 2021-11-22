import { fetchBoard, createRequest } from '../controller/detailboard';

import { getLastPath } from '../utils/helper';
import setHeaderRequest from '../utils/modal';

const isPositionChecked = $positionInputs => [...$positionInputs].some(position => position.checked);

// const quill = () =>
//   new Quill('#editor__api', {
//     modules: {
//       toolbar: false,
//     },
//     theme: 'snow',
//   });

// const editor = quill();
// editor.enable(false);

document.addEventListener('DOMContentLoaded', fetchBoard);

document.querySelector('.detailboard-button').onclick = e => {
  const boardId = getLastPath(window.location.href);

  e.target.matches('.myBoard')
    ? (window.location.href = `${window.location.origin}/manage/${boardId}`)
    : setHeaderRequest();
};

document.querySelector('.form-radio__icons').onchange = () => {
  const $detailboardButton = document.querySelector('.detailboard-button');

  isPositionChecked(document.querySelectorAll('input[name="position"]'))
    ? $detailboardButton.removeAttribute('disabled')
    : $detailboardButton.setAttribute('disabled', true);
};
