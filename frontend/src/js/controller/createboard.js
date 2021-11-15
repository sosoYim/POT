import axios from 'axios';

/**
 * Insert board data
 * @param {form DOM} $boardForm
 */
const createBoard = async ($boardForm, quill) => {
  try {
    const formData = new FormData($boardForm);
    // TODO: id 받아오기
    formData.append('userId', 1);

    formData.append('content', quill.getText());
    formData.append('regDate', new Date());

    const board = {};
    formData.forEach((val, key) => {
      board[key] = key === 'position' ? (board[key] = [...(board[key] || []), val]) : (board[key] = val);
    });

    const { data: res } = await axios.post('/api/boards', board);
    console.log('컨트롤러 : ', res);

    // TODO: 읽기 페이지로 전송 : routes/boards.js에서 리다이렉션 하는 중
    // window.location.href = `/boards/${res}`; // 안됨
    // await axios.get(`/api/boards?boardId=${res}`); // 안됨
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
