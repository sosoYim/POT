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
  img.src = formData.summonerName.validate ? '../images/success.svg' : '../images/warning.svg';
  img.alt = formData.summonerName.validate ? '성공' : '경고';
};

const setSpanText = span => {
  span.textContent = formData.summonerName.validate
    ? formData.summonerName.successMessage
    : formData.summonerName.warningMessage;
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

window.addEventListener('DOMContentLoaded', async () => {
  const {
    data: { isValidateLogin },
  } = await axios.get('/api/validate');

  if (!isValidateLogin) guideLogin();
});

$summonerInput.onkeyup = ({ target }) => {
  formData.summonerName.value = target.value;

  const isValid = formData.summonerName.regExp.test(target.value);
  $summonerDuplicationButton.disabled = !isValid;

  if ($summonerInput.value.trim() === '') {
    $messageContainer.style.opacity = 0;
    $completeButton.disabled = true;
  }
};

$summonerDuplicationButton.onclick = async () => {
  await checkSummonerNameExists();

  setImgAttribute($img);
  setSpanText($span);

  $messageContainer.style.opacity = 1;
};
