'use strict';

(function () {
const URL_UPLOAD = 'https://httpbin.org/post';

const NORMAL_STATUS = 200;

const upload = function (data, onLoad, onError) {
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';

  xhr.addEventListener('load', function () {
  if (xhr.status === NORMAL_STATUS) {
      onLoad(xhr.response);
  } else {
      onError();
  }
  });

  xhr.addEventListener('error', function () {
  onError();
  });

  xhr.open('POST', URL_UPLOAD);
  xhr.send(data);
};

window.backend = {
  upload: upload
};
})();