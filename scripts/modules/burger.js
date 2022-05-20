const menuBtn = document.querySelector('.header__menu-button');
const nav = document.querySelector('.header__menu');

document.addEventListener('click', (e) => {
    const target = e.target;

    if (target === menuBtn) {
        nav.classList.toggle('header__menu_active');
    } else if (target.closest('.header__menu')) {
        if (target.closest('.header__link')) nav.classList.remove('header__menu_active');
    } else {
        nav.classList.remove('header__menu_active');
    }
});

