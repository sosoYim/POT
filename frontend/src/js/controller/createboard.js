import axios from '../utils/axiosConfig';

/**
 * Insert board data
 * @param {form DOM} $boardForm
 */
const createBoard = async ($boardForm, quill) => {
  try {
    const formData = new FormData($boardForm);
    const board = {};
    const position = {};
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
