let filterSize = document.querySelector('.filter-size');
let size = '';

if(filterSize){
   filterSize.addEventListener('click', (e) => {
      if(e.target.classList.contains('filter-size__btn')) { 
   
         e.currentTarget.querySelector('.filter-size__clear').style.display = 'inline-block'
   
         e.target.classList.toggle('filter-size__btn_active');      
   
         if (e.target.classList.contains('filter-size__btn_active')) {
   
            let currentSize = e.target.textContent;
   
            size += currentSize + ', ';
         } else {
            let currentSize = e.target.textContent + ', ';
   
            size = size.replace(currentSize, '');
         }
   
         e.currentTarget.querySelector('.filter-size__title span').textContent = size;
   
         if (!size) { e.currentTarget.querySelector('.filter-size__title span').textContent = 'Select a size';         
         }
      }
   
      if(e.target.classList.contains('filter-size__clear')) {
   
         document.querySelectorAll('.filter-size__btn').forEach(el => el.classList.remove('filter-size__btn_active'));
   
         e.currentTarget.querySelector('.filter-size__title span').textContent = 'Select a size';
         e.target.style.display = 'none';
         size = '';
      }
   });
}
