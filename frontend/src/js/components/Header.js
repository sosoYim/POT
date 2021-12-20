import setHeader from '../utils/header';

class Header extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = `    
      <header class="header">
        <div class="header__wrapper">
          <h1>
            <a class="header__logo-link" href="/">
              <img class="header__logo" src="/images/logo.png" alt="logo">
            </a>
          </h1>
          <nav class="header__nav">
            <a class="header__nav-link" href="javascript:void(0);"><span class="header__nav-create-pot">POT 생성</span></a>
            <span class="header__nav-link login-info"></span>
          </nav>
        </div>
      </header> `;
  }

  // eslint-disable-next-line class-methods-use-this
  connectedCallback() {
    setHeader();
  }
}

export default function defineMainHeader() {
  customElements.define('main-header', Header);
}
