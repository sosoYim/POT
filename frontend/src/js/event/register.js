// import maxios from 'axios';
import axios from '../utils/axiosConfig';

// const $main = document.querySelector('.membership-main');

// $main.onkeyup = e => {
//   console.log('hi');
// };

const URL = 'https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/';
const apiKey = 'RGAPI-cc16b565-dbbf-4686-93e1-43f4e7f6ecb2';

const [$idInput, $summonerInput, $passwordInput, $confirmPasswordInput] =
  document.querySelectorAll('.signup-form__input');

const [$idDuplicationButton, $summonerDuplicationButton] = document.querySelectorAll('.signup-form__check-duplication');
const [$idMessage, $summonerMessage, $passwordMessage, $confirmPasswordMessage] =
  document.querySelectorAll('.signup-form__message');

const formData = {
  userId: {
    value: '',
    successMessage: '올바른 아이디입니다.',
    errorMessage: '4~12자의 영문+숫자로 입력해주세요',
    duplicationMessage: '아이디가 이미 존재합니다.',
    regExp: new RegExp(/^[a-zA-Z][a-zA-Z0-9]{3,11}$/),
    validate: false,
  },
  summonerName: {
    value: '',
    successMessage: '올바른 소환사 명입니다.',
    errorMessage: '존재하지 않는 소환사 명입니디.',
    regExp: new RegExp(/^..{1,14}$/),
    validate: false,
  },
  password: {
    value: '',
    successMessage: '올바른 비밀번호 입니다.',
    errorMessage: '8자리 이상의 영문, 숫자조합을 입력하세요.',
    regExp: new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/),
    validate: false,
  },
  confirmPassword: {
    value: '',
    successMessage: '비밀번호가 일치합니다.',
    errorMessage: '비밀번호가 일치하지 않습니다.',
    validate: false,
  },
};

const idValid = value => formData.userId.regExp.test(value);

const summonerValid = value => formData.summonerName.regExp.test(value);

const checkIdDuplicate = async id => {
  try {
    const { data } = await axios.post('/api/user/checkid', {
      account: id,
    });
    formData.userId.validate = data === true;
    console.log(formData.userId.validate);
  } catch (err) {
    console.log('error occur!');
    throw err;
  }
};

const checkSummonerNameExists = async summonerName => {
  try {
    const { data } = await axios.get(URL + summonerName + '?api_key=' + apiKey);
    // form
    console.log(data);
    formData.summonerName.validate = true;
    // console.log(data);
  } catch (err) {
    // console.log('hi');
    formData.summonerName.validate = false;
    // return false;
  }
};

const checkIdValidate = () => formData.userId.validate;

const checkSummonerNameValidate = () => formData.summonerName.validate;

$idInput.onkeyup = e => {
  const [$img, $span] = $idMessage.children;
  if (idValid(e.target.value)) {
    $idDuplicationButton.disabled = false;
    $img.src = './images/success.svg';
    $img.alt = '성공';
    $span.textContent = '중복확인 버튼을 눌러주세요.';
  } else {
    $idDuplicationButton.disabled = true;
    $img.src = './images/warning.svg';
    $img.alt = '경고';
    $span.textContent = formData.userId.errorMessage;
  }
  $img.style.opacity = 1;
  //   $img.setProperty('opacity', '1', 'important');
};

$summonerInput.onkeyup = e => {
  const [$img, $span] = $summonerMessage.children;
  if (summonerValid(e.target.value)) {
    $summonerDuplicationButton.disabled = false;
    $img.src = './images/success.svg';
    $img.alt = '성공';
    $span.textContent = '소환사명 확인버튼을 눌러주세요.';
  } else {
    $summonerDuplicationButton.disabled = true;
    $img.src = './images/warning.svg';
    $img.alt = '경고';
    $span.textContent = formData.summonerName.errorMessage;
  }
  $img.style.opacity = 1;
  //   $img.setProperty('opacity', 1);
};

$idDuplicationButton.onclick = async () => {
  // 눌렀을 때 서버에서 데이터 받고
  const [$img, $span] = $idMessage.children;

  await checkIdDuplicate($idInput.value);

  if (!checkIdValidate()) {
    $img.src = './images/warning.svg';
    $img.alt = '경고';
    $span.textContent = formData.userId.duplicationMessage;
  } else {
    $img.src = './images/success.svg';
    $img.alt = '성공';
    $span.textContent = formData.userId.successMessage;
  }
};

$summonerDuplicationButton.onclick = async () => {
  // riot API를 사용하여 소환사 명 유효성 검사
  const [$img, $span] = $summonerMessage.children;

  await checkSummonerNameExists($summonerInput.value);

  if (!checkSummonerNameValidate()) {
    $img.src = './images/warning.svg';
    $img.alt = '경고';
    $span.textContent = formData.summonerName.errorMessage;
  } else {
    $img.src = './images/success.svg';
    $img.alt = '성공';
    $span.textContent = formData.summonerName.successMessage;
  }
};
