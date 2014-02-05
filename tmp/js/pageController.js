var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

define(['MutationObserver-polyfil'], function() {
  /**
  # Класс обеспечивает работу пагинатора
  # 
  # @class pageController
  */

  var pageController;
  pageController = (function() {
    /**
    # Конструктор выполняет инициализацию пагинатора и обработчиков событий
    # 
    # @constructor
    */

    function pageController() {
      this.keyDown = __bind(this.keyDown, this);
      this.getFromText = __bind(this.getFromText, this);
      this.keyUp = __bind(this.keyUp, this);
      this.ifDash = __bind(this.ifDash, this);
      this.setPage = __bind(this.setPage, this);
      this.savePageValue = __bind(this.savePageValue, this);
      this.registerCallback = __bind(this.registerCallback, this);
      this.getPages = __bind(this.getPages, this);
      this.showPages = __bind(this.showPages, this);
      this.addPage = __bind(this.addPage, this);
      this.enter = 13;
      this.esc = 27;
      this.dash = 189;
      this.ctrl = 17;
      this.cmd = 91;
      this.shift = 16;
      this.alt = 18;
      this.space = 32;
      this.chars = [this.dash, this.space];
      this.r = 82;
      this.numbers = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57];
      this.controls = [8, 9, 45, 46, 39, 37, this.esc, this.ctrl, this.alt, this.shift, this.enter, this.cmd];
      this.f_dash = '‒';
      this.en_dash = '–';
      this.em_dash = '—';
      this.h_bar = '―';
      this.s_dash = '⁓';
      this.hyphen = '‐';
      this.mhyphen = '-';
      this.dashes = [this.f_dash, this.en_dash, this.em_dash, this.h_bar, this.s_dash, this.hyphen, this.mhyphen];
      this.nbsp = ' ';
      this.mnbsp = "&nbsp;";
      this.space = ' ';
      this.tspace = ' ';
      this.hspace = ' ';
      this.controlsPressed = [];
      this.paginator = document.querySelector(".paginator");
      this.paginatorCurrent = this.paginator.querySelector(".current");
      this.paginatorCurrent.addEventListener("keydown", this.keyDown);
      this.paginatorCurrent.addEventListener("keyup", this.keyUp);
      this.paginatorCurrent.addEventListener("focus", this.savePageValue);
      this.paginatorCurrent.addEventListener("blur", this.setPage);
      this.paginatorTotal = parseInt(this.paginator.querySelector(".total").innerHTML, 10);
    }

    /**
    # Догрузить 1 страничку
    #
    */


    pageController.prototype.addPage = function() {
      var value;
      value = this.getFromText(this.paginatorCurrent.innerHTML);
      if (typeof value === "number") {
        this.paginatorCurrent.innerHTML = value + this.hspace + this.en_dash + this.hspace + (value + 1);
      } else {
        this.paginatorCurrent.innerHTML = value[0] + this.hspace + this.en_dash + this.hspace + (value[1] + 1);
      }
      if (this.callbackFunction !== null) {
        return this.callbackFunction.call(this);
      }
    };

    /**
    # Показать странички с по
    #
    */


    pageController.prototype.showPages = function(from, to) {
      from = parseInt(from, 10);
      to = parseInt(to, 10);
      if (!isNaN(from) || !isNaN(to)) {
        return;
      }
      this.paginatorCurrent.innerHTML = from + this.hspace + this.en_dash + this.hspace + to;
      if (this.callbackFunction !== null) {
        return this.callbackFunction.call(this);
      }
    };

    /**
    # Получить текущие странички
    #
    */


    pageController.prototype.getPages = function() {
      return this.getFromText(this.paginatorCurrent.innerHTML);
    };

    /**
    # Зарегистрировать коллбек
    #
    */


    pageController.prototype.registerCallback = function(callbackFunction) {
      return this.callbackFunction = callbackFunction;
    };

    /**
    # Запомнить текущее
    #
    */


    pageController.prototype.savePageValue = function(event) {
      return this.paginatorCurrent.setAttribute("data-pages", this.paginatorCurrent.innerHTML);
    };

    /**
    # Установить страничку
    #
    */


    pageController.prototype.setPage = function(event) {
      var value;
      value = this.getFromText(this.paginatorCurrent.innerHTML);
      if (typeof value === "number") {
        this.paginatorCurrent.innerHTML = value;
      } else {
        this.paginatorCurrent.innerHTML = value[0] + this.hspace + this.en_dash + this.hspace + value[1];
      }
      if (this.callbackFunction !== null) {
        return this.callbackFunction.call(this);
      }
    };

    /**
    # А есть ли дефис в поле
    #
    */


    pageController.prototype.ifDash = function() {
      var dash, _i, _len, _ref;
      _ref = this.dashes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        dash = _ref[_i];
        if (this.paginatorCurrent.innerHTML.indexOf(dash) > -1) {
          return true;
        }
      }
      return false;
    };

    /**
    # Кнопку отпустили
    #
    */


    pageController.prototype.keyUp = function(event) {
      var index;
      index = this.controlsPressed.indexOf(event.which);
      if (index > -1) {
        return this.controlsPressed.splice(index, 1);
      }
    };

    /**
    # Получить номера страниц из текста
    #
    */


    pageController.prototype.getFromText = function(value) {
      var dash_unity, dashes, space_unity, spaces;
      spaces = "[" + this.mnbsp + this.nbsp + this.space + this.tspace + this.hspace + "\s]";
      space_unity = new RegExp(spaces, "ig");
      value = value.replace(space_unity, '');
      dashes = "[" + this.mhyphen + this.f_dash + this.en_dash + this.em_dash + this.h_bar + this.s_dash + this.hyphen + "]";
      dash_unity = new RegExp(dashes, "ig");
      value = value.replace(dash_unity, this.en_dash);
      value = value.replace("/[^\d\\" + this.en_dash + "]/ig", '');
      value = value.split(this.en_dash);
      if (value.length > 1) {
        value[0] = parseInt(value[0], 10);
        value[1] = parseInt(value[1], 10);
        if (isNaN(value[0]) || value[0] < 1) {
          value[0] = 1;
        }
        if (isNaN(value[1]) || value[1] > this.paginatorTotal) {
          value[1] = this.paginatorTotal;
        }
        if (value[0] > value[1]) {
          value[1] += value[0];
          value[0] = value[1] - value[0];
          value[1] = value[1] - value[0];
          if (value[0] < 1) {
            value[0] = 1;
          }
          if (value[1] > this.paginatorTotal) {
            value[1] = this.paginatorTotal;
          }
        }
        if (value[0] === value[1]) {
          return value[0];
        } else {
          return value;
        }
      } else {
        value = parseInt(value[0], 10);
        if (isNaN(value) || value < 1 || value > this.paginatorTotal) {
          value = 1;
        }
        return value;
      }
    };

    /**
    # Блокируем запретные кнопки
    #
    */


    pageController.prototype.keyDown = function(event) {
      var index, isAlt, isCmd, isCtrl, isShift, _ref, _ref1, _ref2, _ref3, _ref4;
      if ((_ref = event.which, __indexOf.call(this.controls, _ref) < 0) && (_ref1 = event.which, __indexOf.call(this.numbers, _ref1) < 0) && (_ref2 = event.which, __indexOf.call(this.chars, _ref2) < 0) && event.which !== this.r) {
        event.preventDefault();
      }
      if ((_ref3 = event.which, __indexOf.call(this.controls, _ref3) >= 0) && this.controlsPressed.indexOf(event.which) < 0) {
        this.controlsPressed.push(event.which);
      }
      switch (event.which) {
        case this.r:
          isCmd = this.controlsPressed.indexOf(this.cmd) > -1;
          isCtrl = this.controlsPressed.indexOf(this.ctrl) > -1;
          if (!isCmd && !isCtrl) {
            event.preventDefault();
          }
          break;
        case this.dash:
          if (this.ifDash()) {
            event.preventDefault();
          }
          if (this.controlsPressed.length > 0) {
            isAlt = this.controlsPressed.indexOf(this.alt) > -1;
            isShift = this.controlsPressed.indexOf(this.shift) > -1;
            if (isShift && !isAlt) {
              event.preventDefault();
            }
          }
          break;
        case this.enter:
          event.preventDefault();
          this.setPage();
          this.paginatorCurrent.blur();
          index = this.controlsPressed.indexOf(event.which);
          if (index > -1) {
            this.controlsPressed.splice(index, 1);
          }
          break;
        case this.esc:
          event.preventDefault();
          this.paginatorCurrent.innerHTML = this.paginatorCurrent.getAttribute("data-pages");
          this.paginatorCurrent.blur();
      }
      if ((this.paginatorCurrent.innerHTML.length > 8 || this.controlsPressed.length > 0) && (_ref4 = event.which, __indexOf.call(this.numbers, _ref4) >= 0)) {
        return event.preventDefault();
      }
    };

    return pageController;

  })();
  return pageController;
});

/*
//@ sourceMappingURL=pageController.js.map
*/