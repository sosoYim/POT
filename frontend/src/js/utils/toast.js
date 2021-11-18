const launchToast = ({ sendMail, content }) => {
  const $toastID = document.getElementById('toast');
  const $toastImg = document.getElementById('img');
  const $toastDescription = document.getElementById('desc');

  $toastImg.classList.toggle('warn', !sendMail);

  $toastDescription.textContent = content || $toastDescription.textContent;
  $toastID.className = 'show';
  setTimeout(() => {
    $toastID.className = $toastID.className.replace('show', '');
  }, 5000);
};

export default launchToast;
