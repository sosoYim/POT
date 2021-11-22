const formData = {
  summonerName: {
    value: '',
    successMessage: '올바른 소환사 명입니다.',
    warningMessage: '존재하는 소환사 명을 적어주세요',
    regExp: new RegExp(/^..{1,}$/),
    validate: false,
  },
  encryptedId: {
    value: '',
  },
};

export default formData;
