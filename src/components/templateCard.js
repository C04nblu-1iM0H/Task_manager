import {monthNames} from '../mocks/task';
import {createElementTemplate} from '../utils/utils';

const dayInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
}

const dateTransition = (data) => {
    const year = new Date().getFullYear(),
          month = new Date().getMonth(),
          dayInCurrentMonth = dayInMonth(month, year);
    let [day, mon] = data.split(' ');
  
    if(day > dayInCurrentMonth){
      day = day-dayInCurrentMonth;
      mon = monthNames[month+1] || monthNames[0];
    }else if(day < 1){
      day = dayInCurrentMonth - Math.abs(day);
      mon = monthNames[month-1] || monthNames[0];
    }
    return[day, mon];
};

const createItemCard = (data) =>{
    const {description, dueDate, tags, isArchive, isFavorite, color} = data,
          [setDate, setTime] = dueDate,
           convertingTagsToArray = [...tags],
          [dayColor] = setDate.split(' '),
          currentDate =  new Date().getDate(),
          [day, month] = dateTransition(setDate);
    return(`
        <article class="card card--${color} ${currentDate < dayColor ? `${Math.random() > 0.5 ? `card--repeat` : ``}`:`card--deadline`}">
            <div class="card__form">
                <div class="card__inner">
                    <div class="card__control">
                        <button type="button" class="card__btn card__btn--edit">
                            edit
                        </button>
                        <button type="button" class="card__btn card__btn--archive  ${isArchive? `card__btn--disabled`: ``}">
                            archive
                        </button>
                        <button type="button" class="card__btn card__btn--favorites ${isFavorite? `card__btn--disabled`: ``}">
                            favorites
                        </button>
                    </div>

                    <div class="card__color-bar">
                        <svg class="card__color-bar-wave" width="100%" height="10">
                            <use xlink:href="#wave"></use>
                        </svg>
                    </div>

                    <div class="card__textarea-wrap">
                        <p class="card__text">${description}</p>
                    </div>

                <div class="card__settings">
                    <div class="card__details">
                    <div class="card__dates">
                        <div class="card__date-deadline">
                        <p class="card__input-deadline-wrap">
                            <span class="card__date">${day} ${month}</span>
                            <span class="card__time">${setTime}</span>
                        </p>
                        </div>
                    </div>

                    <div class="card__hashtag">
                        <div class="card__hashtag-list">
                        ${convertingTagsToArray.map(it =>{
                            return(`
                                <span class="card__hashtag-inner">
                                    <span class="card__hashtag-name">
                                        #${it}
                                    </span>
                                </span> 
                            `)
                        }). join(` `)}
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        </article>
    `);
};

const createTemplateCard = (data) =>{
    return(`
        ${createItemCard(data)}
    `);
};

export default class Card {
    constructor(card){
        this._element = null;
        this._card = card;
    }

    getTemplate(){
        return createTemplateCard(this._card);
    }

    getElement(){
        if(!this._element){
            this._element = createElementTemplate(this.getTemplate());
        }

        return this._element;
    }

    removeElement(){
        this._element = null;
    }
}