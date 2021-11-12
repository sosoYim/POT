import axios from 'axios';

const init = async () => {
  try {
    const { data } = await axios.post(`/api/user/signin`, {
      userid: 'jeongmin',
      password: '111111',
    });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

init();
