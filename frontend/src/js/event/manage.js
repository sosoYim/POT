import axios from 'axios';
import render from '../view/manage';
import { rankNum } from '../store/manage';

// DOM Nodes
const $mainTitle = document.querySelector('.main__title');
const $mainFilterPositionList = document.querySelector('.main__filter-position-list');
const $mainFilterPositionItems = document.querySelectorAll('.main__filter-position-item > button');
const $participantList = document.querySelector('.participant-list');

// state
const boardId = 2;
const userIdList = [2, 3, 4];
let manageData = {};
let curParticipantList = [];

window.addEventListener('DOMContentLoaded', async () => {
  // data 초기 설정
  const { position: targetPosition } = document.querySelector('button.select').dataset;
  const { filter } = document.querySelector('.main__filter-button-title').dataset;
  const { data: boardData } = await axios.get(`/api/boards/${boardId}`);
  const { data: participantList } = await axios.get(`/api/manage/${boardId}=${userIdList.join()}`);
  curParticipantList = participantList
    .filter(({ position }) => targetPosition === 'all' || targetPosition === position)
    .sort((a, b) => rankNum[a.tier + a[filter]] - rankNum[b.tier + b[filter]]);

  manageData = { ...boardData, participantList: curParticipantList };
  $mainTitle.textContent = manageData.title;
  $participantList.innerHTML = render(manageData);
});

$mainFilterPositionList.onclick = e => {
  if (!e.target.closest('.main__filter-position-item > button')) return;
  console.log(e.target.closest('.main__filter-position-item > button'));
  const { position: targetPosition } = e.target.closest('.main__filter-position-item > button').dataset;
  const { filter } = document.querySelector('.main__filter-button-title').dataset;
  curParticipantList = manageData.participantList
    .filter(({ position }) => targetPosition === 'all' || targetPosition === position)
    .sort((a, b) => rankNum[a.tier + a[filter]] - rankNum[b.tier + b[filter]]);

  const filterManageData = { ...manageData, participantList: curParticipantList };

  $mainFilterPositionItems.forEach($positionItem =>
    $positionItem.classList.toggle('select', targetPosition === $positionItem.dataset.position)
  );
  $participantList.innerHTML = render(filterManageData);
};
