# POT

## 🥑 팥(POT)

> 🚩 롤 팀 게임을 하고 싶은 유저들이 포지션별 필터링을 통해 팀원들을 모집할 수 있는 플랫폼

### 팀명 : 나랑겜해조

`이정훈` `손원재` `이정민` `임소형`

발표자: 원재, 정민

## ⭐️ 서비스 출시 배경

- 리그 오브 레전드 게임의 높은 점유율로 인한 사용자 타겟층 확보
- 원하는 포지션으로 팀을 구성하여 게임을 하기 어려운 문제
- 최근 롤드컵의 인기로 인한 5:5 팀게임의 수요의 증가
- 팀 게임을 하고 싶은데 팀원들을 구하기 어려움
- 자신과 맞는 티어의 유저를 쉽게 구할 수 있는 플랫폼의 부재

### 프로젝트 목표

- **로그인 구현 (JWT) 사용**
  - 로그인 시 유저 id를 키로하는 데이터 관리
- **완성도 있는 프로젝트**
  - 사용할 라이브러리, API를 충분히 숙지하고 구현
  - 모듈화를 잘 해보자
  - 깔끔한 반응형
- **애자일 프로젝트**
  - 애자일 방법론의 스크럼을 도입하여 개발
  - 변화에 빠륵 대응항 수 있도록 매일 짧게 진행상황을 공유한다(Daily Scrum 진행)
  - Product backlog를 정하고 Sprint backlog를 정리

## 🛠 주요 기능

- RIOT API

  - GET [/lol/summoner/v4/summoners/by-name/{summonerName}](https://developer.riotgames.com/apis#summoner-v4/GET_getBySummonerName)
  - GET [/lol/league/v4/entries/by-summoner/{encryptedSummonerId}](https://developer.riotgames.com/apis#league-v4/GET_getLeagueEntriesForSummoner)
  - GET [/lol/champion-mastery/v4/champion-masteries/by-summoner/{encryptedSummonerId}](https://developer.riotgames.com/apis#champion-mastery-v4/GET_getAllChampionMasteries)

- JWT

  - [https://jwt.io/](https://jwt.io/)

- 에디터 API (스마트에디터, summernote 등 조사 필요)
  https://github.com/summernote/summernote
- [알림(Notifications) API](https://developer.mozilla.org/ko/docs/Web/API/Notifications_API)
