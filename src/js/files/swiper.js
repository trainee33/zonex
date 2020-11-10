import Swiper, { Navigation, Pagination } from 'swiper';

Swiper.use([Navigation, Pagination]);

let hero_slider = document.querySelector('.hero-slider');

if(hero_slider){
   let heroSlider = new Swiper(hero_slider, {
      slidesPerView: 1,
      loop: true,
      autoHeight: true,
      // If we need pagination
      pagination: {
         el: '.swiper-pagination',
         clickable: true,
       },   
    });
}


let category_slider = document.querySelector('.category__slider');

if(category_slider){
   let categorySlider = new Swiper( category_slider, {
      
      slidesPerView: 1,
      loop: true,
      autoHeight: true,
      // Navigation arrows
      navigation: {
      nextEl: '.category__btn_next',
      prevEl: '.category__btn_prev',
      },
   });
}

let related_slider = document.querySelector('.related-slider');

if(related_slider){
   let relatedSlider = new Swiper(related_slider, {
      slidesPerView: 4,
      loop: true,
      autoHeight: true,
      spaceBetween: 30,
      // If we need pagination
      pagination: {
         el: '.related-slider__pag',
         clickable: true,
       },   
    });
}