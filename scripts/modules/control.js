const textArr = {
    's': ['секунда', 'секунды', 'секунд'],
    'm': ['минута', 'минуты', 'минут'],
    'h': ['час', 'часа', 'часов'],
    'd': ['день', 'дня', 'дней'],
    'y': ['год', 'года', 'лет'],
};

const detectTimeType = (type) => {
    switch (type)
        {
            case 's':
                return textArr.s;
            case 'm':
                return textArr.m;
            case 'h':
                return textArr.h;
            case 'd':
                return textArr.d;
                case 'y':
                    return textArr.y;
            default:
                return [];
        }
};
const detectEndings = (number, type) => {
    const arr = detectTimeType(type);
       // если число больше 20 то берем остаток от деления на 10
        switch ( (number >= 20) ? number % 10 : number )
        {
            case 1:
                return arr[0];
            case 2:
            case 3:
            case 4:
                return arr[1];
            default:
                return arr[2];
        }
}

const myTimeFormat = (number) => {
    if (number < 10 && number !== 0) {
        return '0' + number;
    } else return number;
}


export const timer = deadline => {
    const timerCountDays = document.querySelector('.timer__count_days');
    const timerCountHours = document.querySelector('.timer__count_hours');
    const timerCountMinutes = document.querySelector('.timer__count_minutes');
    const timerUnitsDays = document.querySelector('.timer__units_days');
    const timerUnitsHours = document.querySelector('.timer__units_hours');
    const timerUnitsMinutes = document.querySelector('.timer__units_minutes');

    const getTimeRemaining = () => {
        const dateStop = new Date(deadline).getTime();
        const dateNow = Date.now();
        const timeRemaining = dateStop - dateNow;
        const seconds = Math.floor(timeRemaining / 1000 % 60);
        const minutes = Math.floor(timeRemaining / 1000 / 60 % 60);
        const hours = Math.floor(timeRemaining / 1000 / 60 / 60 % 24);
        const days = Math.floor(timeRemaining / 1000 / 60 / 60 / 24);

        return {timeRemaining, seconds, minutes, hours, days}
    }

    const start = () => {
        const timer = getTimeRemaining();
        timerCountDays.textContent = myTimeFormat(timer.days);
        timerCountHours.textContent = myTimeFormat(timer.hours);
        timerCountMinutes.textContent = myTimeFormat(timer.minutes);
        timerUnitsDays.textContent = detectEndings(timer.days, 'd');
        timerUnitsHours.textContent = detectEndings(timer.hours, 'h');
        timerUnitsMinutes.textContent = detectEndings(timer.minutes, 'm');

        const intervalId = setTimeout(start, 1000);

        if (timer.minutes <= 0) {
            clearInterval(intervalId);
            document.querySelector('.hero__text').remove();
            document.querySelector('.hero__timer').remove();

        }
    }
    start();
};

export const setDeadline = (date) => {
    const deadline = document.querySelector('.timer');
    deadline.setAttribute('data-timer-deadline', date);
    return deadline.getAttribute('data-timer-deadline');
}