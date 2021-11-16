import axios from '../utils/axiosConfig';
import render from '../view/manage';
import { rankNum } from '../store/manage';

// DOM Nodes
const $mainTitle = document.querySelector('.main__title');
const $mainFilterPositionList = document.querySelector('.main__filter-position-list');
const $mainFilterPositionItems = document.querySelectorAll('.main__filter-position-item > button');
const $participantList = document.querySelector('.participant-list');
const $mainFilterButton = document.querySelector('.main__filter-button');
const $mainFilterButtonTitle = document.querySelector('.main__filter-button-title');
const $mainFilterList = document.querySelector('.main__filter-list');
const $modalOuter = document.querySelector('.modal-outer');
const $modalClose = document.querySelector('.modal__close');
const $modalTitle = document.querySelector('.modal__title');
const $modalButton = document.querySelector('.modal__button');

// state
const boardId = 2;
const userIdList = [1, 3, 4, 5, 6];
let manageData = {};

// helper
const filterParticipantList = (participantList, filter, targetPosition = 'all') =>
  participantList
    .filter(({ position }) => targetPosition === 'all' || targetPosition === position)
    .sort((a, b) => {
      const newA = filter === 'rank' ? rankNum[a.tier + a[filter]] : a[filter];
      const newB = filter === 'rank' ? rankNum[b.tier + b[filter]] : b[filter];
      return newA > newB ? 1 : newA < newB ? -1 : 0;
    });

// event Listener
window.addEventListener('DOMContentLoaded', async () => {
  const { data: boardData } = await axios.get(`/api/boards/manage/${boardId}`);
  const { data: participantList } = await axios.get(`/api/manage/${boardId}=${userIdList.join()}`);

  const { position: targetPosition } = document.querySelector('button.select').dataset;
  const { filter } = document.querySelector('.main__filter-button-title').dataset;

  manageData = { ...boardData, participantList: filterParticipantList(participantList, filter, targetPosition) };

  $mainTitle.textContent = manageData.title;
  $participantList.innerHTML = render(manageData);
});

$mainFilterPositionList.onclick = e => {
  if (!e.target.closest('.main__filter-position-item > button')) return;

  const { position: targetPosition } = e.target.closest('.main__filter-position-item > button').dataset;
  const { filter } = document.querySelector('.main__filter-button-title').dataset;

  $mainFilterPositionItems.forEach($positionItem =>
    $positionItem.classList.toggle('select', targetPosition === $positionItem.dataset.position)
  );
  $participantList.innerHTML = render({
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

  $participantList.innerHTML = render({
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

  $modalOuter.classList.toggle('hidden', true);

  axios.patch(`/api/boards/participant/${boardId}=${userId}`, { completed: true });

  manageData.participantList = manageData.participantList.map(participant =>
    +participant.userId === +userId ? { ...participant, completed: true } : participant
  );

  // const mail = await axios.post('/api/manage/mail', {
  //   to: 'sonwj0915@naver.com',
  //   subject: 'Hello',
  //   text: 'Hello world?',
  // });

  $participantList.innerHTML = render(manageData);
};
