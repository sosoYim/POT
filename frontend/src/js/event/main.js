import { fetchBoards, changeTypeFilter, changePositionFilter } from '../controller/main';
import defineMainHeader from '../components/Header';

const $potButton = document.querySelector('.pot-button');
const $mainFilterPositionList = document.querySelector('.main__filter-position-list');
const $loading = document.querySelector('.loading');

window.addEventListener('DOMContentLoaded', defineMainHeader);

$potButton.onclick = ({ target }) => {
  if (!target.classList.contains('button') || !target.classList.contains('button-deactive')) return;

  [...$potButton.children].forEach($el => {
    $el.classList.toggle('button-deactive', $el !== target);
  });

  $loading.classList.remove('hidden');

  changeTypeFilter(target.dataset.type);
};

$mainFilterPositionList.onclick = ({ target }) => {
  const $li = target.closest('.main__filter-position-item');

  if (
    !(target.matches('.main__filter-position-item button') || target.matches('.main__filter-position-item img')) ||
    $li.classList.contains('main__filter-position-item--selected')
  )
    return;

  [...$mainFilterPositionList.children].forEach($el => {
    $el.classList.toggle('main__filter-position-item--selected', $el === $li);
  });

  $loading.classList.remove('hidden');

  changePositionFilter($li.dataset.position);
};

const observer = new IntersectionObserver(([{ isIntersecting }]) => {
  if (isIntersecting) fetchBoards();
});
observer.observe($loading);
