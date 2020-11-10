let catalogFiltersTop = document.querySelectorAll('.filter-item__header');
let hideFilter = document.querySelector('.hide-filter');
let filterItem = document.querySelectorAll('.filter-item__checkbox');
let categorySort = document.querySelector('.category-sort__bottom');

if (catalogFiltersTop) {
   catalogFiltersTop.forEach(el => {
      el.addEventListener('click', (e) => {
         e.currentTarget.closest('.filter-item').classList.toggle('filter-item__open');
      });
   });
};

if (hideFilter) {
   hideFilter.addEventListener('click', (e) => {
      catalogFiltersTop.forEach(el => {
         el.closest('.filter-item').classList.remove('filter-item__open');
      });
   });
};

const createItemSort = (text) => {
   return (
      `
      <button class="btn-reset sort-bottom__item" data-text="${text}">
         ${text}
         <svg>
            <use xlink:href="img/sprite.svg#sort-close"></use>
         </svg>  
      </button>
      `
   );
}

if (filterItem) {
   filterItem.forEach(el => {
      el.querySelector('input').addEventListener('change', (e) => {
         let checked = el.querySelector('input').checked;
         
         if (checked) {
            el.querySelector('.item-checkbox').classList.add('checkbox-active');
            let text =  el.querySelector('.item-checkbox').value;

            categorySort.insertAdjacentHTML('afterbegin', createItemSort(text));
            
         } else {
            el.querySelector('.item-checkbox').classList.remove('checkbox-active');
            
            let text =  el.querySelector('.item-checkbox').value;

            document.querySelector(`[data-text="${text}"]`).style.display = 'none';
         }
         let activeCheckBoxes = document.querySelector('.checkbox-active');
         if (activeCheckBoxes) {
            categorySort.style.display = 'block';
         } else {
            categorySort.style.display = 'none';
         }
      });
   });
};

if (categorySort) {
   categorySort.addEventListener('click', (e) => {
      if (e.target.classList.contains('sort-bottom__item')) {
         e.target.remove();
   
         let sortText = e.target.textContent.trim();
         let checkboxValues = document.querySelectorAll('.item-checkbox');
            for (let i = 0; i < checkboxValues.length; i++) {
               let checkboxItem = checkboxValues[i];
               let checkboxValue = checkboxValues[i].value;
   
               if(checkboxValue === sortText){
               checkboxItem.checked = false;
               }
            }      
      };
      
      if (e.target.classList.contains('sort-bottom__clear')) {
         Array.from(e.currentTarget.children).forEach(el => {
            if(!el.classList.contains('sort-bottom__clear')){
               el.remove();
               let checkboxValues = document.querySelectorAll('.item-checkbox');
               for (let i = 0; i < checkboxValues.length; i++) {
                     let checkboxItem = checkboxValues[i];
                     checkboxItem.checked = false;
                  
               }
            }
         });
         e.currentTarget.style.display = 'none';     
      };
   
      if (e.currentTarget.children.length === 1) {
         e.currentTarget.style.display = 'none';
      };
   });
};

