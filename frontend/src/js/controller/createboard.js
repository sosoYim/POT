import axios from 'axios';

/**
 *
 * @param {form DOM} $boardForm
 */
const request = async ($boardForm, quill) => {
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

    // TODO: 읽기 페이지로 전송
    // window.location.href = `/boards/${res}`;
    // await axios.get(`/api/boards?boardId=${res}`);
  } catch (e) {
    console.error(e);
  }
};

export { request };
