const isMobile = (window.innerWidth <= 768);
const navigationBar = document.querySelector('.navigation-bar');
const navigationLinks = document.querySelectorAll('.navigation-bar__link');
const contactButton = document.querySelector('.navigation-bar__contact-button > a.button[href="#contact"]');
const hamburgerButton = document.getElementById('hamburger-button');
const backgroundOverlay = document.getElementById('overlay');

const openMobileMenu = () => {
  hamburgerButton.classList.add('toggle');
  navigationBar.classList.add('show-bar');
  backgroundOverlay.classList.add('show-overlay');
};

const closeMobileMenu = () => {
  hamburgerButton.classList.remove('toggle');
  navigationBar.classList.remove('show-bar');
  backgroundOverlay.classList.remove('show-overlay');
};

if (isMobile) {
  hamburgerButton.addEventListener('click', () => {
    if (hamburgerButton.classList.contains('toggle')) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  [...navigationLinks, contactButton]
    .forEach((element) => element.addEventListener('click', () => {
      closeMobileMenu();
    }));
}

const incrementNumber = (number, duration) => {
  const currentNumber = number;
  const maximumValue = Number(currentNumber.getAttribute('maximum-value'));
  let startValue = 0;

  const counter = setInterval(() => {
    startValue += 1;
    currentNumber.innerHTML = startValue;

    if (startValue === maximumValue) {
      clearInterval(counter);
      currentNumber.innerHTML = `${maximumValue}+`;
    }
  }, duration);
};

const changeHeaderOnScroll = () => {
  const header = document.querySelector('header');

  if (window.scrollY >= 50 && header.className !== 'on-scroll') header.classList.add('on-scroll');
  else if (window.scrollY < 50 && header.className === 'on-scroll') header.classList.remove('on-scroll');
};

const highlightLinksOnScroll = () => {
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
};

const revealContainer = () => {
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
};

const typeText = () => {
  const text = document.querySelector('.primary-data__subtitle');
  const firstText = 'experienced developers';
  const secondText = 'passionate designers';

  setTimeout(() => {
    text.textContent = firstText;
  }, 0);
  setTimeout(() => {
    text.textContent = secondText;
  }, 4885);
};

window.addEventListener('scroll', () => {
  revealContainer();
  changeHeaderOnScroll();
  highlightLinksOnScroll();
});

window.addEventListener('load', () => {
  typeText();
  setInterval(typeText, 10000);
});
