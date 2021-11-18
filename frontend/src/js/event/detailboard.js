import { fetchBoard, createRequest } from '../controller/detailboard';
import { getLastPath } from '../utils/helper';
import setHeader from '../utils/header';

document.addEventListener('DOMContentLoaded', fetchBoard);

document.querySelector('.detailboard-button').onclick = e => {
  const boardId = getLastPath(window.location.href);
  // TODO: 유효성 체크
  // TODO: 클래스 말고 로그인 체크 해서 보내기
  e.target.matches('.myBoard')
    ? (window.location.href = `${window.location.origin}/manage/${boardId}`)
    : createRequest();
};
