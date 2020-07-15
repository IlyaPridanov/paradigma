'use strict';

(function () {
  const jsBtn = document.querySelectorAll('.js-btn');
  const jsBtnNav = document.querySelector('.hamburger');
  const jsMobile = document.querySelectorAll('.js-mobile');

  jsBtn.forEach(function(item) {
    item.addEventListener('click' , function() {
      if(item.classList.contains('hamburger')) {
        item.classList.toggle('js-active');
      } else {
        jsBtnNav.classList.remove('js-active');
      }
      jsMobile.forEach(function(mobileItem) {
        if (item.dataset.mobile == mobileItem.dataset.mobile) {
          mobileItem.classList.toggle('js-close');
        } else {
          mobileItem.classList.add('js-close');
        }
      })
    })
  })
})();
