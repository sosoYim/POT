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

// export { createBoard, isPositionChecked, focusLegend };
export { createBoard, setCheckboxByType, isPositionChecked, focusLegend };
