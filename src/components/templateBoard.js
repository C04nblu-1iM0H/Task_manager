import {createElementTemplate} from '../utils/utils';

const createTemplateSortingBoard = () =>{
    return (`
        <section class="board container">
            <div class="board__filter-list">
                <a href="#" class="board__filter">SORT BY DEFAULT</a>
                <a href="#" class="board__filter">SORT BY DATE up</a>
                <a href="#" class="board__filter">SORT BY DATE down</a>
            </div>
            <div class="board__tasks"></div>
        </section>
    `);
};


export default class SortBoard {
    constructor(){
        this._element = null;
    }

    getTemplate(){
        return createTemplateSortingBoard();
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