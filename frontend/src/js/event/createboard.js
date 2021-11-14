import { createBoard, isPositionChecked, focusLegend } from '../controller/createboard';

const quill = new Quill('#editor__api', {
  modules: {
    toolbar: [['bold', 'italic', 'size'], ['blockquote'], [{ list: 'ordered' }, { list: 'bullet' }]],
  },
  placeholder: '모집 내용을 입력해 주세요.',
  scrollingContainer: '.editor',
  theme: 'snow',
});

document.querySelector('.createboard-form').onsubmit = e => {
  e.preventDefault();
  isPositionChecked(e.target)
    ? createBoard(e.target, quill)
    : focusLegend(document.querySelector('.form-checkbox legend'));
};
