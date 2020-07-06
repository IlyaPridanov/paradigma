"use strict";

// Подключение js-файлов с помощью rigger-а
// Vendor

/*
Details Element Polyfill 2.4.0
Copyright © 2019 Javan Makhmali
 */
(function () {
  "use strict";

  var element = document.createElement("details");
  var elementIsNative = typeof HTMLDetailsElement != "undefined" && element instanceof HTMLDetailsElement;
  var support = {
    open: "open" in element || elementIsNative,
    toggle: "ontoggle" in element
  };
  var styles = '\ndetails, summary {\n  display: block;\n}\ndetails:not([open]) > *:not(summary) {\n  display: none;\n}\nsummary::before {\n  content: "►";\n  padding-right: 0.3rem;\n  font-size: 0.6rem;\n  cursor: default;\n}\n[open] > summary::before {\n  content: "▼";\n}\n';
  var _ref = [],
      forEach = _ref.forEach,
      slice = _ref.slice;

  if (!support.open) {
    polyfillStyles();
    polyfillProperties();
    polyfillToggle();
    polyfillAccessibility();
  }

  if (support.open && !support.toggle) {
    polyfillToggleEvent();
  }

  function polyfillStyles() {
    document.head.insertAdjacentHTML("afterbegin", "<style>" + styles + "</style>");
  }

  function polyfillProperties() {
    var prototype = document.createElement("details").constructor.prototype;
    var setAttribute = prototype.setAttribute,
        removeAttribute = prototype.removeAttribute;
    var open = Object.getOwnPropertyDescriptor(prototype, "open");
    Object.defineProperties(prototype, {
      open: {
        get: function get() {
          if (this.tagName == "DETAILS") {
            return this.hasAttribute("open");
          } else {
            if (open && open.get) {
              return open.get.call(this);
            }
          }
        },
        set: function set(value) {
          if (this.tagName == "DETAILS") {
            return value ? this.setAttribute("open", "") : this.removeAttribute("open");
          } else {
            if (open && open.set) {
              return open.set.call(this, value);
            }
          }
        }
      },
      setAttribute: {
        value: function value(name, _value) {
          var _this = this;

          var call = function call() {
            return setAttribute.call(_this, name, _value);
          };

          if (name == "open" && this.tagName == "DETAILS") {
            var wasOpen = this.hasAttribute("open");
            var result = call();

            if (!wasOpen) {
              var summary = this.querySelector("summary");
              if (summary) summary.setAttribute("aria-expanded", true);
              triggerToggle(this);
            }

            return result;
          }

          return call();
        }
      },
      removeAttribute: {
        value: function value(name) {
          var _this2 = this;

          var call = function call() {
            return removeAttribute.call(_this2, name);
          };

          if (name == "open" && this.tagName == "DETAILS") {
            var wasOpen = this.hasAttribute("open");
            var result = call();

            if (wasOpen) {
              var summary = this.querySelector("summary");
              if (summary) summary.setAttribute("aria-expanded", false);
              triggerToggle(this);
            }

            return result;
          }

          return call();
        }
      }
    });
  }

  function polyfillToggle() {
    onTogglingTrigger(function (element) {
      element.hasAttribute("open") ? element.removeAttribute("open") : element.setAttribute("open", "");
    });
  }

  function polyfillToggleEvent() {
    if (window.MutationObserver) {
      new MutationObserver(function (mutations) {
        forEach.call(mutations, function (mutation) {
          var target = mutation.target,
              attributeName = mutation.attributeName;

          if (target.tagName == "DETAILS" && attributeName == "open") {
            triggerToggle(target);
          }
        });
      }).observe(document.documentElement, {
        attributes: true,
        subtree: true
      });
    } else {
      onTogglingTrigger(function (element) {
        var wasOpen = element.getAttribute("open");
        setTimeout(function () {
          var isOpen = element.getAttribute("open");

          if (wasOpen != isOpen) {
            triggerToggle(element);
          }
        }, 1);
      });
    }
  }

  function polyfillAccessibility() {
    setAccessibilityAttributes(document);

    if (window.MutationObserver) {
      new MutationObserver(function (mutations) {
        forEach.call(mutations, function (mutation) {
          forEach.call(mutation.addedNodes, setAccessibilityAttributes);
        });
      }).observe(document.documentElement, {
        subtree: true,
        childList: true
      });
    } else {
      document.addEventListener("DOMNodeInserted", function (event) {
        setAccessibilityAttributes(event.target);
      });
    }
  }

  function setAccessibilityAttributes(root) {
    findElementsWithTagName(root, "SUMMARY").forEach(function (summary) {
      var details = findClosestElementWithTagName(summary, "DETAILS");
      summary.setAttribute("aria-expanded", details.hasAttribute("open"));
      if (!summary.hasAttribute("tabindex")) summary.setAttribute("tabindex", "0");
      if (!summary.hasAttribute("role")) summary.setAttribute("role", "button");
    });
  }

  function eventIsSignificant(event) {
    return !(event.defaultPrevented || event.ctrlKey || event.metaKey || event.shiftKey || event.target.isContentEditable);
  }

  function onTogglingTrigger(callback) {
    addEventListener("click", function (event) {
      if (eventIsSignificant(event)) {
        if (event.which <= 1) {
          var element = findClosestElementWithTagName(event.target, "SUMMARY");

          if (element && element.parentNode && element.parentNode.tagName == "DETAILS") {
            callback(element.parentNode);
          }
        }
      }
    }, false);
    addEventListener("keydown", function (event) {
      if (eventIsSignificant(event)) {
        if (event.keyCode == 13 || event.keyCode == 32) {
          var element = findClosestElementWithTagName(event.target, "SUMMARY");

          if (element && element.parentNode && element.parentNode.tagName == "DETAILS") {
            callback(element.parentNode);
            event.preventDefault();
          }
        }
      }
    }, false);
  }

  function triggerToggle(element) {
    var event = document.createEvent("Event");
    event.initEvent("toggle", false, false);
    element.dispatchEvent(event);
  }

  function findElementsWithTagName(root, tagName) {
    return (root.tagName == tagName ? [root] : []).concat(typeof root.getElementsByTagName == "function" ? slice.call(root.getElementsByTagName(tagName)) : []);
  }

  function findClosestElementWithTagName(element, tagName) {
    if (typeof element.closest == "function") {
      return element.closest(tagName);
    } else {
      while (element) {
        if (element.tagName == tagName) {
          return element;
        } else {
          element = element.parentNode;
        }
      }
    }
  }
})(); // Modules


