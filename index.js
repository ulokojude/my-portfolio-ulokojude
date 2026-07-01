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

const themeToggle = document.getElementById('theme-toggle');
const userTheme = localStorage.getItem('site-theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

const setTheme = (theme) => {
  document.body.classList.toggle('light-theme', theme === 'light');
  document.body.classList.toggle('dark-theme', theme === 'dark');
  localStorage.setItem('site-theme', theme);
  if (themeToggle) {
    themeToggle.setAttribute('aria-label', theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
  }
};

setTheme(userTheme || (systemPrefersDark ? 'dark' : 'light'));

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const nextTheme = document.body.classList.contains('light-theme') ? 'dark' : 'light';
    setTheme(nextTheme);
  });
}

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

revealSections.forEach((section, index) => {
  const delay = Math.min(index * 0.08, 0.3);
  section.style.setProperty('--reveal-delay', `${delay}s`);
});

const mobileObserverOptions = {
  threshold: 0.05,
  rootMargin: '0px 0px -60% 0px',
};

const desktopObserverOptions = {
  threshold: 0.05,
  rootMargin: '0px 0px -30% 0px',
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    entry.target.classList.toggle('reveal-visible', entry.isIntersecting);
  });
}, window.matchMedia('(max-width: 720px)').matches ? mobileObserverOptions : desktopObserverOptions);

revealSections.forEach(section => revealObserver.observe(section));