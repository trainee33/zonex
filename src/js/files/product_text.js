productTextLink = document.querySelectorAll('.description-text__link');

productTextLink.forEach(el => {
   el.addEventListener('click', (e) => {
      e.preventDefault();

      let target = e.currentTarget.getAttribute('href');

      productTextLink.forEach(el => el.classList.remove('description-text__link_active'));

      document.querySelectorAll('.content-product__one').forEach(el => 
         el.classList.remove('content-product__one_active'));      

      e.currentTarget.classList.add('description-text__link_active');

      document.querySelector(`[data-target="${target}"]`).classList.add('content-product__one_active');
   });
});