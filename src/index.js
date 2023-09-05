import './index.html';
import './libs/normalize.css';
import './style.css';
import { TUSK_COUNT, SHOWING_TUSK_COUNT_AT_START } from './const';
import SiteMenu from './components/templateHeader';
import Filter from './components/templateFilter';
import SortBoard from './components/templateBoard';
import Card from './components/templateCard';
import CardEdit from './components/templateEditCard';
import BtnLoadMore from './components/templateButtonLoadMore';
import {generateFilters} from './mocks/filter';
import {generateTasks} from './mocks/task'; 
import {render, RenderPosition, toggelData} from './utils/utils';

const templateBoard = new SortBoard();
const templateBtnLoadMore = new BtnLoadMore().getElement();

const saiteMainElement = document.querySelector('.main'),
      saiteHeaderElement = saiteMainElement.querySelector('.main__control');

render(saiteHeaderElement, RenderPosition.BEFOREEND, new SiteMenu().getElement());
render(saiteMainElement, RenderPosition.BEFOREEND, new Filter(generateFilters()).getElement());
render(saiteMainElement, RenderPosition.BEFOREEND, templateBoard.getElement());

const boardElement = saiteMainElement.querySelector('.board');

render(boardElement, RenderPosition.BEFOREEND, templateBtnLoadMore);

const taskListTemplate = saiteMainElement.querySelector('.board__tasks');
const LoadMoreBTN = document.querySelector('.load-more');

const renderTask = (task) =>{
  const taskComponent = new Card(task);
  const taskEditComponent = new CardEdit(task);

  const editBtn = taskComponent.getElement().querySelector(`.card__btn--edit`);
  editBtn.addEventListener(`click`, ()=>{
    taskListTemplate.replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
    const dataBtn = taskEditComponent.getElement().querySelector(`.card__date-deadline-toggle`),
          toggelDataSpan = taskEditComponent.getElement().querySelector(`.card__date-status`),
          fildsetData = taskEditComponent.getElement().querySelector(`.card__date-deadline`),
          repeatBtn = taskEditComponent.getElement().querySelector(`.card__repeat-toggle`),
          toggelRepeatSpan = taskEditComponent.getElement().querySelector(`.card__repeat-status`),
          fildsetRepeate = taskEditComponent.getElement().querySelector(`.card__repeat-days`);
    
          toggelData(dataBtn, toggelDataSpan, fildsetData);
          toggelData(repeatBtn, toggelRepeatSpan, fildsetRepeate);
  });

  const editForm = taskEditComponent.getElement().querySelector(`form`);
  editForm.addEventListener(`submit`, ()=>{
    taskListTemplate.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
  });

  render(taskListTemplate, RenderPosition.BEFOREEND, taskComponent.getElement());
}

const showingTuskCount = SHOWING_TUSK_COUNT_AT_START;
let currentElement = 1
const showLimitedTusk = (current) =>{
  const startIndex = (current - 1) * showingTuskCount;
  const endIndex = startIndex + showingTuskCount;
  generateTasks(TUSK_COUNT).slice(startIndex, endIndex).forEach(
    (task)=>{
      renderTask(task);
    }
  );
} 
showLimitedTusk(currentElement);

LoadMoreBTN.addEventListener('click', ()=>{
  currentElement++;
  const remainingTasks = generateTasks(TUSK_COUNT).length - (currentElement - 1) * showingTuskCount;
  console.log(remainingTasks);
  remainingTasks > 0 ? showLimitedTusk(currentElement) : LoadMoreBTN.remove();
});


