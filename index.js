function sendMessage() {
  const whatsapp = document.getElementById('send-whatsapp').value.trim();
  const message = document.getElementById('send-message').value.trim();
  const feedback = document.getElementById('form-feedback');
  const btn = document.querySelector('.send-btn');
  const btnText = document.getElementById('btn-text');
  const btnLoader = document.getElementById('btn-loader');

  feedback.className = 'form-feedback';
  feedback.textContent = '';

  if (!whatsapp) {
    feedback.className = 'form-feedback error';
    feedback.textContent = 'Please enter your WhatsApp number';
    return;
  }

  if(!message) {
    feedback.className = 'form-feedback error';
    feedback.textContent = 'Please write a message';
    return;
  }

  btn.disabled = true;
  btnText.style.display = 'none';
  btnLoader.style.display = 'inline';

  feedback.className = 'form-feedback success';
  feedback.textContent = 'Opening WhatsApp...';

  // Opening whatsApp
  const whatsApp = '2348161122861';
  const waText = encodeURIComponent(
    `Hi Jude, I\'m reaching out via your portfolio.\n\nMy WhatsApp: ${whatsApp}\n\nMessage: ${message}`
  );
  setTimeout(() => {
    window.location.href = `whatsapp://send?phone=${whatsApp}&text=${waText}`;
    btn.disabled = false;
    btnText.style.display = 'inline';
    btnLoader.style.display = 'none';
  }, 600);
}