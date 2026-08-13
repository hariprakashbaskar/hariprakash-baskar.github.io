const root = document.documentElement;
const body = document.body;
const themeToggle = document.getElementById('themeToggle');
const backTop = document.getElementById('backTop');
const nav = document.querySelector('.glass-nav');

const savedTheme = localStorage.getItem('hb-theme');
if (savedTheme === 'light') {
  body.classList.add('light');
  themeToggle.innerHTML = '<i class="bi bi-sun"></i>';
}

themeToggle.addEventListener('click', () => {
  body.classList.toggle('light');
  const light = body.classList.contains('light');
  localStorage.setItem('hb-theme', light ? 'light' : 'dark');
  themeToggle.innerHTML = light ? '<i class="bi bi-sun"></i>' : '<i class="bi bi-moon-stars"></i>';
});

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
  backTop.classList.toggle('show', window.scrollY > 500);
});

backTop.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {threshold:.12});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

document.addEventListener('mousemove', (e) => {
  const glow = document.querySelector('.cursor-glow');
  glow.style.left = `${e.clientX}px`;
  glow.style.top = `${e.clientY}px`;
});

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', () => {
    const navCollapse = document.getElementById('mainNav');
    if (navCollapse.classList.contains('show')) {
      bootstrap.Collapse.getOrCreateInstance(navCollapse).hide();
    }
  });
});
