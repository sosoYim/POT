const renderParticipantList = ($participantList, manageData) => {
  console.log(manageData);
  $participantList.innerHTML = manageData.participantList
    .map(({ userId, tier, rank, summoner, mainChamp, position, completed }) =>
      completed
        ? ''
        : `
    <li class="participant" data-summoner="${summoner}" data-user-id="${userId}">
    <img src="/images/position/${position}.png" alt="" class="participant__position">
    <div class="participant__main-wrapper">
      <img class="participant-tier" src="/images/emblem/${tier}.png" alt="${tier}">
      <div class="participant__check-wrapper">
        <button class="participant__check approve" data-approve=true>
          <box-icon name="check" color="#9182f6"></box-icon>
        </button>
        <button class="participant__check" data-approve=false>
          <box-icon name="x" color="#ff3838"></box-icon>
        </button>
      </div>
    </div>
    <div class="participant__info">
      <ul class="participant__info-list">
        <li class="participant__info-summoner-name">
          <span class="participant__info-title">소환사 명</span>
          <span class="participant__info-description">${summoner}</span>
        </li>
        <li class="participant__info-summoner-tier">
          <span class="participant__info-title">티어</span>
          <span class="participant__info-description" title="${tier} ${rank}">${tier} ${rank}</span>
        </li>
        <li class="participant__info-summoner-main-champ">
          <span class="participant__info-title">주요챔프</span>
          <ul class="participant__info-summoner-champ-list">
          ${mainChamp
            .map(champ =>
              champ
                ? `
            <li class="participant__info-summoner-champ">
              <img src="https://ddragon.leagueoflegends.com/cdn/10.6.1/img/champion/${champ}.png" alt="${champ}">
            </li>
          `
                : ''
            )
            .join('')}
          </ul>
        </li>
      </ul>
    </div>
    </button>
  </li>
  `
    )
    .join('');
};

export default renderParticipantList;