'use strict';

(function () {
  var headerNavBtn = document.querySelector('.header__button');
  var headerNav = document.querySelector('.header__nav');

  var getOpenNav = function getOpenNav(link) {
    link.addEventListener('click', function () {
      link.classList.toggle('header__button--active');
      headerNav.classList.toggle('header__nav--inactive');
    });
  };

  getOpenNav(headerNavBtn);
})();

'use strict';

(function () {
  var footerTopBtn = document.querySelector('.footer-top__btn');
  var formPopup = document.querySelector('.form-popup');
  var formPopupExit = document.querySelector('.form-popup__btn-exit');

  var getOpen = function getOpen() {
    formPopup.classList.remove('hidden');
  };

  var getClose = function getClose() {
    formPopup.classList.add('hidden');
  };

  footerTopBtn.addEventListener('click', function () {
    getOpen();
  });
  formPopupExit.addEventListener('click', function () {
    getClose();
  });
  formPopup.addEventListener('click', function (event) {
    if (event.target === this) {
      getClose();
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === "Escape") {
      getClose();
    }
  });
})();

'use strict';

(function () {
  var URL_UPLOAD = 'https://httpbin.org/post';
  var NORMAL_STATUS = 200;

  var upload = function upload(data, onLoad, onError) {
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

'use strict';

(function () {
  var formPopup = document.querySelector('.form-popup');
  var successPopup = document.querySelector('.success-popup');
  var form = document.querySelector('.form-popup form');
  var formBtn = document.querySelector('.form-popup .form-popup__btn');
  var textarea = document.querySelector('.form-popup textarea');
  var input = document.querySelectorAll('.form-popup input');

  var successForm = function successForm() {
    formPopup.classList.add('hidden');
    successPopup.classList.remove('hidden');
    setTimeout(function () {
      return successPopup.classList.add('hidden');
    }, 1000);
  };

  var errorForm = function errorForm() {
    alert('Беда!');
  };

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(form), successForm, errorForm);
  });
  formBtn.addEventListener('click', function () {
    if (!textarea.checkValidity()) {
      textarea.classList.add('invalid');
    }

    input.forEach(function (item) {
      if (!item.checkValidity()) {
        item.classList.add('invalid');
      }
    });
  });
  textarea.addEventListener('input', function () {
    if (!textarea.checkValidity()) {
      textarea.classList.add('invalid');
    } else {
      textarea.classList.remove('invalid');
    }
  });
  input.forEach(function (item) {
    item.addEventListener('input', function () {
      if (!this.checkValidity()) {
        this.classList.add('invalid');
      } else {
        this.classList.remove('invalid');
      }
    });
  });
})();