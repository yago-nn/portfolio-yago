const navLinks = document.querySelectorAll('.nav ul li a');
const underline = document.querySelector('.nav-underline');
const sections = document.querySelectorAll('section[id]');
const btnTopo = document.getElementById('btn-topo');

function moveUnderline() {
  requestAnimationFrame(() => {
    const activeLink = document.querySelector('.nav ul li a.active');
    if (activeLink && underline) {
      const rect = activeLink.getBoundingClientRect();
      const parentRect = activeLink.closest('.nav-menu').getBoundingClientRect();
      underline.style.width = rect.width + 'px';
      underline.style.left = (rect.left - parentRect.left) + 'px';
    }
  });
}

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').includes(current)) {
      link.classList.add('active');
    }
  });

  moveUnderline();

  if (window.scrollY > 300) {
    btnTopo.classList.add('show');
  } else {
    btnTopo.classList.remove('show');
  }
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    moveUnderline();
  });
});

window.addEventListener('DOMContentLoaded', () => {
  setTimeout(moveUnderline, 50);
});
window.addEventListener('load', moveUnderline);

btnTopo.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
