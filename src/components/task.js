import AbstractComponent from "./AbstractComponent";
import moment from 'moment';


const createItemTask = (task) =>{   
    const {description, tags, dueDate, dueTime, isArchive, isFavorite, color} = task,
            currentDate = moment().format("MMMM DD"), //получение текущей даты для сравнения.
           convertingTagsToArray = [...tags];
           
    return(`
        <article class="card card--${color} ${ dueDate > currentDate? `${Math.random() > 0.5 ? `card--repeat` : ``}`:`card--deadline`}">
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
                            <span class="card__date">${dueDate}</span>
                            <span class="card__time">${dueTime}</span>
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

const createTemplateTask = (task) =>{
    return(`
        ${createItemTask(task)}
    `);
};

export default class Task extends AbstractComponent {
    constructor(task){
        super();
        this._task = task;
    }
    
    getTemplate(){
        return createTemplateTask(this._task);
    }

    setEditTamplate(handler){
        this.getElement().querySelector('.card__btn--edit').addEventListener('click', handler);
    }

}