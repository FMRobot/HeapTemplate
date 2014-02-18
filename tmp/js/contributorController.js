var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define(['highlight.pack'], function(hljs) {
  /**
  # Класс обеспечивает работу страницы о проекте для авторов и переводчиков
  # 
  # @class contributorController
  */

  var contributorController;
  contributorController = (function() {
    /**
    # Конструктор выполняет инициализацию страницы о проекте для авторов и переводчиков и создает обработчики событий
    # 
    # @constructor
    */

    function contributorController() {
      this.changeTranslationURL = __bind(this.changeTranslationURL, this);
      this.resizeTextarea = __bind(this.resizeTextarea, this);
      this.delayedResize = __bind(this.delayedResize, this);
      this.testEmail = __bind(this.testEmail, this);
      this.testContacts = __bind(this.testContacts, this);
      this.hideErr = __bind(this.hideErr, this);
      this.sendMessage = __bind(this.sendMessage, this);
      var code, element, input, inputElements, _i, _j, _len, _len1;
      this.re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      this.contactForm = document.querySelector(".contact-us");
      inputElements = this.contactForm.querySelectorAll("input, textarea");
      this.textarea = this.contactForm.querySelector("textarea");
      this.email = this.contactForm.querySelector("[name='email']");
      this.skype = this.contactForm.querySelector("[name='skype']");
      this.button = this.contactForm.querySelector("button");
      this.contactForm.addEventListener("submit", this.sendMessage);
      this.email.addEventListener("change", this.testEmail);
      this.email.addEventListener("change", this.testContacts);
      this.skype.addEventListener("change", this.testContacts);
      this.textarea.addEventListener("keydown", this.delayedResize);
      this.textarea.addEventListener("cut", this.delayedResize);
      this.textarea.addEventListener("paste", this.delayedResize);
      this.textarea.addEventListener("drop", this.delayedResize);
      this.textarea.addEventListener("change", this.resizeTextarea);
      for (_i = 0, _len = inputElements.length; _i < _len; _i++) {
        input = inputElements[_i];
        input.addEventListener("keyup", this.changeTranslationURL);
      }
      code = document.querySelectorAll("pre code");
      for (_j = 0, _len1 = code.length; _j < _len1; _j++) {
        element = code[_j];
        hljs.highlightBlock(element);
      }
    }

    /**
    # Сообщение редакции
    #
    */


    contributorController.prototype.sendMessage = function(event) {
      event.preventDefault();
      if (!this.testContacts()) {
        return;
      }
      if (!this.testEmail()) {
        return;
      }
      return this.button.classList.add("loading");
    };

    contributorController.prototype.hideErr = function() {
      this.contactForm.classList.remove("email-err");
      return this.contactForm.classList.remove("contact-err");
    };

    contributorController.prototype.testContacts = function() {
      var _this = this;
      if (this.email.value.trim().length === 0 && this.skype.value.trim().length === 0) {
        this.contactForm.classList.add("contact-err");
        this.contactForm.classList.remove("email-err");
        window.setTimeout(function() {
          return _this.hideErr();
        }, 5000);
        return false;
      }
      this.contactForm.classList.remove("contact-err");
      return true;
    };

    contributorController.prototype.testEmail = function() {
      var _this = this;
      if (this.email.value.trim().length > 0 && !this.re.test(this.email.value.trim())) {
        this.contactForm.classList.add("email-err");
        this.contactForm.classList.remove("contact-err");
        window.setTimeout(function() {
          return _this.hideErr();
        }, 5000);
        return false;
      }
      this.contactForm.classList.remove("email-err");
      return true;
    };

    /**
    # Изменяем высоту textarea что бы всегда вмещать текст
    #
    */


    contributorController.prototype.delayedResize = function() {
      var _this = this;
      return window.setTimeout(function() {
        return _this.resizeTextarea();
      }, 0);
    };

    contributorController.prototype.resizeTextarea = function() {
      this.textarea.style.height = '0';
      return this.textarea.style.height = this.textarea.scrollHeight + 'px';
    };

    /**
    # Показать подсказку, если в поле что то введено и не видно placeholder
    #
    */


    contributorController.prototype.changeTranslationURL = function(event) {
      var input;
      input = event.currentTarget;
      if (input.value.trim().length > 0) {
        return input.classList.add("non-empty");
      } else {
        return input.classList.remove("non-empty");
      }
    };

    return contributorController;

  })();
  return contributorController;
});

/*
//@ sourceMappingURL=contributorController.js.map
*/