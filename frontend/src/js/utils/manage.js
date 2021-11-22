import { rankNum } from '../store/manage';

const changePositionAbleState = ($mainFilterPositionButtons, manageData) => {
  $mainFilterPositionButtons.forEach(positionButton => {
    const { position } = positionButton.dataset;

    if (!(manageData.position[position] === undefined))
      positionButton.toggleAttribute('disabled', !manageData.position[position]);
  });
};
const filterParticipantList = (participantList, filter, targetPosition = 'all') =>
  participantList
    ? participantList
        .filter(({ position }) => targetPosition === 'all' || targetPosition === position)
        .sort((a, b) => {
          const newA = filter === 'rank' ? rankNum[a.tier + a[filter]] : a[filter];
          const newB = filter === 'rank' ? rankNum[b.tier + b[filter]] : b[filter];
          return newA > newB ? 1 : newA < newB ? -1 : 0;
        })
    : [];

export { changePositionAbleState, filterParticipantList };
