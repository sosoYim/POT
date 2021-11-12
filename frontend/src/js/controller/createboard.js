import axios from 'axios';

const request = async $boardForm => {
  try {
    const formData = new FormData($boardForm);
    formData.append('boardId', 1000);
    formData.append('userId', 'jeongmin');
    formData.append('content', 'api 로 보내야 함');
    formData.append('regDate', new Date());

    const board = {};
    formData.forEach((val, key) => {
      if (key === 'position') {
        board[key] = [...(board[key] || []), val];
        // board[key] = board.hasOwnProperty('position') ? [...board[key], val] : [val];
      } else {
        board[key] = val;
      }
    });
    // console.log(board);

    const { data: res } = await axios.post('/api/boards', board);
    console.log('res', res);
    // const delta = quill.getContents();
    // console.log(delta);

    // const { data: res } = await axios.post('/board', formData, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //   },
    // });
    // console.log('position', e.target.position.value);
    // const { data: res } = await axios.post('/api/boards', {
    //   boardId: '1000',
    //   userId: 'jeongmin', // User 받아오기
    //   type: e.target.type.value,
    //   title: e.target.title.value,
    //   content: 'need to get from api', // api에서 받아오기
    //   position: e.target.position.value,
    //   regDate: new Date(),
    // });

    // console.log(res.body.boardId);
    // window.location.href = '/board:id'; // boardId 읽기로 전환

    // const { data: res } = await axios.get('/api/boards');
  } catch (e) {
    console.error(e);
  }
};

export { request };
