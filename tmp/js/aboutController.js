var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define([], function() {
  /**
  # Класс обеспечивает работу страницы о проекте
  # 
  # @class abstractController
  */

  var abstractController;
  abstractController = (function() {
    /**
    # Конструктор выполняет инициализацию страницы о проекте и создает обработчики событий
    # 
    # @constructor
    */

    function abstractController() {
      this.changeTranslationURL = __bind(this.changeTranslationURL, this);
      this.resizeTextarea = __bind(this.resizeTextarea, this);
      this.delayedResize = __bind(this.delayedResize, this);
      var input, inputElements, _i, _len;
      this.contactForm = document.querySelector(".contact-us");
      inputElements = this.contactForm.querySelectorAll("input, textarea");
      this.textarea = this.contactForm.querySelector("textarea");
      this.textarea.addEventListener("keydown", this.delayedResize);
      this.textarea.addEventListener("cut", this.delayedResize);
      this.textarea.addEventListener("paste", this.delayedResize);
      this.textarea.addEventListener("drop", this.delayedResize);
      this.textarea.addEventListener("change", this.resizeTextarea);
      for (_i = 0, _len = inputElements.length; _i < _len; _i++) {
        input = inputElements[_i];
        input.addEventListener("keyup", this.changeTranslationURL);
      }
    }

    /**
    # Изменяем высоту textarea что бы всегда вмещать текст
    #
    */


    abstractController.prototype.delayedResize = function() {
      var _this = this;
      return window.setTimeout(function() {
        return _this.resizeTextarea();
      }, 0);
    };

    abstractController.prototype.resizeTextarea = function() {
      this.textarea.style.height = '1px';
      return this.textarea.style.height = this.textarea.scrollHeight + 'px';
    };

    /**
    # Показать подсказку, если в поле что то введено и не видно placeholder
    #
    */


    abstractController.prototype.changeTranslationURL = function(event) {
      var input;
      input = event.currentTarget;
      if (input.value.trim().length > 0) {
        return input.classList.add("non-empty");
      } else {
        return input.classList.remove("non-empty");
      }
    };

    return abstractController;

  })();
  return abstractController;
});

/*
//@ sourceMappingURL=aboutController.js.map
*/