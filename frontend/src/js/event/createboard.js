import { createBoard, setCheckboxByType } from '../controller/createboard';

// TODO: 유효성 체크 메서드 후에 분리하기=====================================
// checkValidation : 유효성 체크 -> 에러 위치 반환 -> 에러 메세지
const isPositionChecked = $boardForm => [...$boardForm.position].some(position => position.checked);

const focusLegend = $legend => {
  // $label.focus();
  $legend.style.color = '#b037c5';
  // 에러 메세지 삽입
};

// const checkValidation = $boardForm => {};
// ====================================================================

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

document.querySelector('.form-radio-type').onchange = e => {
  const type = e.target.value;
  const $positionInputs = document.querySelectorAll('input[name="position"]');
  setCheckboxByType(type, $positionInputs);
};
