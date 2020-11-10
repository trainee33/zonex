if (document.querySelector('.filter-price')) {
   priceSlider = document.querySelector('.filter-price__slider');
   noUiSlider.create(priceSlider, {
      start: [ 0, 20000 ],
      step: 100,
      tooltips: [ wNumb({ decimals: 0 }), wNumb({ decimals: 0 }) ],
      connect: true,
      range: {
         min: 0,
         max: 20000
      }
   });
}