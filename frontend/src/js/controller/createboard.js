import axios from 'axios';

/**
 *
 * @param {form DOM} $boardForm
 */
const request = async $boardForm => {
  try {
    const formData = new FormData($boardForm);
    // TODO: id 받아오기
    formData.append('userId', 'jeongmin');
    // TODO: api로 받기
    formData.append('content', 'api 로 보내야 함');
    formData.append('regDate', new Date());

    const board = {};
    formData.forEach((val, key) => {
      board[key] = key === 'position' ? (board[key] = [...(board[key] || []), val]) : (board[key] = val);
    });

    const { data: res } = await axios.post('/api/boards', board);
    console.log('res', res);
  } catch (e) {
    console.error(e);
  }
};

export { request };
