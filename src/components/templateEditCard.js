import {Colors} from '../const';


const createCardEdit = (card) =>{
  const {description, dueDate, repeatingDays, tags, color} = card;
  const convertingTagsToArray = [...tags]
  const [setDate, setTime] = dueDate
  return(`
      <form class="card__form" method="get">
      <div class="card__inner">
        <div class="card__color-bar">
          <svg class="card__color-bar-wave" width="100%" height="10">
            <use xlink:href="#wave"></use>
          </svg>
        </div>

        <div class="card__textarea-wrap">
          <label>
            <textarea
              class="card__text"
              placeholder="Start typing your text here..."
              name="text"
            >${description}</textarea>
          </label>
        </div>

        <div class="card__settings">
          <div class="card__details">
            <div class="card__dates">
              <button class="card__date-deadline-toggle" type="button">
                date: <span class="card__date-status">yes</span>
              </button>

              <fieldset class="card__date-deadline">
                <label class="card__input-deadline-wrap">
                  <input
                    class="card__date"
                    type="text"
                    placeholder=""
                    name="date"
                    value="${setDate} ${setTime}"
                  />
                </label>
              </fieldset>

              <button class="card__repeat-toggle" type="button">
                repeat:<span class="card__repeat-status">yes</span>
              </button>

              <fieldset class="card__repeat-days">
                <div class="card__repeat-days-inner">
                  ${Object.keys(repeatingDays).map( item =>{
                      return(`
                        <input
                          class="visually-hidden card__repeat-day-input"
                          type="checkbox"
                          id="repeat-${item}-4"
                          name="repeat"
                          value="${item}"
                          ${Math.random() > 0.5 ? `checked`: ``}
                        />
                        <label class="card__repeat-day" for="repeat-${item}-4">${item}</label>
                     `);
                    }).join(` `)
                  }
                </div>
              </fieldset>
            </div>

            <div class="card__hashtag">
              <div class="card__hashtag-list">
                <span class="card__hashtag-inner">
                  ${convertingTagsToArray.map(it => {
                      return(`
                        <span class="card__hashtag-inner">
                          <input
                            type="hidden"
                            name="hashtag"
                            value="repeat"
                            class="card__hashtag-hidden-input"
                          />
                          <p class="card__hashtag-name">
                            #${it}
                          </p>
                          <button type="button" class="card__hashtag-delete">
                            delete
                          </button>
                        </span>
                      `);
                  }).join(` `)}
              </div>

              <label>
                <input
                  type="text"
                  class="card__hashtag-input"
                  name="hashtag-input"
                  placeholder="Type new hashtag here"
                />
              </label>
            </div>
          </div>

          <div class="card__colors-inner">
            <h3 class="card__colors-title">Color</h3>
            <div class="card__colors-wrap">
              ${Colors.map((item)=>{
                  return(`
                      <input
                          type="radio"
                          id="color-${item}-4"
                          class="card__color-input card__color-input--${item} visually-hidden"
                          name="color"
                          value="${item}"
                          ${color === item? `checked`:``}
                      />
                      <label
                          for="color-${item}-4"
                          class="card__color card__color--${item}"
                          >${item}</label
                      >
                  `)
              }).join(` `)}
            </div>
          </div>
        </div>

        <div class="card__status-btns">
          <button class="card__save" type="submit">save</button>
          <button class="card__delete" type="button">delete</button>
        </div>
      </div>
    </form>
  `)
}

export const createEditTemplateCard = (dataCard) =>{
  return(`
      <article class="card card--edit card--yellow card--repeat">
           ${createCardEdit(dataCard)}
      </article>
  `);
};
