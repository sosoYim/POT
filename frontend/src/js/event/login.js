import axios from '../utils/axiosConfig';

const $registerLink = document.querySelector('.login-form__goto-signup');

$registerLink.onclick = () => {
  window.location = 'http://localhost:3000/register';
};
