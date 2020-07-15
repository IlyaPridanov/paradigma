'use strict';

(function () {
    const telInputs = document.querySelectorAll('.js-tel-input');

    const maskOptions = {
        mask: '+{7} (000) 000-00-00'
    };

    if (telInputs.length) {
        telInputs.forEach(function (tel) {
            return new window.IMask(tel, maskOptions);
        });
    }

    return null;
})();
