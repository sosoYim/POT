import { setInputFormData, allValidate, login, launchToast } from '../controller/login';

const $loginForm = document.querySelector('.login-form');
const $loginFormErrorMessage = document.querySelector('.login-form__error-message');
const [$emailInput, $passwordInput] = document.querySelectorAll('.login-form__input');
const $passwordIconButton = document.querySelector('.login-form__password-icon');
const $loginButton = document.querySelector('.login-form__button');

$loginForm.onkeyup = ({ target }) => {
  setInputFormData(target);

  $loginButton.disabled = !allValidate();
};

// focus 안받을 때 눈 모양 사라지게 하는거... 시간남으면 하기
$passwordIconButton.onclick = ({ target }) => {
  target.classList.toggle('show');
  $passwordInput.type = target.classList.contains('show') ? 'text' : 'password';
};

$loginButton.onclick = async e => {
  e.preventDefault();

  const result = await login();

  if (!result) {
    launchToast();
    $loginFormErrorMessage.textContent = '계정이름과 비밀번호가 일치하지 않습니다.';
    $emailInput.focus();
    $emailInput.value = '';
    $passwordInput.value = '';
    $loginButton.disabled = true;
  }
};
