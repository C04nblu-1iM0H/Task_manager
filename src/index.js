import './index.html';
import './libs/normalize.css';
import './style.css';
import { TUSK_COUNT } from './const';
import {createTemlateHeader} from './components/templateHeader';
import {createTemplateFilter} from './components/templateFilter';
import {createTemplateBoard} from './components/templateBoard';
import {createTemplateCard} from './components/templateCard';
import {createEditTemplateCard} from './components/templateEditCard';
import {createTemplateButtonLoadMore} from './components/templateButtonLoadMore';
import {generateFilters} from './mocks/filter';
import {generateTask, generateTasks} from './mocks/task';
const dataFilter = generateFilters();

const saiteMainElement = document.querySelector('.main'),
      saiteHeaderElement = saiteMainElement.querySelector('.main__control');

const render = (container, place, template) =>{
    container.insertAdjacentHTML(place, template);
}

render(saiteHeaderElement,`beforeEnd`,createTemlateHeader());
render(saiteMainElement,`beforeEnd`, createTemplateFilter(dataFilter));
render(saiteMainElement,`beforeEnd`,createTemplateBoard());

const boardElement = saiteMainElement.querySelector('.board');
render(boardElement, `beforeEnd`, createTemplateButtonLoadMore());

const taskListTemplate = saiteMainElement.querySelector('.board__tasks');
const LoadMoreBTN = document.querySelector('.load-more');

render(taskListTemplate, `beforeEnd`, createEditTemplateCard(generateTask()));

const toggelData = document.querySelector('.card__date-deadline-toggle'),
      toggelDataSpan = document.querySelector('.card__date-status'),
      fildsetData = document.querySelector('.card__date-deadline'),
      toggleRepeat = document.querySelector('.card__repeat-toggle'),
      toggelRepeatSpan = document.querySelector('.card__repeat-status'),
      fildsetRepeate = document.querySelector('.card__repeat-days');
      
const toggelDataFn = (btn, childElement, changElement) => {
  btn.addEventListener('click', (e)=>{
    const target = e.target;
    if(target == btn && target.firstElementChild.innerHTML === 'yes') {
      target.firstElementChild.innerHTML = 'no';
      changElement.setAttribute("disabled", "disabled");
    }else if(target == childElement && target.innerHTML === 'yes'){
      target.innerHTML = 'no';
      changElement.setAttribute("disabled", "disabled");
    }else if(target == childElement && target.innerHTML === 'no'){
      target.innerHTML = 'yes';
      changElement.removeAttribute("disabled", "disabled");
    }else{
      target.firstElementChild.innerHTML = 'yes';
      changElement.removeAttribute("disabled", "disabled");
    }
  });
};

toggelDataFn(toggelData, toggelDataSpan, fildsetData);
toggelDataFn(toggleRepeat, toggelRepeatSpan, fildsetRepeate);

const tasksPerPage = 8;
let currentPage = 1

const showLimitedTusk = (page) =>{
  const startIndex = (page - 1) * tasksPerPage;
  const endIndex = startIndex + tasksPerPage;
  const getLimitedTasks = generateTasks(TUSK_COUNT).slice(startIndex, endIndex);
  getLimitedTasks.fill(``).forEach(
    ()=> render(taskListTemplate, `beforeEnd`, createTemplateCard(generateTask()))
  );
} 
showLimitedTusk(currentPage);

LoadMoreBTN.addEventListener('click', ()=>{
  currentPage++;
  const remainingTasks = generateTasks(TUSK_COUNT).length - (currentPage - 1) * tasksPerPage;
  console.log(remainingTasks);
  remainingTasks > 0 ? showLimitedTusk(currentPage) : LoadMoreBTN.style = 'display:none';
});

