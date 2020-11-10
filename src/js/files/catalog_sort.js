let catalogColumns = document.querySelector('.sort-column__list');
let gridColumns = document.querySelector('.grid-column');
let columnsBtn = document.querySelectorAll('.sort-column__btn');
let customSelect = document.querySelectorAll('.sort-select');

if (catalogColumns) {
   catalogColumns.addEventListener('click', (e) => {
      if(e.target.classList.contains('.sort-column__btn') || e.target.closest('.sort-column__item')){
         columnsBtn.forEach(el => {
            el.classList.remove('sort-column__btn_current');
         });
         e.target.classList.add('sort-column__btn_current');
   
         let columns = e.target.dataset.columns;
         gridColumns.dataset.columns = columns;
      }
   });
};

if (customSelect) {
   customSelect.forEach(el => {
      el.addEventListener('click', (e) => {
         e.currentTarget.classList.toggle('sort-select__open');

         if (e.target.classList.contains('sort-select__item')) {
            let text = e.target.textContent;
            e.currentTarget.querySelector('.sort-select__top').textContent = text;
         }
      });
   });
};
