import { fetchBoard, createRequest } from '../controller/detailboard';

document.addEventListener('DOMContentLoaded', fetchBoard);

document.querySelector('.detailboard-button').onclick = e => {
  // TODO: 적어도 하나 이상의 라디오 선택
  e.target.matches('myBoard') ? console.log('참여자관리로') : createRequest();
};
