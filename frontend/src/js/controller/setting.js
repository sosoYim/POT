import axios from '../utils/axiosConfig';
import formData from '../store/setting';

const summonerNameValid = summoner => formData.summonerName.regExp.test(summoner.value);

const setSummonerValue = summonerName => {
  formData.summonerName.value = summonerName;
};

const checkSummonerNameExists = async $completeButton => {
  const { data } = await axios.post('/api/riot/summoner', {
    summoner: formData.summonerName.value,
  });

  formData.encryptedId.value = data.id;
  formData.summonerName.validate = !!data;
  $completeButton.disabled = !data;
};

const setImgAttribute = $img => {
  $img.src = formData.summonerName.validate ? '../images/success.svg' : '../images/warning.svg';
  $img.alt = formData.summonerName.validate ? '성공' : '경고';
};

const setSpanText = $span => {
  $span.textContent = formData.summonerName.validate
    ? formData.summonerName.successMessage
    : formData.summonerName.warningMessage;
};

const changeName = () => {
  axios.post('/api/user/updateUserSummoner', {
    summoner: formData.summonerName.value,
    encryptedId: formData.encryptedId.value,
  });
};

const launchToast = () => {
  const toastID = document.getElementById('toast');
  toastID.className = 'show';
  setTimeout(() => {
    toastID.className = toastID.className.replace('show', '');
  }, 5000);
};

const initializeFormData = () => {
  formData.summonerName.value = '';
  formData.summonerName.validate = false;
  formData.encryptedId.value = '';
};

export {
  summonerNameValid,
  setSummonerValue,
  checkSummonerNameExists,
  setImgAttribute,
  setSpanText,
  changeName,
  launchToast,
  initializeFormData,
};
