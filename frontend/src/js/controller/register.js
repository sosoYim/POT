import axios from '../utils/axiosConfig';
import formData from '../store/register';

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
  }
  $img.style.opacity = 1;
};

const checkIdDuplicate = async () => {
  try {
    const { data } = await axios.post('/api/user/checkid', {
      email: formData.userId.value,
    });
    formData.userId.validate = data === true;
  } catch (err) {
    console.log('error occur!');
    throw err;
  }
};

const checkSummonerNameExists = async () => {
  const { data } = await axios.post('/api/riot/summoner', {
    summoner: formData.summonerName.value,
  });

  formData.summonerName.validate = !!data;
  formData.summonerName.encryptedId = data ? data.id : '';
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

export {
  initializeConfirmPassword,
  inputValidate,
  allValidate,
  checkIdDuplicate,
  setImgAttribute,
  checkIdValidate,
  checkSummonerNameExists,
  checkSummonerNameValidate,
  sendUserInfo,
};
