const menuBtn = document.querySelector('.header__menu-button');
const nav = document.querySelector('.header__menu');

menuBtn.addEventListener('click', () => {
    nav.classList.toggle('header__menu_active');

    nav.addEventListener('click', e => {
        const target = e.target;
        if (target === nav) {
            nav.classList.add('header__menu_active');
        } else {
            nav.classList.remove('header__menu_active');
        }
      });
})