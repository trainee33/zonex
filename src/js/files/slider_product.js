let slidersProductThumbs = document.querySelector('.sliders-product__thumbs');
let slidersProductImg = document.querySelector('.sliders-product__main');

if(slidersProductThumbs){
   slidersProductThumbs.addEventListener('click', (e) => {
      if(e.target.classList.contains('sliders-product__thumb')){
            let src = e.target.querySelector('img').getAttribute('src');
            //slidersProductImg.setAttribute('src', src);
            slidersProductImg.style.backgroundImage = "url('" + src + "')";
         }
   });
}
