const $detailboardButton = document.querySelector('.detailboard-button');

const { QuillDeltaToHtmlConverter } = require('quill-delta-to-html');

// TypeScript / ES6:
// import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';

const renderMyRequest = isMyRequest => {
  $detailboardButton.innerText = isMyRequest ? '이미 신청한 POT' : '신청하기';
  isMyRequest
    ? $detailboardButton.setAttribute('disabled', 'disabled')
    : $detailboardButton.removeAttribute('disabled');
};

const render = (board, isMyRequest = false) => {
  const { boardId, userId, type, title, content, position, regDate } = board;

  const loginUserId = 3;
  // TODO: OK 작성자 vs 독자
  const myBoard = +userId === +loginUserId;
  if (myBoard) {
    $detailboardButton.innerText = '참여자 관리';
    $detailboardButton.classList.classList.add('myBoard');
  } else {
    renderMyRequest(isMyRequest);
  }

  // $detailboardButton.innerText = myBoard ? '참여자 관리' : myRequest ? '이미 신청한 POT' : '신청하기';
  // $detailboardButton.classList.toggle('myBoard', myBoard);
  // $detailboardButton.toggleAttribute('disabled', myRequest);

  document.querySelector('.pot-tag').textContent = type;
  document.querySelector('.pot-title').textContent = title;
  document.querySelector('time').dateTime = regDate;
  // eslint-disable-next-line prefer-destructuring
  document.querySelector('time').textContent = regDate.split(' ')[0];

  // Button이 아니라 radio로 수정 예정
  [...Object.entries(position)].forEach(([positionClass, request]) => {
    request
      ? document.querySelector(`.${positionClass}`).removeAttribute('disabled')
      : document.querySelector(`.${positionClass}`).setAttribute('disabled', 'disabled');
  });

  // npm install quill-delta-to-html
  const qdc = new QuillDeltaToHtmlConverter(content.ops, {});
  const html = qdc.convert();
  document.querySelector('.form__content').innerHTML = html;
};

export { render, renderMyRequest };
