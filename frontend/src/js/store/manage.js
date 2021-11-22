const rankNum = {
  CHALLENGERI: 1,
  GRANDMASTERI: 2,
  MASTERI: 3,
  DIAMONDI: 4,
  DIAMONDII: 5,
  DIAMONDIII: 6,
  DIAMONDIV: 7,
  DIAMONDV: 8,
  PLATINUMI: 9,
  PLATINUMII: 10,
  PLATINUMIII: 11,
  PLATINUMIV: 12,
  PLATINUMV: 13,
  GOLDI: 14,
  GOLDII: 15,
  GOLDIII: 16,
  GOLDIV: 17,
  GOLDV: 18,
  SILVERI: 19,
  SILVERII: 20,
  SILVERIII: 21,
  SILVERIV: 22,
  SILVERV: 23,
  BRONZEI: 24,
  BRONZEII: 25,
  BRONZEIII: 26,
  BRONZEIV: 27,
  BRONZEV: 28,
  IRONI: 29,
  IRONII: 30,
  IRONIII: 31,
  IRONIV: 32,
  IRONV: 33,
  UNRANK: 34,
};
const champ = {
  top: '탑',
  mid: '미드',
  jug: '정글',
  adc: '원딜',
  sup: '서폿',
};

const state = {
  boardId: null,
  manageData: { title: '', position: {}, participantList: [] },
};

const getBoardId = () => state.boardId;

const setBoardId = boardId => {
  state.boardId = boardId;
};

const getManageData = () => state.manageData;

const setManageData = manageData => {
  state.manageData = manageData;
};

const setPosition = position => {
  state.manageData.position[position] = false;
};

const getParticipantList = () => state.manageData.participantList;

const setParticipantList = participantList => {
  state.manageData.participantList = participantList;
};

export {
  rankNum,
  champ,
  getBoardId,
  setBoardId,
  getManageData,
  setManageData,
  setPosition,
  getParticipantList,
  setParticipantList,
};
