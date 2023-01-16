// Header during scroll
function headerOnScroll() {
  const nav = document.querySelector('header');
  if (this.scrollY >= 80) nav.classList.add('on-scroll');
  else nav.classList.remove('on-scroll');
}

window.addEventListener('scroll', headerOnScroll);

// Text typing animation
const text = document.querySelector('.second-text');

const textLoad = () => {
  setTimeout(() => {
    text.textContent = 'experienced developers';
  }, 0);
  setTimeout(() => {
    text.textContent = 'creative designers';
  }, 5000);
  setTimeout(() => {
    text.textContent = 'purposeful marketers';
  }, 10000);
};

textLoad();
setInterval(textLoad, 15000);

// Number counting animation
let completed = false;

const animatedNumbers = () => {
  const numbers = document.querySelectorAll('.number');
  const speed = 300;
  completed = true;

  numbers.forEach((number) => {
    const selectedNumber = number;

    const animate = () => {
      const value = +selectedNumber.getAttribute('akhi');
      const data = +selectedNumber.innerText;
      const time = value / speed;
      if (data < value) {
        selectedNumber.innerText = Math.ceil(data + time);
        setTimeout(animate, 100);
      } else {
        selectedNumber.innerText = `${value}+`;
      }
    };

    animate();
  });
};

// Section links during page scroll
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    const sectionId = current.getAttribute('id');

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelector(`.navigation-menu a[href*=${sectionId}]`).classList.add('active-link');
      if (document.querySelector('.navigation-menu a[href*=about]') && completed === false) animatedNumbers();
    } else {
      document.querySelector(`.navigation-menu a[href*=${sectionId}]`).classList.remove('active-link');
    }
  });
}

window.addEventListener('scroll', scrollActive);

// Navigation menu for mobile devices
const navMenu = document.querySelector('.navigation-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.add('show-menu');
  });
}

if (navClose) {
  navClose.addEventListener('click', () => {
    navMenu.classList.remove('show-menu');
  });
}

const navLink = document.querySelectorAll('.navigation-menu__link');

function linkAction() {
  navMenu.classList.remove('show-menu');
}
navLink.forEach((n) => n.addEventListener('click', linkAction));

// Modal window
const modalViews = document.querySelectorAll('.services-modal');
const modalBtns = document.querySelectorAll('.services-button');
const modalCloses = document.querySelectorAll('.services-modal-close');

const modal = (modalClick) => {
  modalViews[modalClick].classList.add('active-modal');
};

modalBtns.forEach((modalBtn, i) => {
  modalBtn.addEventListener('click', () => {
    modal(i);
  });
});

modalCloses.forEach((modalClose) => {
  modalClose.addEventListener('click', () => {
    modalViews.forEach((modalView) => {
      modalView.classList.remove('active-modal');
    });
  });
});

// Reveal animation
function reveal() {
  const reveals = document.querySelectorAll('.reveal');

  for (let i = 0; i < reveals.length; i += 1) {
    const windowHeight = window.innerHeight;
    const elementTop = reveals[i].getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add('active');
    } else {
      reveals[i].classList.remove('active');
    }
  }
}
window.addEventListener('scroll', reveal);
