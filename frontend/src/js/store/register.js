/**
 * @description State for storing form data.
 * @type {object} formData
 */
const formData = {
  userId: {
    value: '',
    successMessage: '중복확인 버튼을 눌러주세요.',
    warningMessage: '이메일 형식에 맞게 입력해주세요',
    duplicationMessage: '이메일이 이미 존재합니다.',
    regExp: new RegExp(/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/),
    validate: false,
  },
  summonerName: {
    value: '',
    successMessage: '소환사명 확인버튼을 눌러주세요.',
    warningMessage: '존재하는 소환사 명을 적어주세요',
    regExp: new RegExp(/^..{1,}$/),
    validate: false,
    encryptedId: '',
  },
  password: {
    value: '',
    successMessage: '올바른 비밀번호 입니다.',
    warningMessage: '8자리 이상의 영문, 숫자조합을 입력하세요.',
    regExp: new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/),
    validate: false,
  },
  confirmPassword: {
    value: '',
    successMessage: '비밀번호가 일치합니다.',
    warningMessage: '비밀번호가 일치하지 않습니다.',
    validate: false,
  },
};

export default formData;
