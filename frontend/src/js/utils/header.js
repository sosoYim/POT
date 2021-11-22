import axios from './axiosConfig';
import renderLoginInfo from '../view/header';

const guideLogin = () => {
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
    document.body.removeChild($guideLoginmodalOuter);
  };
  $guideLoginmodalOuter.querySelector('.modal__close').onclick = () => {
    document.body.removeChild($guideLoginmodalOuter);
  };
};

const setHeader = async () => {
  const {
    data: { summoner },
  } = await axios.get(`/api/validate`);

  renderLoginInfo(summoner);

  if (summoner) {
    document.querySelector('.header__nav-userinfo').onclick = () => {
      document.querySelector('.header__nav-setting-list').classList.toggle('hidden');
    };
  }

  document.querySelector('.header__nav-link').onclick = () => {
    summoner ? (window.location.href = '/board/write') : guideLogin();
  };
};

export default setHeader;
