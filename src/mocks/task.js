import { Colors } from "../const";

const DescriptionItems = [
    `Изучить теорию`,
    `Сделать домашку`,
    `Пройти интенсив на соточку`,
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

const getTimeWithAMPM = (time) =>{
    const [hours, minutes] = time.split(':');
    return hours - 12 > 0 ? `${hours-12}:${minutes} PM` : `${hours}:${minutes} AM`;
}

const getDateThisCards = () => {
    const date = new Date();
    const setDate = `${Math.random() > 0.5 ? date.getDate() + Math.floor(Math.random() * 12) : date.getDate() - Math.floor(Math.random() * 12)} ${monthNames[date.getMonth()]}`;
    const setTime = `${date.getHours()}:${date.getMinutes()}`;
    const getTimeAMPM = getTimeWithAMPM(setTime)
    return [
        setDate,
        getTimeAMPM
    ];
};

const generateTask = () =>{
    return{
        description : getRandomArrayItem(DescriptionItems),
        dueDate: getDateThisCards(),
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

