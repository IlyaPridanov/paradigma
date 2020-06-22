'use strict';

(function () {
  const headerNavBtn = document.querySelector('.header__button');
  const headerNav = document.querySelector('.header__nav');

  let getOpenNav = function (link) {
    link.addEventListener('click', function () {
      link.classList.toggle('header__button--active');
      headerNav.classList.toggle('header__nav--inactive');
    });
  };

  getOpenNav(headerNavBtn);
})();
