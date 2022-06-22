const menuBtn = document.querySelector('.header__menu-button');
const nav = document.querySelector('.header__menu');

const duration = 2000;
const distance = 90;
let requestId = NaN;

const startAnimation = (duration, callback) => {
    let startAnimation = NaN;
  
    requestAnimationFrame(function step(timeStamp) {
      startAnimation ||= timeStamp;
  
      const progress = (timeStamp - startAnimation) / duration;
  
      callback(progress);
      if (progress < 1) {
        requestId = requestAnimationFrame(step);
      }
    });
  };

  const easeInOut = time => 0.5 * (1 - Math.cos(Math.PI * time));

document.addEventListener('click', (e) => {
    const target = e.target;

    if (target === menuBtn) {
        nav.classList.toggle('header__menu_active');
    } else if (target.closest('.header__menu')) {
        if (target.closest('.header__link')) nav.classList.remove('header__menu_active');
    } else {
        nav.classList.remove('header__menu_active');
    }

    startAnimation(duration, (progress) => {
        const left = easeInOut(progress) * distance;
        nav.style.transform = `translateY(${-left}px)`;
      });

    

});

