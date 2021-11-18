import axios from '../utils/axiosConfig';
// import state from '../store/manage';

import renderParticipantList from '../view/manage';
import { changePositionAbleState, filterParticipantList } from '../utils/manage';
import { getLastPath } from '../utils/helper';
import setHeader from '../utils/header';
import launchToast from '../utils/toast';

// DOM Nodes
const $mainTitle = document.querySelector('.main__title');
const $mainFilterPositionList = document.querySelector('.main__filter-position-list');
const $mainFilterPositionButtons = document.querySelectorAll('.main__filter-position-item > button');
const $participantList = document.querySelector('.participant-list');
const $mainFilterButton = document.querySelector('.main__filter-button');
const $mainFilterButtonTitle = document.querySelector('.main__filter-button-title');
const $mainFilterList = document.querySelector('.main__filter-list');
const $modalOuter = document.querySelector('.modal-outer');
const $modalClose = document.querySelector('.modal__close');
const $modalTitle = document.querySelector('.modal__title');
const $modalButton = document.querySelector('.modal__button');

// // state
let boardId;
let manageData = {};
const champ = {
  top: '탑',
  mid: '미드',
  jug: '정글',
  adc: '원딜',
  sup: '서폿',
};

// event Listener
window.addEventListener('DOMContentLoaded', async () => {
  setHeader();
  boardId = +getLastPath(window.location.href);
  const { data: boardData } = await axios.get(`/api/boards/manage/${boardId}`);
  const { userIdList } = boardData;

  if (userIdList.length === 0) {
    document.body.removeChild(document.querySelector('.loading__container'));
    return;
  }

  const { data: participantList } = await axios.get(`/api/manage/participants/${boardId}=${userIdList.join()}`);

  const { position: targetPosition } = document.querySelector('button.select').dataset;
  const { filter } = document.querySelector('.main__filter-button-title').dataset;

  manageData = { ...boardData, participantList: filterParticipantList(participantList, filter, targetPosition) };

  $mainTitle.textContent = manageData.title;

  changePositionAbleState($mainFilterPositionButtons, manageData);

  document.body.removeChild(document.querySelector('.loading__container'));

  renderParticipantList($participantList, manageData);
});

$mainFilterPositionList.onclick = e => {
  if (
    !e.target.closest('.main__filter-position-item > button') ||
    e.target.closest('.main__filter-position-item > button:disabled')
  ) {
    return;
  }

  const { position: targetPosition } = e.target.closest('.main__filter-position-item > button').dataset;
  const { filter } = document.querySelector('.main__filter-button-title').dataset;

  $mainFilterPositionButtons.forEach($positionItem =>
    $positionItem.classList.toggle('select', targetPosition === $positionItem.dataset.position)
  );
  renderParticipantList($participantList, {
    ...manageData,
    participantList: filterParticipantList(manageData.participantList, filter, targetPosition),
  });
};

$mainFilterButton.onclick = () => $mainFilterList.classList.toggle('hidden');

$mainFilterList.onclick = e => {
  const { filter } = e.target.dataset;
  $mainFilterButtonTitle.dataset.filter = filter;
  $mainFilterButtonTitle.textContent = e.target.textContent;

  $mainFilterList.classList.toggle('hidden');

  renderParticipantList($participantList, {
    ...manageData,
    participantList: filterParticipantList(manageData.participantList, filter),
  });
};

$participantList.onclick = e => {
  if (!e.target.closest('.participant__check')) return;

  const approve = JSON.parse(e.target.closest('.participant__check').dataset.approve);
  const { summoner, userId } = e.target.closest('.participant').dataset;

  $modalOuter.classList.toggle('hidden', false);

  $modalTitle.textContent = approve ? `${summoner}님과 POT 하시겠습니까?` : `${summoner}님의 신청을 거절하시겠습니까?`;

  $modalButton.classList.toggle('button-warn', !approve);
  $modalButton.textContent = approve ? 'POT!' : '거절';
  $modalButton.dataset.boardId = boardId;
  $modalButton.dataset.userId = userId;
};

[$modalOuter, $modalClose].forEach($el => {
  $el.onclick = e => {
    if (!(e.target.closest('.modal__close') || e.target === e.currentTarget)) return;

    $modalOuter.classList.toggle('hidden', true);
  };
});

$modalButton.onclick = async e => {
  const { boardId, userId } = e.target.dataset;
  const { title } = manageData;
  const { email, summoner, position } = manageData.participantList.find(participant => +participant.userId === +userId);

  $modalOuter.classList.toggle('hidden', true);

  axios.patch(`/api/boards/participant/${boardId}=${userId}`, { completed: true });

  manageData.participantList = manageData.participantList.map(participant =>
    +participant.userId === +userId ? { ...participant, completed: true } : participant
  );

  if (e.target.matches('.button-warn')) return;

  await axios.patch(`/api/boards/position/${boardId}=${userId}`, { position });

  manageData.participantList = manageData.participantList.map(board =>
    +board.userId === +userId ? { ...board, position: { ...position, [position]: false } } : board
  );
  changePositionAbleState($mainFilterPositionButtons, manageData);

  const { data } = await axios.post('/api/manage/mail', {
    to: email,
    subject: `${title} 게시글의 팀과 POT! 되셨습니다.`,
    text: `"${summoner}"님 축하드립니다.
            신청하신 "${title}" 게시글에 ${champ[position]} 포지션으로 참여 접수되었습니다.`,
  });

  // createToast(data);
  launchToast(data);

  renderParticipantList($participantList, manageData);
};
