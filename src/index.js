import './index.html';
import './libs/normalize.css';
import './style.css';
import {TUSK_COUNT} from './const';
import {generateFilters} from './mocks/filter';
import {generateTasks} from './mocks/task'; 
import {render, RenderPosition} from './utils/render';
import SiteMenu from './components/site-menu';
import Filter from './components/filter';
import BoardController from './controllers/board_controller';

const siteMenu = document.querySelector(`.main`);
const siteMenuControl = siteMenu.querySelector(`.main__control`);
let filters = generateFilters(); //получение объекта {filter, count}

render(siteMenuControl, new SiteMenu().getElement(), RenderPosition.BEFOREEND);//создание меню приложения 
render(siteMenu, new Filter(filters).getElement(), RenderPosition.BEFOREEND);//создание фильтра приложения
let tasks = generateTasks(TUSK_COUNT);
let boardController = new BoardController();
boardController.render(tasks); 