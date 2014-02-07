var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

define(['MutationObserver-polyfil'], function() {
  /**
  # Класс обеспечивает работу формы пожертвований
  # 
  # @class donateController
  */

  var donateController;
  donateController = (function() {
    /**
    # Конструктор выполняет инициализацию донейта и обработчиков событий
    # 
    # @constructor
    */

    function donateController() {
      this.keyDown = __bind(this.keyDown, this);
      this.setAmount = __bind(this.setAmount, this);
      this.registerCallback = __bind(this.registerCallback, this);
      this.keyUp = __bind(this.keyUp, this);
      this.getAmount = __bind(this.getAmount, this);
      this.getFromText = __bind(this.getFromText, this);
      this.pseudoLabel = __bind(this.pseudoLabel, this);
      this.insertBefore = __bind(this.insertBefore, this);
      this.insertAfter = __bind(this.insertAfter, this);
      this.appendTo = __bind(this.appendTo, this);
      this.demo = __bind(this.demo, this);
      this.toggleSource = __bind(this.toggleSource, this);
      this.closeForm = __bind(this.closeForm, this);
      this.enter = 13;
      this.esc = 27;
      this.dash = 189;
      this.ctrl = 17;
      this.cmd = 91;
      this.shift = 16;
      this.alt = 18;
      this.space = 32;
      this.r = 82;
      this.numbers = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57];
      this.controls = [8, 9, 45, 46, 39, 37, this.esc, this.ctrl, this.alt, this.shift, this.enter, this.cmd];
      this.controlsPressed = [];
      this.donate = document.getElementById('donate-template').content.cloneNode(true);
      this.donateLabel = this.donate.querySelector(".label");
      this.donateAmount = this.donate.querySelector(".amount_due");
      this.donateSource = this.donate.querySelector(".money_source");
      this.deny = this.donate.querySelector(".deny");
      this.donateAmount.addEventListener("keydown", this.keyDown);
      this.donateAmount.addEventListener("keyup", this.savePageValue);
      this.donateAmount.addEventListener("focus", this.savePageValue);
      this.donateAmount.addEventListener("blur", this.setAmount);
      this.donateLabel.addEventListener("click", this.pseudoLabel);
      this.deny.addEventListener("click", this.closeForm);
      this.wallet = true;
      this.card = false;
      this.donateSource.addEventListener("click", this.toggleSource);
    }

    /**
    # Закрываем форму
    #
    */


    donateController.prototype.closeForm = function(event) {
      return this.donate.parentNode.removeChild(this.donate);
    };

    /**
    # Выбираем источник пожертвований
    #
    */


    donateController.prototype.toggleSource = function() {
      this.donateSource.classList.toggle("wallet");
      this.wallet = !this.wallet;
      return this.card = !this.card;
    };

    /**
    # Демонстрируем работу триггера, если пользователь открыл форму первый раз
    #
    */


    donateController.prototype.demo = function() {
      var _this = this;
      if (window.localStorage.getItem('first_time') === null) {
        window.setTimeout(function() {
          return _this.toggleSource();
        }, 300);
        window.setTimeout(function() {
          return _this.toggleSource();
        }, 1100);
        return window.localStorage.setItem('first_time', false);
      }
    };

    /**
    # Добавить форму пожертвований в качестве последнего ребенка элемента DOM
    #
    */


    donateController.prototype.appendTo = function(element) {
      element.appendChild(this.donate);
      this.donate = element.lastChild;
      return this.demo();
    };

    /**
    # Добавить форму пожертвований в DOM после элемента
    #
    */


    donateController.prototype.insertAfter = function(element) {
      if (element.nextSibling !== null) {
        element.parentNode.insertBefore(this.donate, element.nextSibling);
        return this.donate = element.nextSibling;
      } else {
        return this.appendTo(element.parentNode);
      }
    };

    /**
    # Добавить форму пожертвований в DOM перед элементом
    #
    */


    donateController.prototype.insertBefore = function(element) {
      element.parentNode.insertBefore(this.donate, element);
      return this.donate = element.previousSibling;
    };

    /**
    # Передать фокус полю ввода
    #
    */


    donateController.prototype.pseudoLabel = function(event) {
      return this.donateAmount.focus();
    };

    /**
    # Получить размер пожертвования из текста
    #
    */


    donateController.prototype.getFromText = function(value) {
      value = value.replace("/[^\d]/ig", '');
      value = parseInt(value, 10);
      if (isNaN(value) || value < 1) {
        value = 1;
      }
      return value;
    };

    /**
    # Получить текущий размер пожертвования
    #
    */


    donateController.prototype.getAmount = function() {
      return this.getFromText(this.donateAmount.innerHTML);
    };

    /**
    # Кнопку отпустили
    #
    */


    donateController.prototype.keyUp = function(event) {
      var index;
      index = this.controlsPressed.indexOf(event.which);
      if (index > -1) {
        return this.controlsPressed.splice(index, 1);
      }
    };

    /**
    # Зарегистрировать коллбек
    #
    */


    donateController.prototype.registerCallback = function(callbackFunction) {
      return this.callbackFunction = callbackFunction;
    };

    /**
    # Установить размер пожертвования
    #
    */


    donateController.prototype.setAmount = function(event) {
      this.controlsPressed = [];
      this.donateAmount.innerHTML = this.getFromText(this.donateAmount.innerHTML);
      if (typeof this.callbackFunction === "function") {
        return this.callbackFunction.call(this);
      }
    };

    /**
    # Блокируем запретные кнопки
    #
    */


    donateController.prototype.keyDown = function(event) {
      var index, isCmd, isCtrl, _ref, _ref1, _ref2, _ref3;
      if ((_ref = event.which, __indexOf.call(this.controls, _ref) < 0) && (_ref1 = event.which, __indexOf.call(this.numbers, _ref1) < 0) && event.which !== this.r) {
        event.preventDefault();
      }
      if ((_ref2 = event.which, __indexOf.call(this.controls, _ref2) >= 0) && this.controlsPressed.indexOf(event.which) < 0) {
        this.controlsPressed.push(event.which);
      }
      if ((_ref3 = event.which, __indexOf.call(this.numbers, _ref3) >= 0) && ((this.controlsPressed.indexOf(this.shift) > -1) || (this.donateAmount.innerHTML.length > 4))) {
        event.preventDefault();
        return;
      }
      switch (event.which) {
        case this.r:
          isCmd = this.controlsPressed.indexOf(this.cmd) > -1;
          isCtrl = this.controlsPressed.indexOf(this.ctrl) > -1;
          if (!isCmd && !isCtrl) {
            return event.preventDefault();
          }
          break;
        case this.enter:
          event.preventDefault();
          this.setAmount();
          this.donateAmount.blur();
          index = this.controlsPressed.indexOf(event.which);
          if (index > -1) {
            return this.controlsPressed.splice(index, 1);
          }
          break;
        case this.esc:
          event.preventDefault();
          this.donateAmount.innerHTML = this.donateAmount.getAttribute("data-pages");
          return this.donateAmount.blur();
      }
    };

    return donateController;

  })();
  return donateController;
});

/*
//@ sourceMappingURL=donateController.js.map
*/