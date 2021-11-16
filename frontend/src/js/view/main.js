import { formatRegDate } from '../utils/helper';

const $cardWrapper = document.querySelector('.card__wrapper');

const render = boards => {
  $cardWrapper.innerHTML = boards
    .map(
      ({ type, title, position, regDate }) =>
        `<a href="javascript:void(0);" class="card">
          <span class="card__type">${type}</span>
          <h2 class="card__title">${title}</h2>
          <ul class="position">
            <li class="position__item ${position.top ? '' : 'position__item--completed'}">
              <img src="/images/position/top.png" alt="top" class="position__img" />
            </li>
            <li class="position__item ${position.jug ? '' : 'position__item--completed'}">
              <img src="/images/position/jug.png" alt="jungle" class="position__img" />
            </li>
            <li class="position__item ${position.mid ? '' : 'position__item--completed'}">
              <img src="/images/position/mid.png" alt="mid" class="position__img" />
            </li>
            <li class="position__item ${position.adc ? '' : 'position__item--completed'}">
              <img src="/images/position/adc.png" alt="adc" class="position__img" />
            </li>
            <li class="position__item ${position.sup ? '' : 'position__item--completed'}">
              <img src="/images/position/sup.png" alt="support" class="position__img" />
            </li>
          </ul>
          <div class="card__detail">
            <div class="user">
              <img src="./images/emblem/gold.png" alt="티어" class="user__tier" />
              <span class="user__name">|푸른피|</span>
            </div>
            <span class="regDate">${formatRegDate(regDate)}</span>
          </div>
        </a>`
    )
    .join('');
};

export { render };
