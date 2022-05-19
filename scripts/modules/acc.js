const travelItems = document.querySelectorAll('.travel__item');
const btns = document.querySelectorAll('.travel__item-title');
const textWrapper = document.querySelectorAll('.travel__item-text-wrapper');

let heightWrapper = 0;
textWrapper.forEach(element => {
    if (heightWrapper < element.scrollHeight) {
        heightWrapper = element.scrollHeight;
    }
});

btns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        for (let i = 0; i < travelItems.length; i++) {
            if (index === i){
                textWrapper[i].style.height = 
                travelItems[i].classList.contains('travel__item_active') ? '' : `${heightWrapper}px`;
                travelItems[i].classList.toggle('travel__item_active');
            } else {
                travelItems[i].classList.remove('travel__item_active');
                textWrapper[i].style.height = '';
            }
        }
    })
});