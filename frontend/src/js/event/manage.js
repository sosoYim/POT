import axios from '../utils/axiosConfig';
import render from '../view/manage';
import { rankNum } from '../store/manage';
import { getLastPath } from '../utils/helper';

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

// state
let boardId;
let manageData = {};
const champ = {
  top: '탑',
  mid: '미드',
  jug: '정글',
  adc: '원딜',
  sup: '서폿',
};

// helper
const changePositionAbleState = () => {
  $mainFilterPositionButtons.forEach(positionButton => {
    const { position } = positionButton.dataset;

    if (!(manageData.position[position] === undefined))
      positionButton.toggleAttribute('disabled', !manageData.position[position]);
  });
};
const filterParticipantList = (participantList, filter, targetPosition = 'all') =>
  participantList
    .filter(({ position }) => targetPosition === 'all' || targetPosition === position)
    .sort((a, b) => {
      const newA = filter === 'rank' ? rankNum[a.tier + a[filter]] : a[filter];
      const newB = filter === 'rank' ? rankNum[b.tier + b[filter]] : b[filter];
      return newA > newB ? 1 : newA < newB ? -1 : 0;
    });

const createToast = ({ sendMail, content }) => {
  const toastContainer = document.createElement('div');
  toastContainer.classList.add('mail-toast');
  toastContainer.classList.toggle('success', sendMail);

  toastContainer.textContent = content;

  document.body.insertAdjacentElement('afterbegin', toastContainer);
  setTimeout(() => {
    document.body.removeChild(toastContainer);
  }, 3000);
};

const guideLogin = () => {
  console.log('hi');
  const $guideLoginmodalOuter = document.createElement('div');
  $guideLoginmodalOuter.className = 'modal-outer guide-login';
  $guideLoginmodalOuter.innerHTML = `
  <div class="modal">
    <button class="modal__close">
      <box-icon name='x' color="#4c4c4c"></box-icon>
    </button>
    <div class="modal__title">로그인이 필요한 서비스입니다.</div>
    <div class="modal__description">로그인 하시겠습니까?</div>
    <button class="guide-login__button button">로그인</button>
  </div>`;
  document.body.appendChild($guideLoginmodalOuter);

  $guideLoginmodalOuter.querySelector('.guide-login__button').onclick = () => {
    window.location.href = '/login';
  };
  $guideLoginmodalOuter.onclick = e => {
    if (e.target !== e.currentTarget) return;
    window.location.href = '/';
  };
  $guideLoginmodalOuter.querySelector('.modal__close').onclick = () => {
    window.location.href = '/';
  };
};

const renderLoginInfo = summoner =>
  summoner
    ? `
    <a class="header__nav-username" href="javascript:void(0);">${summoner}</a>
    <a class="header__nav-userinfo" href="javascript:void(0);">
      <box-icon type="solid" name="down-arrow" color="#4c4c4c" size="20px"></box-icon>
    </a>
    <div class="header__nav-setting-list">
      <a href="/createdpot.html" class="created-pot">작성한 POT</a>
      <a href="/appliedpot.html" class="applied-pot">신청한 POT</a>
      <a href="/participantedpot.html" class="participanted-pot">참여한 POT</a>
      <a href="/setting.html" class="set-user">설정</a>
      <a href="javascript:void(0);" class="logout">로그아웃</a>
    </div>
      `
    : '<a class="header__nav-login" href="/login">로그인</a>';

// event Listener
window.addEventListener('DOMContentLoaded', async () => {
  const {
    data: { isValidateLogin },
  } = await axios.get('/api/validate');

  if (!isValidateLogin) guideLogin();
  const summoner = document.cookie.includes('summoner') ? document.cookie.replace('summoner=', '') : null;
  console.log(summoner);
  renderLoginInfo(summoner);

  boardId = +getLastPath(window.location.href);
  const { data: boardData } = await axios.get(`/api/boards/manage/${boardId}`);
  const { userIdList } = boardData;
  const { data: participantList } = await axios.get(`/api/manage/participants/${boardId}=${userIdList.join()}`);

  const { position: targetPosition } = document.querySelector('button.select').dataset;
  const { filter } = document.querySelector('.main__filter-button-title').dataset;

  manageData = { ...boardData, participantList: filterParticipantList(participantList, filter, targetPosition) };

  $mainTitle.textContent = manageData.title;
  changePositionAbleState();
  $participantList.innerHTML = render(manageData);
  document.body.removeChild(document.querySelector('.loading__container'));
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
  console.log(manageData.position);
  changePositionAbleState();

  const { data } = await axios.post('/api/manage/mail', {
    to: email,
    subject: `${title} 게시글의 팀과 POT! 되셨습니다.`,
    text: `"${summoner}"님 축하드립니다.
            신청하신 "${title}" 게시글에 ${champ[position]} 포지션으로 참여 접수되었습니다.`,
  });

  createToast(data);

  $participantList.innerHTML = render(manageData);
};
