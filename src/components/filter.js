import AbstractComponent from "./AbstractComponent";

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

export default class Filter extends AbstractComponent {
  constructor(filters){
    super();
    this._filters = filters;
  }

  getTemplate(){
    return createTemplateFilter(this._filters);
  }
}