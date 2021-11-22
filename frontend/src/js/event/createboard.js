import { createBoard, setCheckboxByType, isPositionChecked, focusLegend } from '../controller/createboard';
import setHeader from '../utils/header';

const quill = new Quill('#editor__api', {
  modules: {
    toolbar: [
      ['bold', 'italic'],
      ['blockquote'],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
    ],
  },
  placeholder: '모집 내용을 입력해 주세요.',
  scrollingContainer: '.editor',
  theme: 'snow',
});

window.addEventListener('DOMContentLoaded', setHeader);

document.querySelector('.createboard-form').onsubmit = e => {
  e.preventDefault();
  createBoard(e.target, quill);
  // isPositionChecked(e.target)
  //   ? createBoard(e.target, quill)
  //   : focusLegend(document.querySelector('.form-checkbox legend'));
};

document.querySelector('.form-radio-type').onchange = e => {
  const type = e.target.value;
  const $positionInputs = document.querySelectorAll('input[name="position"]');
  setCheckboxByType(type, $positionInputs);
};

document.querySelector('.form-checkbox').onchange = () => {
  const $createButton = document.querySelector('.create-button');

  isPositionChecked(document.querySelector('.createboard-form'))
    ? $createButton.removeAttribute('disabled')
    : $createButton.setAttribute('disabled', true);
};
