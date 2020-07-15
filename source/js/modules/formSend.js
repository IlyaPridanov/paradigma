'use strict';

(function () {
  const formPopup = document.querySelector('.popup');
  const successPopup = document.querySelector('.popup__success');
  const form = document.querySelector('.popup form');

  const successForm = function() {
    form.classList.add('hidden');
    successPopup.classList.remove('hidden');
    setTimeout(() => {
      successPopup.classList.add('hidden');
      formPopup.classList.add('hidden');
      form.classList.remove('hidden');
    }, 1000);
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
})();