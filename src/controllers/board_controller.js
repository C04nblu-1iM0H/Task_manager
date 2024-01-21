import moment from 'moment';

import {render, removeBtn, RenderPosition, replace} from "../utils/render";
import {SHOWING_TUSK_COUNT_AT_START, TASK_BUTTON  } from '../const';
import NoTasks from "../components/no-tasks";
import Task from "../components/task";
import TaskEdit from "../components/task-edit";
import Sort, { SortType } from "../components/sort";
import BtnLoadMore from "../components/ButtonLoadMore";
import Board from "../components/board";

const renderTask = (container, task) =>{
    const onEscDown = (e) =>{
        if(e.key === `Escape`){
            replaceEditToTask();
            document.removeEventListener(`keydown`, onEscDown);
        }
    }
    const replaceTaskToEdit = () =>{
        replace(taskComponent, taskEditComponent);
    }

    const replaceEditToTask = () =>{
        replace(taskEditComponent, taskComponent);
    }

    const onEscPress = () => {
        document.addEventListener(`keydown`, onEscDown);
    };

    const HideOrShowData = (e) =>{
        const target = e.target;
        const innerHTML = target.firstElementChild ? target.firstElementChild.innerHTML : '';
        const targetInnerHTML = target.innerHTML;

        if (target.classList.contains('card__date-deadline-toggle') && innerHTML === 'yes') {
            target.nextElementSibling.setAttribute('disabled', '');
            target.firstElementChild.innerHTML = 'no';
        } else if (target.classList.contains('card__date-status') && targetInnerHTML === 'yes') {
            const parentElementNextSibling = target.parentElement.nextElementSibling;
            if (parentElementNextSibling) {
                parentElementNextSibling.setAttribute('disabled', '');
                target.innerHTML = 'no';
            }
        } else if (target.classList.contains('card__date-status') && targetInnerHTML === 'no') {
            const parentElementNextSibling = target.parentElement.nextElementSibling;
            if (parentElementNextSibling) {
                parentElementNextSibling.removeAttribute('disabled');
                target.innerHTML = 'yes';
            }
        } else {
            target.nextElementSibling.removeAttribute('disabled');
            target.firstElementChild.innerHTML = 'yes';
        }
    }

    const HideOrShowRepeate = (e) =>{
        const target = e.target;
        const innerHTML = target.firstElementChild ? target.firstElementChild.innerHTML : '';
        const targetInnerHTML = target.innerHTML;

        if (target.classList.contains('card__repeat-toggle') && innerHTML === 'yes') {
            target.nextElementSibling.setAttribute('disabled', '');
            target.firstElementChild.innerHTML = 'no';
        } else if (target.classList.contains('card__repeat-status') && targetInnerHTML === 'yes') {
            const parentElementNextSibling = target.parentElement.nextElementSibling;
            if (parentElementNextSibling) {
                parentElementNextSibling.setAttribute('disabled', '');
                target.innerHTML = 'no';
            }
        } else if (target.classList.contains('card__repeat-status') && targetInnerHTML === 'no') {
            const parentElementNextSibling = target.parentElement.nextElementSibling;
            if (parentElementNextSibling) {
                parentElementNextSibling.removeAttribute('disabled');
                target.innerHTML = 'yes';
            }
        } else {
            target.nextElementSibling.removeAttribute('disabled');
            target.firstElementChild.innerHTML = 'yes';
        }
    }

    const taskComponent = new Task(task);
    const taskEditComponent = new TaskEdit(task);

    taskComponent.setEditTamplate(replaceTaskToEdit);
    taskComponent.setEditTamplate(onEscPress);
    taskEditComponent.setFormSubmiteTamplate(replaceEditToTask);
    taskEditComponent.setHideOrShowData(HideOrShowData);
    taskEditComponent.setHideOrShowRepeate(HideOrShowRepeate);
    
    render(container, taskComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderTasks = (container, tasks) => {
    tasks.forEach(task => {
        renderTask(container, task);
    });
};


export default class BoardController {
    constructor(){
        this._board = new Board();
        this._noTasks = new NoTasks();
        this._sort = new Sort();
        this._btnComponent = new BtnLoadMore();

        this._currentElement = 1;
        this._sortedTask = [];
        this._transferSortType = SortType.DEFAULT;
    }

  
    render(tasks){
        const siteMainElement = document.querySelector(`.main`);
        const siteBoardElement = this._board.getElement().querySelector(`.board`);
        const siteBoardTuskElement = this._board.getElement().querySelector(`.board__tasks`);

        render(siteMainElement, this._board.getElement(), RenderPosition.BEFOREEND);
        render(siteBoardElement, this._sort.getElement(), RenderPosition.AFTERBEGIN);

        const showLimitedTusk = (tasksDefault) =>{
            console.log('Список задач - ', tasksDefault);
            const startIndex = (this._currentElement - 1) * TASK_BUTTON;
            const endIndex = startIndex + TASK_BUTTON;
            renderTasks(siteBoardTuskElement, tasksDefault.slice(startIndex, endIndex));
        }
        showLimitedTusk(tasks);
        render(siteBoardElement, this._btnComponent.getElement(), RenderPosition.BEFOREEND);

        const addTask = () =>{
            this._currentElement++;
            const remainingTasks = tasks.length - ( this._currentElement - 1) * TASK_BUTTON;
            const taskList = this._transferSortType !== SortType.DEFAULT ? this._sortedTask : tasks;
            console.log(taskList);
            console.log('Не показанные задачи на экране - ',remainingTasks);

            remainingTasks > 0 ? showLimitedTusk(taskList) :  removeBtn(this._btnComponent);
        }
        this._btnComponent.setClickHandler(addTask);

        this._sort.setSortTypeChangeHandler((sortType) => {
            this._currentElement = 1;
            this._transferSortType = sortType;
            switch (sortType) {
                case SortType.DATEUP:
                    this._sortedTask  = [...tasks].sort((a,b) => moment(a.dueDate) - moment(b.dueDate));
                    break;
                case SortType.DATEDOWN:
                    this._sortedTask  = [...tasks].sort((a,b) => moment(b.dueDate) - moment(a.dueDate));
                    break;
                case SortType.DEFAULT:
                    this._sortedTask  = [...tasks];
                    break;
            }

            console.log('Отсортированные задачи - ', this._sortedTask );
            siteBoardTuskElement.innerHTML = ``;
            showLimitedTusk(this._sortedTask );
            render(siteBoardElement, this._btnComponent.getElement(), RenderPosition.BEFOREEND);
        });
    }

}