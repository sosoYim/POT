const renderLoginInfo = summoner => {
  document.querySelector('.header__nav-link.login-info').innerHTML = summoner
    ? `
  <a class="header__nav-username" href="/setting">${summoner}</a>
  <a class="header__nav-userinfo" href="javascript:void(0);">
    <box-icon type="solid" name="down-arrow" color="#4c4c4c" size="20px"></box-icon>
  </a>
  <div class="header__nav-setting-list hidden">
    <a href="/board/list/created" class="created-pot">작성한 POT</a>
    <a href="/board/list/applied" class="applied-pot">신청한 POT</a>
    <a href="/setting" class="set-user">설정</a>
    <a href="/logout" class="logout">로그아웃</a>
  </div>
    `
    : '<a class="header__nav-login" href="/login">로그인</a>';
};

export default renderLoginInfo;
