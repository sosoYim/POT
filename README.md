# 🥑 팥(POT)

> 🚩 롤 팀 게임을 하고 싶은 유저들이 포지션별 필터링을 통해 팀원들을 모집할 수 있는 플랫폼

<br>

## ⭐️ 서비스 출시 배경

- 리그 오브 레전드 게임의 높은 점유율로 인한 사용자 타겟층 확보
- 원하는 포지션으로 팀을 구성하여 게임을 하기 어려운 문제
- 최근 롤드컵의 인기로 인한 5:5 팀게임의 수요의 증가
- 팀 게임을 하고 싶은데 팀원들을 구하기 어려움
- 자신과 맞는 티어의 유저를 쉽게 구할 수 있는 플랫폼의 부재

<br>

## 🗓 프로젝트 기간
2021.10.19 ~ 2021.10.21

<br>

## 😎 팀명 : 나랑겜해조

`이정훈` `손원재` `이정민` `임소형`
|이름|설명|회고링크|
|------|---|---|
|이정민|로그인, 회원가입, 설정 페이지|[회고링크](https://velog.io/@hustle-dev/%EB%AF%B8%EB%8B%88%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-POT)|
|이정훈|메인페이지, 작성한 게시글 목록 페이지, 신청한 게시글 목록 페이지|[회고링크](https://github.com/jhyj0521/POT)|
|손원재|신청자 관리 페이지, 신청 수락시 메일링, 공통 헤더|[회고링크](https://velog.io/@sonwj0915/POT-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8)|
|임소형|글 작성 페이지, 글 상세 페이지|[회고링크](#)|

<br>

## 📚 기술 스택
- HTML
- Sass
- Javascript
- Node.js
- Express

<br>

## ✨ 주요 기능

### 1. 로그인
<img src="https://user-images.githubusercontent.com/53992007/142788934-88b05a78-6e84-4b4d-96a4-bad075e6a407.gif" width="600">

### 2. 메인(무한 스크롤)
<img src="https://images.velog.io/images/hustle-dev/post/86c6013e-402c-4098-abfa-afd50b5e1829/%E1%84%86%E1%85%AE%E1%84%92%E1%85%A1%E1%86%AB%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%A9%E1%86%AF.gif" width="600">

### 3. 글 작성(Quill 에디터)
<img src="https://user-images.githubusercontent.com/53992007/142788033-8d5e93eb-5cce-44bd-af92-ef1bc3cd9ce3.gif" width="600">

### 4. 신청자 관리
<img src="https://user-images.githubusercontent.com/53992007/142788282-1501a8e8-f00e-4f0d-9567-e88cae243289.gif" width="600">


### 5. 승인시 메일 전송
<img src="https://images.velog.io/images/hustle-dev/post/ea4a3d46-7a55-417f-94ff-aeafe18b4947/%E1%84%86%E1%85%A6%E1%84%8B%E1%85%B5%E1%86%AF%E1%84%85%E1%85%B5%E1%86%BC2.gif" width="600">

<br>

## 🛠 주요 API
- RIOT API
  - GET [/lol/summoner/v4/summoners/by-name/{summonerName}](https://developer.riotgames.com/apis#summoner-v4/GET_getBySummonerName)
  - GET [/lol/league/v4/entries/by-summoner/{encryptedSummonerId}](https://developer.riotgames.com/apis#league-v4/GET_getLeagueEntriesForSummoner)
  - GET [/lol/champion-mastery/v4/champion-masteries/by-summoner/{encryptedSummonerId}](https://developer.riotgames.com/apis#champion-mastery-v4/GET_getAllChampionMasteries)

- [JWT](https://jwt.io/) 
- [Quill](https://quilljs.com/) : 에디터 API
- [Nodemailer](https://nodemailer.com/about/) : 메일 전송 API
- [Intersection_Observer_API](https://developer.mozilla.org/ko/docs/Web/API/Intersection_Observer_API)
