import { request } from '../controller/createboard';

const $boardForm = document.querySelector('.createboard-form');

const quill = new Quill('#editor__api', {
  modules: {
    toolbar: [['bold', 'italic'], ['blockquote'], [{ list: 'ordered' }, { list: 'bullet' }]],
  },
  placeholder: '모집 내용을 입력해 주세요.',
  scrollingContainer: '.editor',
  theme: 'snow',
});

$boardForm.onsubmit = e => {
  e.preventDefault();
  request(e.target);
  // request(e.target);
};
