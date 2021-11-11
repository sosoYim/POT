let users = [
  {
    userid: 'jeongmin',
    password: '111111',
    summoner: 'l푸른피l',
    imageUrl: './images/defaultUser.png',
    encryptedId: 'WGsLd_yKgzkPcTnp3XC2HbJ_6Z0-o6jrd7Be15vDN4Ct6kw',
  },
  {
    userid: 'wonjae',
    password: '123456',
    summoner: '파기로',
    imageUrl: './images/defaultUser.png',
    encryptedId: 'lZzLQ5FxuQuciOUasTzMSGJRu7she-Y129X8EHdd3QIp4hE',
  },
  {
    userid: 'chaeyoung',
    password: '123456',
    summoner: '바케모노채영',
    imageUrl: './images/defaultUser.png',
    encryptedId: 'f5_gAvyoh-x35TeclWkFXJP5C9XKJW5JcBQIHg4avMsSEA',
  },
];

const findUserByUserid = userid => users.find(user => user.userid === userid);

const findUser = (userid, password) =>
  // users.find(user => user.userid === userid && bcrypt.compareSync(password, user.password));
  users.find(user => user.userid === userid && user.password === password);

const createUser = (userid, password) => {
  // users = [...users, { userid, password: bcrypt.hashSync(password, 10) }];
  users = [...users, { userid, password }];
};

const getUsers = () => users;

module.exports = { createUser, findUserByUserid, findUser, getUsers };