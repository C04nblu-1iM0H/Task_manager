import { Colors } from "../const";
import moment from 'moment';

const DescriptionItems = [
    `Изучить теорию`,
    // `Сделать домашку`,
    // `Пройти интенсив на соточку`,
];

const DefaultRepeatingDays = {
    mo:false,
    tu:false,
    we:false,
    th:false,
    fr:false,
    sa:false,
    su:false
};

const Tags = [
    `homework`,
    `theory`,
    `practice`,
    `intensive`,
    `keks`,
];

export const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];



const getRandomIntegerNumber = (min, max) =>{
    return min + Math.floor(max * Math.random());
}

const getRandomArrayItem = (array) =>{
    const randomIndex = getRandomIntegerNumber(0, array.length);

    return array[randomIndex];
}

const generatorTags = (tags) =>{
    return tags.filter(() => Math.random() > 0.5).slice(0,3);
}


export const randomTimeTransition = () => {
    const currentMoment = moment();
    // Генерация случайного числа от -180 до 180 (количество минут для добавления или вычитания)
    const randomMinutes = Math.floor(Math.random() * 361) - 180;
    // Добавление случайного количества минут
    currentMoment.add(randomMinutes, 'minutes');
    // Проверка, если минуты вышли за пределы 24 часов
    if (currentMoment.minutes() < 0) {
        // Вычитание 60 минут (1 час) и уменьшение часов
        currentMoment.subtract(60, 'minutes').subtract(1, 'hours');
    } else if (currentMoment.minutes() >= 60) {
        // Вычитание 60 минут (1 час) и увеличение часов
        currentMoment.subtract(60, 'minutes').add(1, 'hours');
    }
    return currentMoment.format('HH:mm');
}

export const randomDateTransition = () => {
    const currentMoment = moment();  
    // Генерация случайного числа от -15 до 15 (количество дней для добавления или вычитания)
    const randomDays = Math.floor(Math.random() * 31) - 15;
    // Добавление случайного числа дней
    currentMoment.add(randomDays, 'days');
    // Проверка, если день вышел за пределы текущего месяца
    if (currentMoment.date() > moment().daysInMonth()) {
        // Увеличение месяца
        currentMoment.add(1, 'month');
        // Проверка, если месяц стал больше 12, обновление до 0
        if (currentMoment.month() > 11) {
            currentMoment.month(0);
        }
    }
    return currentMoment.format("YYYY-MM-DD");
}

const generateTask = () =>{
    return{
        description : getRandomArrayItem(DescriptionItems),
        dueDate: randomDateTransition(),
        dueTime:randomTimeTransition(),
        repeatingDays:DefaultRepeatingDays,
        tags: new Set(generatorTags(Tags)),
        isFavorite : Math.random() > 0.5,
        isArchive : Math.random() > 0.5,
        color: getRandomArrayItem(Colors)
    };
};

const generateTasks = (count)=>{
    return new Array(count)
        .fill(``)
        .map(generateTask);
};

export {generateTask, generateTasks}

