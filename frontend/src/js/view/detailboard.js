const $detailboardButton = document.querySelector('.detailboard-button');

const { QuillDeltaToHtmlConverter } = require('quill-delta-to-html');

const renderMyRequest = isMyRequest => {
  // [...document.querySelectorAll('.form-radio__label')].forEach($input => $input.classList.add('request'));
  $detailboardButton.innerText = isMyRequest ? '이미 신청한 POT' : '신청하기';

  if (isMyRequest) {
    document.querySelector('.detailboard-button').setAttribute('disabled', true);

    [...document.querySelectorAll('input[name="position"]')].forEach($input => {
      $input.setAttribute('disabled', true);
    });
  }
};

const renderMyBoard = () => {
  $detailboardButton.innerText = '신청자 관리';
  $detailboardButton.classList.add('myBoard');
  $detailboardButton.removeAttribute('disabled');
};

const render = (board, state) => {
  const { type, title, content, position, regDate, summonerName, tier } = board;
  // state
  document.querySelector('.pot-tag').textContent = type;
  document.querySelector('.pot-title').textContent = title;
  document.querySelector('time').dateTime = regDate;
  document.querySelector('.pot-info-user-summoner-name').textContent = summonerName;
  // eslint-disable-next-line prefer-destructuring
  document.querySelector('time').textContent = regDate.split(' ')[0];

  [...Object.entries(position)].forEach(([positionClass, request]) => {
    request
      ? document.querySelector(`.${positionClass}`).removeAttribute('disabled')
      : document.querySelector(`.${positionClass}`).setAttribute('disabled', 'disabled');
  });

  document.querySelector('.pot-info-user-emblem').setAttribute('src', `/images/emblem/${tier}.png`);

  const $detailboard = document.querySelector('.form__content');

  const $div = document.createElement('div');
  const quill = new Quill($div).setContents(content);

  $div.classList.add('ql-snow');
  $div.style.border = 'none';
  $detailboard.appendChild($div);
  document.querySelector('.ql-editor').setAttribute('contenteditable', false);
  state.myBoard ? renderMyBoard() : renderMyRequest(state.myRequest);
};

export { render, renderMyBoard, renderMyRequest };
