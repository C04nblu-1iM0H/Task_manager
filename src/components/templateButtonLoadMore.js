import {createElementTemplate} from '../utils/utils';
const createTemplateButtonLoadMore = () =>{
    return(`
        <button class="load-more" type="button">load more</button>
    `);
};

export default class BtnLoadMore{
    constructor(){
        this._element = null;
    }

    getTemplate(){
        return createTemplateButtonLoadMore();
    }

    getElement(){
        if(!this._element){
          this._element = createElementTemplate(this.getTemplate())
        }
        return this._element;
      }

    removeElement(){
        this._element = null;
    }
}