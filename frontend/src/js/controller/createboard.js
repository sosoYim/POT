import axios from '../utils/axiosConfig';

/**
 * Insert board data
 * @param {form DOM} $boardForm
 */
const createBoard = async ($boardForm, quill) => {
  try {
    // TODO: 로그인한 상태인지 확인 후 아니면 리턴
    const loginUserId = 1;

    const formData = new FormData($boardForm);
    const board = {};
    const position = {};
    formData.append('userId', loginUserId);
    formData.append('content', JSON.stringify(quill.getContents()));
    document.querySelectorAll('input[name="position"]').forEach(checkbox => {
      position[checkbox.value] = checkbox.checked;
    });
    formData.set('position', JSON.stringify(position));

    formData.forEach((val, key) => {
      board[key] = val;
    });

    const { data } = await axios.post('/api/boards', board);

    window.location.href = `/board/${data}`;
  } catch (e) {
    console.error(e);
  }
};

const setCheckboxByType = (gameType, $positionInputs) => {
  const positionType = gameType === '2 POT' ? 'radio' : 'checkbox';
  $positionInputs.forEach($input => {
    $input.type = positionType;
  });
};

// TODO: 유효성 검사, 포커싱 모두 되도록하기
// const validatePosition()

// export { createBoard, isPositionChecked, focusLegend };
export { createBoard, setCheckboxByType };
