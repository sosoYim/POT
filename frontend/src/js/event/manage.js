import {
  fetchManage,
  setPositionList,
  toggleMainFilter,
  setFilter,
  displayConfirmModal,
  closeModal,
  sendMail,
} from '../controller/manage';

window.addEventListener('DOMContentLoaded', fetchManage);

document.querySelector('.main__filter-position-list').onclick = setPositionList;

document.querySelector('.main__filter-button').onclick = toggleMainFilter;

document.querySelector('.main__filter-list').onclick = setFilter;

document.querySelector('.participant-list').onclick = displayConfirmModal;

document.querySelector('.modal-outer').onclick = closeModal;
document.querySelector('.modal__close').onclick = closeModal;

document.querySelector('.modal__button').onclick = sendMail;
