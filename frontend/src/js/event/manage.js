import axios from '../utils/axiosConfig';
import {
  champ,
  getBoardId,
  setBoardId,
  getManageData,
  setManageData,
  getParticipantList,
  setParticipantList,
} from '../store/manage';

import renderParticipantList from '../view/manage';
import { changePositionAbleState, filterParticipantList } from '../utils/manage';
import { getLastPath } from '../utils/helper';
import setHeader from '../utils/header';
import launchToast from '../utils/toast';

// DOM Nodes
const $mainFilterPositionButtons = document.querySelectorAll('.main__filter-position-item > button');
const $participantList = document.querySelector('.participant-list');
const $mainFilterButton = document.querySelector('.main__filter-button');
const $mainFilterButtonTitle = document.querySelector('.main__filter-button-title');
const $mainFilterList = document.querySelector('.main__filter-list');
const $modalOuter = document.querySelector('.modal-outer');
const $modalClose = document.querySelector('.modal__close');
const $modalTitle = document.querySelector('.modal__title');
const $modalButton = document.querySelector('.modal__button');

// event Listener
window.addEventListener('DOMContentLoaded', async () => {
  setHeader();
  setBoardId(+getLastPath(window.location.href));
  const { data: boardData } = await axios.get(`/api/boards/manage/${getBoardId()}`);
  const { userIdList } = boardData;

  document.querySelector('.main__title').textContent = boardData.title;

  if (userIdList.length === 0) {
    document.body.removeChild(document.querySelector('.loading__container'));
    setManageData({ ...boardData, participantList: [] });
  } else {
    const { data: participantList } = await axios.get(`/api/manage/participants/${getBoardId()}=${userIdList.join()}`);
    const { position: targetPosition } = document.querySelector('button.select').dataset;
    const { filter } = document.querySelector('.main__filter-button-title').dataset;

    setManageData({ ...boardData, participantList: filterParticipantList(participantList, filter, targetPosition) });

    changePositionAbleState($mainFilterPositionButtons, getManageData());
    renderParticipantList($participantList, getManageData());

    document.body.removeChild(document.querySelector('.loading__container'));
  }
});

document.querySelector('.main__filter-position-list').onclick = e => {
  if (
    !e.target.closest('.main__filter-position-item > button') ||
    e.target.closest('.main__filter-position-item > button:disabled')
  )
    return;

  const { position: targetPosition } = e.target.closest('.main__filter-position-item > button').dataset;
  const { filter } = document.querySelector('.main__filter-button-title').dataset;

  $mainFilterPositionButtons.forEach($positionItem =>
    $positionItem.classList.toggle('select', targetPosition === $positionItem.dataset.position)
  );
  renderParticipantList($participantList, {
    ...getManageData(),
    participantList: filterParticipantList(getParticipantList(), filter, targetPosition),
  });
};

$mainFilterButton.onclick = () => $mainFilterList.classList.toggle('hidden');

$mainFilterList.onclick = e => {
  const { filter } = e.target.dataset;
  $mainFilterButtonTitle.dataset.filter = filter;
  $mainFilterButtonTitle.textContent = e.target.textContent;

  $mainFilterList.classList.toggle('hidden');

  renderParticipantList($participantList, {
    ...getManageData(),
    participantList: filterParticipantList(getParticipantList(), filter),
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
  $modalButton.dataset.boardId = getBoardId();
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
  const { title } = getManageData();
  const { email, summoner, position } = getParticipantList().find(participant => +participant.userId === +userId);

  $modalOuter.classList.toggle('hidden', true);

  axios.patch(`/api/boards/participant/${boardId}=${userId}`, { completed: true });

  setParticipantList(
    getParticipantList().map(participant =>
      +participant.userId === +userId ? { ...participant, completed: true } : participant
    )
  );

  if (e.target.matches('.button-warn')) return;

  await axios.patch(`/api/boards/position/${getBoardId()}=${userId}`, { position });

  setParticipantList(
    getParticipantList().map(board =>
      +board.userId === +userId ? { ...board, position: { ...position, [position]: false } } : board
    )
  );
  changePositionAbleState($mainFilterPositionButtons, getManageData());

  const { data } = await axios.post('/api/manage/mail', {
    to: email,
    subject: `${title} 게시글의 팀과 POT! 되셨습니다.`,
    text: `"${summoner}"님 축하드립니다.
            신청하신 "${title}" 게시글에 ${champ[position]} 포지션으로 참여 접수되었습니다.`,
  });

  launchToast(data);

  renderParticipantList($participantList, getManageData());
};
