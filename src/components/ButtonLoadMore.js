import AbstractComponent from "./AbstractComponent";

const createTemplateButtonLoadMore = () =>{
    return(`
        <button class="load-more" type="button">load more</button>
    `);
};

export default class BtnLoadMore extends AbstractComponent {
    getTemplate(){
        return createTemplateButtonLoadMore();
    }

    setClickHandler(handler){
        this.getElement().addEventListener('click', handler);
    }
}