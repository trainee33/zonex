let stepper = document.querySelector('.stepper');
let stepperInput = document.querySelector('.stepper__input');
let stepperMin = document.querySelector('.stepper__btn_minus');
let stepperPlus = document.querySelector('.stepper__btn_plus');

/*stepperInput.addEventListener('keydown', (e) => {
   if(e.currentTarget.value < 0){
      stepperMin.classList.add('stepper__btn_disabled');
      stepperPlus.classList.remove('stepper__btn_disabled'); 
   } else {
      stepperMin.classList.remove('stepper__btn_disabled');
   }
   if(e.currentTarget.value > 99998){
      stepperMin.classList.remove('stepper__btn_disabled');
      stepperPlus.classList.add('stepper__btn_disabled'); 
   } else {
      stepperPlus.classList.('stepper__btn_disabled');
   }
});*/
if(stepperMin){
   stepperMin.addEventListener("click", () => {
      let currentValue = parseInt(stepperInput.value);
      currentValue --;
      stepperInput.value = currentValue;
      stepperPlus.classList.remove('stepper__btn_disabled');
      
      if (stepperInput.value <= 1) {
         stepperInput.value = 1;
         stepperMin.classList.add('stepper__btn_disabled');
      } else {
         stepperMin.classList.remove('stepper__btn_disabled');
      }
   });
}

if(stepperPlus){
   stepperPlus.addEventListener("click", () => {
      let currentValue = parseInt(stepperInput.value);
      currentValue ++;
      stepperInput.value = currentValue;
      stepperMin.classList.remove('stepper__btn_disabled');
   
      if (stepperInput.value > 99998) {
         stepperInput.value = 99999;
         stepperPlus.classList.add('stepper__btn_disabled');
      } else {
         stepperPlus.classList.remove('stepper__btn_disabled');
      }
   
   });
}

