const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
document.querySelectorAll('[src*="./images/sbs/"], [href*="./images/sbs/"]').forEach((asset) => {
  const attribute = asset.hasAttribute('src') ? 'src' : 'href';
  asset.setAttribute(attribute, asset.getAttribute(attribute).replace('./images/sbs/', './sbs/'));
});

const atmosphere = document.querySelector('.atmosphere');
if (atmosphere) {
  atmosphere.style.zIndex = '0';
  atmosphere.style.background = 'radial-gradient(circle at 18% 12%, #5b3b1b55, transparent 32%), radial-gradient(circle at 86% 78%, #35542355, transparent 30%), linear-gradient(120deg, #080706, #13100b 48%, #080706)';
}

const closeMenu = () => {
  menu?.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
};

menuButton?.addEventListener('click', () => {
  const isOpen = menu?.classList.toggle('open') ?? false;
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

document.addEventListener('click', (event) => {
  if (menu?.classList.contains('open') && !menu.contains(event.target) && !menuButton?.contains(event.target)) closeMenu();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const id = link.getAttribute('href')?.slice(1);
    const target = id ? document.getElementById(id) : null;
    if (!target) return;
    event.preventDefault();
    closeMenu();
    target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
    history.replaceState(null, '', `#${id}`);
  });
});

const primaryMenu = document.querySelector('.menu');
if (primaryMenu && !primaryMenu.querySelector('[data-discord-link]')) {
  const discordLink = document.createElement('a');
  discordLink.href = 'https://discord.gg/9h4k6H2Wy2';
  discordLink.target = '_blank';
  discordLink.rel = 'noopener';
  discordLink.textContent = 'Join Discord ↗';
  discordLink.dataset.discordLink = 'true';
  primaryMenu.append(discordLink);
}

const societyLabel = document.querySelector('#society .mark span');
if (societyLabel) societyLabel.textContent = 'ABOUT THE SOCIETY';

const sneakPeekLabel = document.querySelector('#reveals .mark span');
if (sneakPeekLabel) sneakPeekLabel.textContent = 'BLOKE SNEAK PEEKS';

const finalCopy = document.querySelector('.final-copy');
if (finalCopy && !finalCopy.querySelector('.button[href*="discord"]')) {
  const discordButton = document.createElement('a');
  discordButton.className = 'button';
  discordButton.href = 'https://discord.gg/9h4k6H2Wy2';
  discordButton.target = '_blank';
  discordButton.rel = 'noopener';
  discordButton.innerHTML = 'Join Discord <b>↗</b>';
  finalCopy.append(discordButton);
}

if (!reducedMotion && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  }), { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((item) => observer.observe(item));
} else document.querySelectorAll('.reveal').forEach((item) => item.classList.add('visible'));

window.addEventListener('load', () => document.body.classList.add('loaded'));
document.querySelector('#year').textContent = new Date().getFullYear();
