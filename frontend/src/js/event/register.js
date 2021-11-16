// import maxios from 'axios';
import axios from '../utils/axiosConfig';

const URL = 'https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/';
const apiKey = 'RGAPI-1fb1cc41-0c61-48a4-adf2-51939ede42ca';

const $main = document.querySelector('.membership-main');
const [$idDuplicationButton, $summonerDuplicationButton] = document.querySelectorAll('.signup-form__check-duplication');
const $registerButton = document.querySelector('.signup-form__button');

const formData = {
  userId: {
    value: '',
    // 올바른 아이디입니다.
    successMessage: '중복확인 버튼을 눌러주세요.',
    warningMessage: '이메일 형식에 맞게 입력해주세요',
    duplicationMessage: '이메일이 이미 존재합니다.',
    regExp: new RegExp(/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/),
    validate: false,
  },
  summonerName: {
    value: '',
    // 올바른 소환사 명입니다.
    successMessage: '소환사명 확인버튼을 눌러주세요.',
    warningMessage: '존재하는 소환사 명을 적어주세요',
    regExp: new RegExp(/^..{1,}$/),
    validate: false,
    encryptedId: '',
  },
  password: {
    value: '',
    successMessage: '올바른 비밀번호 입니다.',
    warningMessage: '8자리 이상의 영문, 숫자조합을 입력하세요.',
    regExp: new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/),
    validate: false,
  },
  confirmPassword: {
    value: '',
    successMessage: '비밀번호가 일치합니다.',
    warningMessage: '비밀번호가 일치하지 않습니다.',
    validate: false,
  },
};

const setImgAttribute = (img, bool) => {
  img.src = bool ? './images/success.svg' : './images/warning.svg';
  img.alt = bool ? '성공' : '실패';
};

const setSpanText = (span, inputName, bool) => {
  span.textContent = bool ? formData[inputName].successMessage : formData[inputName].warningMessage;
};

const inputValidate = input => {
  const inputName = input.name;
  const inputValue = input.value;
  const [$img, $span] = input.parentNode.nextElementSibling.children;

  formData[inputName].value = inputValue;

  const isValid =
    inputName === 'confirmPassword'
      ? formData.password.value === formData.confirmPassword.value
      : formData[inputName].regExp.test(inputValue);
  formData[inputName].validate = isValid;

  if (inputName === 'userId' || inputName === 'summonerName') {
    // 중복확인 검사 버튼
    input.nextElementSibling.nextElementSibling.disabled = !isValid;
    formData[inputName].validate = false;
  }

  setImgAttribute($img, isValid);
  setSpanText($span, inputName, isValid);

  if (input.value.trim() === '') {
    $img.src = '';
    $img.alt = '';
    $span.textContent = '';
    $img.style.opacity = 0;
    // console.log(input.parentNode.nextElementSibling);
    // input.parentNode.nextElementSibling.style.setProperty('opacity', '0');
    // input.parentNode.nextElementSibling.style.opacity = '0';
  }
  //   input.parentNode.nextElementSibling.style.setProperty('opacity', '1');
  $img.style.opacity = 1;
};

const checkIdDuplicate = async () => {
  try {
    const { data } = await axios.post('/api/user/checkid', {
      email: formData.userId.value,
    });
    formData.userId.validate = data === true;
    console.log(formData.userId.validate);
  } catch (err) {
    console.log('error occur!');
    throw err;
  }
};

const checkSummonerNameExists = async () => {
  try {
    const { data } = await axios.get(URL + formData.summonerName.value + '?api_key=' + apiKey);
    // form
    formData.summonerName.encryptedId = data.id;
    formData.summonerName.validate = true;
  } catch (err) {
    formData.summonerName.validate = false;
    // return false;
  }
};

const checkIdValidate = () => formData.userId.validate;

const checkSummonerNameValidate = () => formData.summonerName.validate;

const initializeConfirmPassword = input => {
  input.value = '';

  formData.confirmPassword.value = '';
  formData.confirmPassword.validate = false;

  const [$img, $span] = input.parentNode.nextElementSibling.children;
  $img.style.opacity = 0;
  $span.textContent = '';
};

const allValidate = () => Object.keys(formData).every(data => formData[data].validate);

const sendUserInfo = () => {
  axios.post('/api/user/register', {
    email: formData.userId.value,
    password: formData.password.value,
    summoner: formData.summonerName.value,
    imageUrl: './images/defaultUser.png',
    encryptedId: formData.summonerName.encryptedId,
  });
  window.location.href = '/login';
};

$main.onkeyup = ({ target }) => {
  if (target.name === 'password') {
    initializeConfirmPassword(document.getElementById('signup-confirm-password'));
  }

  inputValidate(target);

  $registerButton.disabled = !allValidate();
};

$idDuplicationButton.onclick = async ({ target }) => {
  // 눌렀을 때 서버에서 데이터 받고
  const [$img, $span] = target.parentNode.nextElementSibling.children;

  await checkIdDuplicate();

  setImgAttribute($img, checkIdValidate());

  $span.textContent = checkIdValidate() ? '올바른 아이디입니다.' : '이메일이 이미 존재합니다.';

  $registerButton.disabled = !allValidate();
};

$summonerDuplicationButton.onclick = async ({ target }) => {
  // riot API를 사용하여 소환사 명 유효성 검사
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
