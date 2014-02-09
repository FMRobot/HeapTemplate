var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

define(['donateController'], function(donateController) {
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
      this.testEmail = __bind(this.testEmail, this);
      this.testContacts = __bind(this.testContacts, this);
      this.hideErr = __bind(this.hideErr, this);
      this.sendMessage = __bind(this.sendMessage, this);
      var donateForm, input, inputElements, template, _i, _j, _len, _len1, _ref;
      if (__indexOf.call(document.createElement("template"), "content") < 0) {
        _ref = document.querySelectorAll("template");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          template = _ref[_i];
          template.content = template.childNodes[0];
        }
      }
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
      for (_j = 0, _len1 = inputElements.length; _j < _len1; _j++) {
        input = inputElements[_j];
        input.addEventListener("keyup", this.changeTranslationURL);
      }
      donateForm = new donateController();
      donateForm.setDefault(40);
      donateForm.insertAfter(document.getElementById("donate"));
    }

    /**
    # Сообщение редакции
    #
    */


    abstractController.prototype.sendMessage = function(event) {
      event.preventDefault();
      if (!this.testContacts()) {
        return;
      }
      if (!this.testEmail()) {
        return;
      }
      return this.button.classList.add("loading");
    };

    abstractController.prototype.hideErr = function() {
      this.contactForm.classList.remove("email-err");
      return this.contactForm.classList.remove("contact-err");
    };

    abstractController.prototype.testContacts = function() {
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

    abstractController.prototype.testEmail = function() {
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


    abstractController.prototype.delayedResize = function() {
      var _this = this;
      return window.setTimeout(function() {
        return _this.resizeTextarea();
      }, 0);
    };

    abstractController.prototype.resizeTextarea = function() {
      this.textarea.style.height = '0';
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