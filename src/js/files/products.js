const productsGrid = document.querySelector('.product-grid');

const fetchProducts = (quantity = 5) => {
   fetch('resources/products.json')
   .then((response) => {
      return response.json();
   })
   .then((data) => {      
      for (let i = 0; i < data.length; i++) {
         if( i < quantity) {
            console.log(data[i])
            productsGrid.innerHTML += `
               <li class="product-grid__item">
                  <article class="product">
                     <div class="product__img">
                        <img src="${data[i].img}" alt="${data[i].title}">
                     </div>
                     <span class="product__prop new">${data[i].prop}</span>
                     <h3 class="product__title">${data[i].title}</h3>
                     <span class="product__price">${data[i].price}</span>
                  </article>
               </li>
            `
         }
         
      }
      
   });
}

fetchProducts();