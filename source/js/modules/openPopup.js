'use strict';

(function () {
  const popup = document.querySelector('.popup');
  const headerLink = document.querySelector('.header__top-link');
  const mainLink = document.querySelector('.main__link');
  const popupClose = document.querySelectorAll('.popup__close');

  const getOpen = function() {
    popup.classList.remove('hidden');
  };

  const getClose = function() {
    popup.classList.add('hidden');
  };

  headerLink.addEventListener('click' , function(evt) {
    evt.preventDefault();
    getOpen();
  })

  mainLink.addEventListener('click' , function() {
    getOpen();
  })

  popupClose.forEach(function(item) {
    item.addEventListener('click' , function() {
      getClose();
    })
  })

  popup.addEventListener('click' , function(event) {
    if (event.target === this) {
      getClose();
    }
  })

  document.addEventListener('keydown', function(e) {
    if (e.key === "Escape") {
      getClose(); 
    }
  });
})();
