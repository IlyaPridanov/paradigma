'use strict';

(function () {
  const footerTopBtn = document.querySelector('.footer-top__btn');
  const formPopup = document.querySelector('.form-popup');
  const formPopupExit = document.querySelector('.form-popup__btn-exit');

  const getOpen = function () {
    formPopup.classList.remove('hidden');
  };

  const getClose = function () {
    formPopup.classList.add('hidden');
  };

  footerTopBtn.addEventListener('click' , function() {
    getOpen();
  })

  formPopupExit.addEventListener('click' , function() {
    getClose();
  })

  formPopup.addEventListener('click' , function(event) {
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