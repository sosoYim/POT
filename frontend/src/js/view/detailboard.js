const $detailboardButton = document.querySelector('.detailboard-button');

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

  // TODO: setContents 불러오기
  // https://github.com/nozer/quill-delta-to-html
  // npm install quill-delta-to-html
  // console.log(content);
  // document.querySelector('.main__board-content').innerHTML = JSON.parse(content).getContent();
};

export { render, renderMyRequest };
