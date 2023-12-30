


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