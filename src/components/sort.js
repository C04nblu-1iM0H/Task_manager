import AbstractComponent from "./AbstractComponent";

export const SortType = {
    DATEUP: `date-up`,
    DATEDOWN: `date-down`,
    DEFAULT: `default`
}

const createTemplateSorting = () =>{
    return (`
            <div class="board__filter-list">
                <a href="#" data-sort-type="${SortType.DEFAULT}" class="board__filter">SORT BY DEFAULT</a>
                <a href="#" data-sort-type="${SortType.DATEUP}" class="board__filter">SORT BY DATE up</a>
                <a href="#" data-sort-type="${SortType.DATEDOWN}" class="board__filter">SORT BY DATE down</a>
            </div>
    `);
};


export default class Sort extends AbstractComponent{
    constructor(){
        super();
        this._currentSortType = SortType.DEFAULT;
    }

    getTemplate(){
        return createTemplateSorting();
    }

    setSortTypeChangeHandler(handler){
        this.getElement().addEventListener(`click`, (e)=>{
            e.preventDefault();

            if(e.target.tagName !== `A`) {
                return;
            }

            const sortType = e.target.dataset.sortType;
            if(this._currentSortType === sortType){ 
                return;
            }

            this._currentSortType = sortType;
            handler(this._currentSortType);
        });
    }
}