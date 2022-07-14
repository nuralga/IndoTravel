
// // первый способ - через callback
// const loadTours = async (cb) => {
//     const result = await fetch('db.json');
//     const data = await result.json();
//     console.log('data: ', data);

//     cb(data)
// }

// const renderTours = data => {
//     const cardsWrapper = document.createElement('div');
//     cardsWrapper.myClasses = 'cards';

//     const goods = data.map(item => {
//         console.log(item);
//     });
// }
// loadTours(renderTours);

// // второй способ - через async
const loadTours = async (cb) => {
    const result = await fetch('./db.json');
    const data = await result.json();
    // console.log('data: ', data);

    return data;
}

const renderSelect = (id, data, myClasses) => {
    const select = document.getElementById(id);

    while (select.lastChild.value !== '') {
        select.removeChild(select.lastChild);
    }

    data.forEach(element => {
        const option = document.createElement('option');
        option.value = element.date;
        myClasses.forEach(element => {
            option.classList.add(element);
        });
        option.innerText = element.date;
        select.append(option)
    });
    return select;
}

const changePplCount = (id, myClasses, min, max) => {
    // console.log('id, myClasses, min, max: ', id, myClasses, min, max);
    const select = document.getElementById(id);
    while (select.lastChild.innerText !== 'Количество человек') {
        select.removeChild(select.lastChild);
    }

    for (let i = min; i <= max; i++) {
        const option = document.createElement('option');
        option.value = i;
        myClasses.forEach(element => {
            option.classList.add(element);
        });
        option.innerText = i;
        select.append(option)
    }
    return select;
};

const renderTours = async () => {
    const data = await loadTours();

    const select1 = await renderSelect('tour__date', data, ['tour__option']);
    select1.addEventListener('change', (event) => {
        data.forEach(element => {
            if (element.date === event.target.value) {
                const ppl1 = changePplCount('tour__people', ['tour__option'], element["min-people"], element["max-people"]);
            }
        });
    });

    const select2 = await renderSelect('reservation__date', data, ['tour__option', 'reservation__option']);
    select2.addEventListener('change', (event) => {
       let minDate = 0;
       let maxDate = 0;
       let month1 = '';
       let month2 = '';
       let txt = '';
       let pplCount = 0;
       
       const reservationData = document.querySelector('.reservation__data');
        data.forEach(element => {
            if (element.date === event.target.value) {
                const dates = element.date.split(" - ");
                minDate = dates[0].split(".");
                // console.log('minDate: ', minDate);
                maxDate = dates[1].split(".");
                // console.log('maxDate: ', maxDate);
                const date1 = new Date(minDate[1] + '.' + minDate[0]);
                const date2 = new Date(maxDate[1] + '.' + maxDate[0]);
                month1 = date1.toLocaleString('default', { month: 'long' });
                month2 = date2.toLocaleString('default', { month: 'long' });
                // console.log('month1: ', month1);
                // console.log('month2: ', month2);
                txt = `${minDate[0]} ${month1} - ${maxDate[0]} ${month2}`;
                reservationData.innerText = txt;
                const ppl2 = changePplCount('reservation__people', ['tour__option', 'reservation__option'], element["min-people"], element["max-people"]);
            ppl2.addEventListener('change', (event) => {
                pplCount = event.target.value
                txt = `${minDate[0]} ${month1} - ${maxDate[0]} ${month2}, ${pplCount} человека`;
                reservationData.innerText = txt;
                const reservationPrice = document.querySelector('.reservation__price');
                reservationPrice.innerText = `${new Intl.NumberFormat('ru-RU').format(event.target.value * element.price)}₽`;
            });
            }
            
        }
        );
    })

}



renderTours();

const sendData = (body, callback) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://jsonplaceholder.typicode.com/posts');

    xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    xhr.addEventListener('load', () => {
        const data = JSON.parse(xhr.response);
        callback(data);
    });

    xhr.addEventListener('error', () => {
        console.log('error');
    });

    xhr.send(JSON.stringify(body));
}

const form = document.querySelector('.reservation__form');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    sendData({
        title: document.querySelector('.reservation__title').innerText,
        body: [
            form.dates.value,
            form.people.value,
            form.reservation__name.value,
            form.reservation__phone.value,
        ]
    },
    (data) => {
        form.innerHTML = `<h2 class="reservation__title" style="text-align: center;">Ваша заявка успешно <br>отправлена</h2>
        <h5>Наши менеджеры свяжутся с вами в течении 3-х рабочих дней</h5>`;
    })
});

const footerForm = document.querySelector('.footer__form');
footerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    sendData({
        title: document.querySelector('.footer__form-title').innerText,
        body: document.querySelector('.footer__input').value,
    },
    (data) => {
        footerForm.innerHTML = `<h2 class="footer__title footer__form-title">Ваша заявка успешно отправлена</h2>
        <p class="footer__text">Наши менеджеры свяжутся с вами в течении 3-х рабочих дней</p>`;
    })
});