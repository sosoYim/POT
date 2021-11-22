import axios from './axiosConfig';
import renderLoginInfo from '../view/header';
import { createRequest } from '../controller/detailboard';

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

const requestModal = () => {
  const $requestModalOuter = document.createElement('div');
  $requestModalOuter.className = 'modal-outer request-modal';
  $requestModalOuter.innerHTML = `
  <div class="modal">
    <button class="modal__close">
      <box-icon name='x' color="#4c4c4c"></box-icon>
    </button>
    <div class="modal__title">신청되었습니다..</div>
    <button class="request-modal__button button">신청목록 이동</button>
  </div>`;
  document.body.appendChild($requestModalOuter);

  $requestModalOuter.querySelector('.request-modal__button').onclick = () => {
    // 추후 경로 수정
    window.location.href = '/board/list/applied';
  };
  $requestModalOuter.onclick = e => {
    if (e.target !== e.currentTarget) return;
    document.body.removeChild($requestModalOuter);
  };
  $requestModalOuter.querySelector('.modal__close').onclick = () => {
    document.body.removeChild($requestModalOuter);
  };
};

const setHeaderRequest = async () => {
  try {
    const {
      data: { summoner },
    } = await axios.get(`/api/validate`);

    renderLoginInfo(summoner);

    if (summoner) {
      createRequest();
      requestModal();
    } else {
      guideLogin();
    }
  } catch (error) {
    console.log(error);
  }
};

export default setHeaderRequest;
