const productsGrid = document.querySelector('.product-grid');
const loadMore = document.querySelector('.main-products__more');
let quantityProducts = 5;
let dataLength = "";

const fetchProducts = (quantity = 5) => {
   fetch('resources/products.json')
   .then((response) => {
      return response.json();
   })
   .then((data) => {
      dataLength = data.length;      
      productsGrid.innerHTML = "";     
      for (let i = 0; i < data.length; i++) {
         if( i < quantity) {            
            productsGrid.innerHTML += `
               <li class="product-grid__item">
                  <article class="product">
                     <div class="product__img">
                        <img src="${data[i].img}" alt="${data[i].title}">
                     </div>
                     <span class="product__prop new">${data[i].prop}</span>
                     <h3 class="product__title">${data[i].title}</h3>
                     <span class="product__price">${data[i].price}</span>
                     <span class="product__price oldprice">${data[i].oldprice}</span>
                  </article>
               </li>
            `
         }         
      }      
   });
};

fetchProducts(quantityProducts);

if(loadMore){
   loadMore.addEventListener('click', (e) => {
      quantityProducts = quantityProducts + 5;
      fetchProducts(quantityProducts);
      if(quantityProducts == dataLength) {
         loadMore.style.display = 'none';
      } else {
         loadMore.style.display = 'inline-flex';
      }
   });
};