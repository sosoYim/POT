import axios from '../utils/axiosConfig';

const $loginForm = document.querySelector('.login-form');
const $loginFormErrorMessage = document.querySelector('.login-form__error-message');
const [$emailInput, $passwordInput] = document.querySelectorAll('.login-form__input');
const $passwordIconButton = document.querySelector('.login-form__password-icon');
const $loginButton = document.querySelector('.login-form__button');

const formData = {
  email: {
    value: '',
    validate: false,
  },
  password: {
    value: '',
    validate: false,
  },
};

const setInputFormData = input => {
  formData[input.name].value = input.value;
  formData[input.name].validate = input.value.trim() !== '';
};

const initializeFormData = () => {
  formData.email.value = '';
  formData.password.value = '';
  formData.email.validate = false;
  formData.password.validate = false;
};

const allValidate = () => Object.keys(formData).every(data => formData[data].validate);

const login = async () => {
  try {
    await axios.post('/api/user/login', {
      email: formData.email.value,
      password: formData.password.value,
    });
    // window.location.href = '/';
  } catch (err) {
    $loginFormErrorMessage.textContent = '계정이름과 비밀번호가 일치하지 않습니다.';
    initializeFormData();
    $emailInput.focus();
    $emailInput.value = '';
    $passwordInput.value = '';
    $loginButton.disabled = true;
  }
};

$loginForm.onkeyup = ({ target }) => {
  setInputFormData(target);

  $loginButton.disabled = !allValidate();
};

// focus 안받을 때 눈 모양 사라지게 하는거... 시간남으면 하기
$passwordIconButton.onclick = ({ target }) => {
  target.classList.toggle('show');
  $passwordInput.type = target.classList.contains('show') ? 'text' : 'password';
};

$loginButton.onclick = e => {
  e.preventDefault();
  login();
};
