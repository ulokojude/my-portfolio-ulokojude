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
    window.location.href = `https://api.whatsapp.com/send?phone=${whatsApp}&text=${waText}`;
    btn.disabled = false;
    btnText.style.display = 'inline';
    btnLoader.style.display = 'none';
  }, 600);
}

const scrollToggle = document.getElementById('scroll-toggle');

const updateScrollButton = () => {
  if (!scrollToggle) return;
  const halfway = window.innerHeight / 2;
  const pastHalfway = window.pageYOffset > halfway;
  if (pastHalfway) {
    scrollToggle.classList.add('scroll-up');
    scrollToggle.setAttribute('aria-label', 'Scroll to top');
  } else {
    scrollToggle.classList.remove('scroll-up');
    scrollToggle.setAttribute('aria-label', 'Scroll to bottom');
  }
};

if (scrollToggle) {
  scrollToggle.addEventListener('click', () => {
    const halfway = window.innerHeight / 2;
    if (window.scrollY > halfway) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  });
}

window.addEventListener('scroll', updateScrollButton);
window.addEventListener('resize', updateScrollButton);
updateScrollButton();

const navToggle = document.getElementById('nav-toggle');
const nav = document.querySelector('nav');

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const expanded = nav.classList.toggle('nav-expanded');
    navToggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('nav-expanded');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const revealSections = document.querySelectorAll('section');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    entry.target.classList.toggle('reveal-visible', entry.isIntersecting);
  });
}, {
  threshold: 0.05,
  rootMargin: '0px 0px -30% 0px',
});

revealSections.forEach(section => revealObserver.observe(section));