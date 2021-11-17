import { createBoard } from '../controller/createboard';

// TODO: 유효성 체크 메서드 후에 분리하기=====================================

const isPositionChecked = $boardForm => {
  console.log($boardForm.type.checked);
  [...$boardForm.position].some(position => position.checked);
};

const isValidCreation = $boardForm => {
  isPositionChecked($boardForm);
};

const focusLegend = $legend => {
  // TODO: 라벨, 라디오 탭 포코스시 보더 만들기
  // $label.focus();
  $legend.style.color = '#b037c5';
  // 에러 메세지 삽입
};

const quill = new Quill('#editor__api', {
  modules: {
    toolbar: [['bold', 'italic'], ['blockquote'], [{ list: 'ordered' }, { list: 'bullet' }]],
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
