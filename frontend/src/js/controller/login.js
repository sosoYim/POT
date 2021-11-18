import axios from '../utils/axiosConfig';
import formData from '../store/login';

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
    const { data } = await axios.post('/api/user/login', {
      email: formData.email.value,
      password: formData.password.value,
    });
    if (data) window.location.href = '/';
    return true;
  } catch (err) {
    initializeFormData();
    return false;
  }
};

const launchToast = () => {
  const toastID = document.getElementById('toast');
  toastID.style.setProperty('margin-bottom', '-10px');
  toastID.className = 'show';
  setTimeout(() => {
    toastID.className = toastID.className.replace('show', '');
  }, 4500);
};

export { setInputFormData, allValidate, login, launchToast };
