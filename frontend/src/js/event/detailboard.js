import { fetchBoard, createRequest } from '../controller/detailboard';

document.addEventListener('DOMContentLoaded', fetchBoard);

document.querySelector('.detailboard-button').onclick = e => {
  e.target.matches('myBoard') ? console.log('참여자관리로') : createRequest();
};
