// emailjs config
const EMAILJS_PUBLIC_KEY = "6-paw_rXiBfa7zGtm";
const EMAILJS_SERVICE_ID = "service_v3u9s3t";
const EMAILJS_TEMPPLATE_ID = "template_1xvmidc";

emailjs.init(EMAILJS_PUBLIC_KEY);

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
  
  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPPLATE_ID, {
    from_whatsapp: whatsapp,
    message: message,
  }).then(() => {
    feedback.className = 'form-feedback success';
    feedback.textContent = 'Message sent! I\'ll reach out soon.';
    document.getElementById('send-whatsapp').value = '';
    document.getElementById('send-message').value = '';
  }).catch((err) => {
    console.err('EmailJS error:', err);
    feedback.textContent = 'Something went wrong. Please try again.';
  }).finally(() => {
    btn.disabled = false;
    btnText.style.display = 'inline';
    btnLoader.style.display = 'none';
  });
}