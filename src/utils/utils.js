export const RenderPosition = {
    AFTERBEGIN:`afterBegin`,
    BEFOREEND: `beforeEnd`
}

export const createElementTemplate = (elem) =>{
    const newElement = document.createElement('div');
    newElement.innerHTML = elem;
    
    return newElement;
};
export const render = (container, place, val) =>{
    switch(place){
        case RenderPosition.AFTERBEGIN:
             container.prepend(val);
             break;
        case RenderPosition.BEFOREEND:
             container.append(val);
            break;
    }
}


export const toggelData = (btn, childElement, changElement) => {
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