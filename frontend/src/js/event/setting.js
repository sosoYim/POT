import axios from '../utils/axiosConfig';

const [$summonerInput, $summonerDuplicationButton, $messageContainer] =
  document.querySelector('.form-text__input-container').children;
const [$img, $span] = $messageContainer.children;

const $completeButton = document.querySelector('.submit');

const URL = 'https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/';
const apiKey = 'RGAPI-f21ef8b0-0022-4fe3-85b7-a86dbdf4890d';

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
  try {
    const { data } = await axios.get(URL + formData.summonerName.value + '?api_key=' + apiKey);
    // form
    formData.summonerName.validate = true;
    $completeButton.disabled = false;
    // return true;
  } catch (err) {
    formData.summonerName.validate = false;
    $completeButton.disabled = true;
    // return false;
    // return false;
  }
};

const setImgAttribute = img => {
  console.log(formData.summonerName.validate);
  img.src = formData.summonerName.validate ? '../images/success.svg' : '../images/warning.svg';
  img.alt = formData.summonerName.validate ? '성공' : '경고';
};

const setSpanText = span => {
  span.textContent = formData.summonerName.validate
    ? formData.summonerName.successMessage
    : formData.summonerName.warningMessage;
};
window.addEventListener('DOMContentLoaded', () => {
  console.log(document.cookie);
});

$summonerInput.onkeyup = ({ target }) => {
  formData.summonerName.value = target.value;

  const isValid = formData.summonerName.regExp.test(target.value);
  $summonerDuplicationButton.disabled = !isValid;

  if ($summonerInput.value.trim() === '') {
    $messageContainer.style.opacity = 0;
  }
};

$summonerDuplicationButton.onclick = async () => {
  await checkSummonerNameExists();

  setImgAttribute($img);
  setSpanText($span);

  $messageContainer.style.opacity = 1;
};
