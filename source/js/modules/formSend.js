'use strict';

(function () {
  const formPopup = document.querySelector('.form-popup');
  const successPopup = document.querySelector('.success-popup');
  const form = document.querySelector('.form-popup form');
  const formBtn = document.querySelector('.form-popup .form-popup__btn');
  const textarea = document.querySelector('.form-popup textarea');
  const input = document.querySelectorAll('.form-popup input');

  const successForm = function() {
    formPopup.classList.add('hidden');
    successPopup.classList.remove('hidden');
    setTimeout(() => successPopup.classList.add('hidden'), 1000);
  };

  const errorForm = function() {
    alert('Беда!');
  };

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.upload(
      new FormData(form),
      successForm,
      errorForm
    );
  });

  formBtn.addEventListener('click' , function() {
    if (!textarea.checkValidity()) {
      textarea.classList.add('invalid');
    }
    input.forEach(function(item) {
      if (!item.checkValidity()) {
        item.classList.add('invalid');
      }
    });
  })

  textarea.addEventListener('input' , function() {
    if (!textarea.checkValidity()) {
      textarea.classList.add('invalid');
    } else {
      textarea.classList.remove('invalid');
    }
  })

  input.forEach(function(item) {
    item.addEventListener('input' , function() {
      if (!this.checkValidity()) {
        this.classList.add('invalid');
      } else {
        this.classList.remove('invalid');
      }
    })
  });
})();