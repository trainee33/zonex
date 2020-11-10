let deliveryClose = document.querySelector('.delivery__btn');

if (deliveryClose) {
   deliveryClose.addEventListener('click', (e) => {
      e.currentTarget.closest('.delivery').style.display = 'none';
   });
}
