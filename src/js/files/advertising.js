let marketing = document.querySelector('.marketing');

if(marketing){

   let counter = 0;
   let delay = 4000;

   const data = [
      {
         title: 'Title of product 1',
         where: 'Moscov, Russia'
      },
      {
         title: 'Title of product 2',
         where: 'Kiev, Ukraine'
      },
      {
         title: 'Title of product 3',
         where: 'Roma, Italy'
      }
   ];

   const chengeMarketingData = () => {
      marketing.classList.remove('marketing-visible');

      setTimeout(() => {
         marketing.classList.add('marketing-visible');
      }, delay - 2000);

      const stringTitle = `${data[counter].title}`;
      const stringWhere = `15 minutes ago ${data[counter].where}`;

      marketing.querySelector('.marketing-text__title').textContent = stringTitle;
      marketing.querySelector('.marketing-text__from').textContent = stringWhere;

      counter ++;
      if (counter === data.length) {
         counter = 0;
      }
   }
   //chengeMarketingData();

   //setInterval(chengeMarketingData, delay);

   marketing.addEventListener('click', (e) => {
      if (e.target.classList.contains('marketing-close')) {
         marketing.classList.remove('marketing-visible');
      }
   });
}