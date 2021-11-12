import axios from 'axios';

const init = async () => {
  try {
    const { data } = await axios.post(`/api/user/signin`, {
      userid: 'jeongmin',
      password: '111111',
    });
    console.log(data);
    const res = await axios.get(`/api/boards/list`, {
      params: {
        currentPageNo: 1,
        recordsPerPage: 8,
      },
    });
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

init();
