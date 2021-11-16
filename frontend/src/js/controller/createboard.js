import axios from '../utils/axiosConfig';

/**
 * Insert board data
 * @param {form DOM} $boardForm
 */
const createBoard = async ($boardForm, quill) => {
  try {
    // TODO: 로그인한 상태인지 확인 후 아니면 리턴
    // TODO: 로그인 id 받기
    const loginUserId = 1;

    const formData = new FormData($boardForm);
    const board = {};
    const position = {};
    formData.append('userId', loginUserId);
    // formData.append('content', quill.getText());
    // formData.append('content', JSON.stringify(quill.getContents()));
    formData.append('content', JSON.stringify(quill.getContents()));
    document.querySelectorAll('input[name="position"]').forEach(checkbox => {
      position[checkbox.value] = checkbox.checked;
    });
    formData.set('position', JSON.stringify(position));

    formData.forEach((val, key) => {
      board[key] = val;
    });

    const { data } = await axios.post('/api/boards', board);
    sessionStorage.setItem('boardId', data);

    window.location.href = '/detailboard.html';
  } catch (e) {
    console.error(e);
  }
};

/**
 * Is there at least one position checked
 * @param {boolean} $boardForm
 */
const isPositionChecked = $boardForm => [...$boardForm.position].some(position => position.checked);

const focusLegend = $legend => {
  // TODO: 라벨, 라디오 탭 포코스시 보더 만들기
  // $label.focus();
  $legend.style.color = '#b037c5';
  // 에러 메세지 삽입
};

// TODO: 유효성 검사, 포커싱 모두 되도록하기
// const validatePosition()

export { createBoard, isPositionChecked, focusLegend };
