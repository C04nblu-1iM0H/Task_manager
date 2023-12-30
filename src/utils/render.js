
export const createElementTemplate = (elem) =>{
    const newElement = document.createElement('div');
    newElement.innerHTML = elem;
    
    return newElement;
};

export const RenderPosition = {
    AFTERBEGIN:`afterBegin`,
    BEFOREEND: `beforeEnd`
};

export const render = (container, val,  place) =>{
    switch(place){
        case RenderPosition.AFTERBEGIN:
             container.prepend(val);
             break;
        case RenderPosition.BEFOREEND:
             container.append(val);
            break;
    }
}

export const removeBtn = (component) =>{
    component.getElement().remove();
}

export const replace = (oldComponent, newComponent) =>{
    const oldElement = oldComponent.getElement()
    const parentElement = oldElement.parentElement;
    const newElement = newComponent.getElement()
    if(parentElement) parentElement.replaceChild(newElement, oldElement);
}
