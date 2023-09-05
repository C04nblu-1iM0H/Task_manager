import {createElementTemplate} from '../utils/utils';

const createFilterMarkup = (filter, isChecked) =>{
  const {name, count} = filter;

  return(`
    <input
      type="radio"
      id="filter__${name}"
      class="filter__input visually-hidden"
      name="filter"
      ${isChecked? `checked`: ``}
    />
    <label for="filter__all" class="filter__label">${name} 
      <span class="filter__${name}-count">${count}</span>
    </label>
  `)
};
const createTemplateFilter = (filters) => {

  const filtersMarkup = filters.map((item,i) => createFilterMarkup(item, i === 0)).join('\n');
  return(`
    <section class="main__filter filter container">
      ${filtersMarkup}
    </section>
  `)
};

export default class Filter {
  constructor(filter){
    this._element = null;
    this._filter = filter;
  }

  getTemplate(){
    return createTemplateFilter(this._filter);
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