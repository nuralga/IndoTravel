import loadStyle from './loadStyle.js';

const showModal = async (err, data) => {
    console.log(data);
    await loadStyle('css/modal.css');
    const overlay = document.createElement('div');
    const modalWindow = document.createElement('div');
    const title = document.createElement('h2');
    const peopleCount = document.createElement('p');
    const dates = document.createElement('p');
    const price = document.createElement('p');
    const btnWrapper = document.createElement('div');
    const confirm = document.createElement('button');
    const editData = document.createElement('button');

    overlay.classList.add('overlay', 'overlay_confirm');
    modalWindow.classList.add('modal');
    title.classList.add('modal__title');
    title.textContent = data.title;
    peopleCount.classList.add('modal__text');
    peopleCount.textContent = `Бронирование путешествия в Индию на ${data.peopleCount} человек`;
    dates.classList.add('modal__text');
    dates.textContent = `В даты: ${data.dates}`;
    price.classList.add('modal__text');
    price.textContent = `Стоимость тура ${data.price}`;

    btnWrapper.classList.add('modal__button');
    confirm.classList.add('modal__btn', 'modal__btn_confirm');
    confirm.textContent = 'Подтверждаю';
    editData.classList.add('modal__btn', 'modal__btn_edit');
    editData.textContent = 'Изменить данные';

    overlay.append(modalWindow);
    modalWindow.append(title, peopleCount, dates, price);
    btnWrapper.append(confirm, editData);
    modalWindow.append(btnWrapper);

    document.body.append(overlay);

    return new Promise( resolve => {
        editData.addEventListener('click', () => {
            overlay.remove();
            resolve(false);
        });
    
        confirm.addEventListener('click', () => {
            overlay.remove();
            resolve(true);
        });
    });
};

export default showModal;