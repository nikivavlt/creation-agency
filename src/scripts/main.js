const isMobile = (window.innerWidth <= 768);

const navigationBar = document.querySelector('.navigation-bar');
const navigationLinks = document.querySelectorAll('.navigation-bar__link');
const hamburgerButton = document.getElementById('hamburger-button');
const backgroundOverlay = document.getElementById('overlay');
const contactButton = document.querySelector('a.button[href="#contact"]');

if (isMobile) {
  hamburgerButton.addEventListener('click', () => {
    hamburgerButton.classList.toggle('toggle');
    navigationBar.classList.toggle('show-bar');
    backgroundOverlay.classList.toggle('show-overlay');
  });

  [...navigationLinks, contactButton]
    .forEach((element) => element.addEventListener('click', () => {
      navigationBar.classList.remove('show-bar');
      hamburgerButton.classList.remove('toggle');
      backgroundOverlay.classList.remove('show-overlay');
    }));
}

function incrementNumber(number, duration) {
  let startValue = 0;
  const maximumValue = Number(number.getAttribute('maximum-value'));

  const counter = setInterval(() => {
    startValue += 1;
    number.innerHTML = startValue;

    if (startValue === maximumValue) {
      clearInterval(counter);
      number.innerHTML = `${maximumValue}+`;
    }
  }, duration);
}

function headerOnScroll() {
  const header = document.querySelector('header');

  if (window.scrollY >= 50 && header.className !== 'on-scroll') header.classList.add('on-scroll');
  else if (window.scrollY < 50 && header.className === 'on-scroll') header.classList.remove('on-scroll');
}

function linksOnScroll() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    const sectionId = current.getAttribute('id');
    const navigationLink = document.querySelector(`.navigation-bar a[href*=${sectionId}]`);

    if (sectionId === 'primary' || sectionId === 'reviews') return;

    if (scrollY > sectionTop
      && scrollY <= sectionTop + sectionHeight) {
      if (!navigationLink.classList.contains('active-link')) {
        navigationLink.classList.add('active-link');
      }
    } else if (navigationLink.classList.contains('active-link')) {
      navigationLink.classList.remove('active-link');
    }
  });
}

function revealContainer() {
  const hiddenContainer = document.querySelector('.about-container');
  const numbers = document.querySelectorAll('.number');

  const windowHeight = window.innerHeight;
  const elementTop = hiddenContainer.getBoundingClientRect().top;
  const elementVisible = 150;

  if (elementTop < windowHeight - elementVisible
    && !hiddenContainer.classList.contains('show-container')) {
    hiddenContainer.classList.add('show-container');

    numbers.forEach((number) => incrementNumber(number, 100));
  }
}

function typingAnimation() {
  const text = document.querySelector('.primary-data__subtitle');

  setTimeout(() => {
    text.textContent = 'experienced developers';
  }, 0);
  setTimeout(() => {
    text.textContent = 'passionate designers';
  }, 4885);
}

window.addEventListener('scroll', () => {
  revealContainer();
  headerOnScroll();
  linksOnScroll();
});

window.addEventListener('load', () => {
  typingAnimation();
  setInterval(typingAnimation, 10000);
});
