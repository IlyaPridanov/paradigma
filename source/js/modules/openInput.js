'use strict';

(function () {
  const Select = document.querySelector('.js-select');
  const inputColumn = document.querySelector('.popup__input-column');

  Select.addEventListener('click' , function() {
    Select.classList.toggle('js-select-active');
    inputColumn.classList.toggle('js-select-close');
  })
})();