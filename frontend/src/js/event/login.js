import axios from '../utils/axiosConfig';

const [$emailInput, $passwordInput] = document.querySelectorAll('.login-form__input');

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

const setEmailFormData = input => {
  formData.email.value = input.value;
  formData.email.validate = true;
};

const setPasswordFormData = input => {
  formData.password.value = input.value;
  formData.password.validate = true;
};

const initializeValue = input => {
  formData[input.name].value = '';
  formData[input.name].validate = false;
};

$emailInput.onkeyup = ({ target }) => {
  setEmailFormData(target);

  if (target.value.trim() === '') {
    initializeValue(target);
  }
};

$passwordInput.onkeyup = ({ target }) => {
  setPasswordFormData(target);

  target.nextElementSibling.nextElementSibling.classList.remove('hidden');

  if (target.value.trim() === '') {
    initializeValue(target);
  }
};
