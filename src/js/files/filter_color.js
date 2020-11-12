let filterColor = document.querySelector('.filter-color');

if(filterColor){
   filterColor.addEventListener('click', (e) => {
      if(e.target.classList.contains('filter-color__btn')) {
         document.querySelectorAll('.filter-color__btn').forEach(el => el.classList.remove('filter-color__btn_active'));
   
         let color = e.target.dataset.color;
   
         e.currentTarget.querySelector('.filter-color__title span').textContent = color;
   
         e.target.classList.add('filter-color__btn_active');
         
      }
   });
}
