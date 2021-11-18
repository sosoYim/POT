import axios from '../utils/axiosConfig';
import setHeader from '../utils/header';

const [$summonerInput, $summonerDuplicationButton, $messageContainer] =
  document.querySelector('.form-text__input-container').children;
const [$img, $span] = $messageContainer.children;

const $completeButton = document.querySelector('.submit');
const $deleteAccount = document.querySelector('.button-warn');

const formData = {
  summonerName: {
    value: '',
    successMessage: '올바른 소환사 명입니다.',
    warningMessage: '존재하는 소환사 명을 적어주세요',
    regExp: new RegExp(/^..{1,}$/),
    validate: false,
  },
};

const checkSummonerNameExists = async () => {
  const { data } = await axios.post('/api/riot/summoner', {
    summoner: formData.summonerName.value,
  });

  formData.summonerName.validate = !!data;
  $completeButton.disabled = !data;
};

const setImgAttribute = img => {
  img.src = formData.summonerName.validate ? '../images/success.svg' : '../images/warning.svg';
  img.alt = formData.summonerName.validate ? '성공' : '경고';
};

const setSpanText = span => {
  span.textContent = formData.summonerName.validate
    ? formData.summonerName.successMessage
    : formData.summonerName.warningMessage;
};

const changeName = () => {
  axios.post('/api/user/updateUserSummoner', {
    summoner: formData.summonerName.value,
  });
};

const launchToast = () => {
  const toastID = document.getElementById('toast');
  toastID.className = 'show';
  setTimeout(() => {
    toastID.className = toastID.className.replace('show', '');
  }, 5000);
};

const initializeFormData = () => {
  formData.summonerName.value = '';
  formData.summonerName.validate = false;
};

$summonerInput.onkeyup = ({ target }) => {
  formData.summonerName.value = target.value;

  const isValid = formData.summonerName.regExp.test(target.value);
  $summonerDuplicationButton.disabled = !isValid;

  if ($summonerInput.value.trim() === '') {
    $messageContainer.style.opacity = 0;
    $completeButton.disabled = true;
  }
};

window.addEventListener('DOMContentLoaded', setHeader);

$summonerDuplicationButton.onclick = async () => {
  await checkSummonerNameExists();

  setImgAttribute($img);
  setSpanText($span);

  $messageContainer.style.opacity = 1;
};

$completeButton.onclick = e => {
  e.preventDefault();
  changeName();

  launchToast();
  initializeFormData();
  $summonerInput.value = '';
  $messageContainer.style.opacity = 0;
  $completeButton.disabled = true;
  $summonerDuplicationButton.disabled = true;
};

$deleteAccount.onclick = e => {
  console.log(e.target);
};
