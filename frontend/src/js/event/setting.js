import setHeader from '../utils/header';
import {
  summonerNameValid,
  setSummonerValue,
  checkSummonerNameExists,
  setImgAttribute,
  setSpanText,
  changeName,
  launchToast,
  initializeFormData,
} from '../controller/setting';

const [$summonerInput, $summonerDuplicationButton, $messageContainer] =
  document.querySelector('.form-text__input-container').children;
const [$img, $span] = $messageContainer.children;

const $completeButton = document.querySelector('.submit');
const $deleteAccount = document.querySelector('.button-warn');

$summonerInput.onkeyup = ({ target }) => {
  const isValid = summonerNameValid(target.value);

  if (isValid) {
    setSummonerValue(target.value);
  }

  $summonerDuplicationButton.disabled = !isValid;

  if ($summonerInput.value.trim() === '') {
    $messageContainer.style.opacity = 0;
    $completeButton.disabled = true;
  }
};

window.addEventListener('DOMContentLoaded', setHeader);

$summonerDuplicationButton.onclick = async () => {
  await checkSummonerNameExists($completeButton);

  setImgAttribute($img);
  setSpanText($span);

  $messageContainer.style.opacity = 1;
};

$completeButton.onclick = e => {
  e.preventDefault();
  changeName();
  setHeader();

  launchToast();
  initializeFormData();
  $summonerInput.value = '';
  $messageContainer.style.opacity = 0;
  $completeButton.disabled = true;
  $summonerDuplicationButton.disabled = true;
};

// $deleteAccount.onclick = e => {
//   console.log(e.target);
// };
