import {
  initializeConfirmPassword,
  inputValidate,
  allValidate,
  checkIdDuplicate,
  setImgAttribute,
  checkIdValidate,
  checkSummonerNameExists,
  checkSummonerNameValidate,
  sendUserInfo,
} from '../controller/register';

const $main = document.querySelector('.membership-main');
const [$idDuplicationButton, $summonerDuplicationButton] = document.querySelectorAll('.signup-form__check-duplication');
const $registerButton = document.querySelector('.signup-form__button');

$main.onkeyup = ({ target }) => {
  if (target.name === 'password') {
    initializeConfirmPassword(document.getElementById('signup-confirm-password'));
  }

  inputValidate(target);

  $registerButton.disabled = !allValidate();
};

$idDuplicationButton.onclick = async ({ target }) => {
  const [$img, $span] = target.parentNode.nextElementSibling.children;

  await checkIdDuplicate();
  setImgAttribute($img, checkIdValidate());

  $span.textContent = checkIdValidate() ? '올바른 아이디입니다.' : '이메일이 이미 존재합니다.';
  $registerButton.disabled = !allValidate();
};

$summonerDuplicationButton.onclick = async ({ target }) => {
  const [$img, $span] = target.parentNode.nextElementSibling.children;

  await checkSummonerNameExists();
  setImgAttribute($img, checkSummonerNameValidate());

  $span.textContent = checkSummonerNameValidate() ? '올바른 소환사 명입니다.' : '존재하지 않는 소환사 명입니다.';
  $registerButton.disabled = !allValidate();
};

$registerButton.onclick = e => {
  e.preventDefault();
  sendUserInfo();
};
