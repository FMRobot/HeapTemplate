var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define(['moment'], function(moment) {
  /**
  # Класс обеспечивает работу Календаря
  # 
  # @class calendarController
  */

  var calendarController;
  calendarController = (function() {
    /**
    # Конструктор выполняет инициализацию Календаря, создает его разметку и обработчики событий
    # 
    # @constructor
    */

    function calendarController(date, format, callbackFunction, lang) {
      if (date == null) {
        date = null;
      }
      if (format == null) {
        format = null;
      }
      if (callbackFunction == null) {
        callbackFunction = null;
      }
      if (lang == null) {
        lang = 'ru';
      }
      this.prevMonth = __bind(this.prevMonth, this);
      this.nextMonth = __bind(this.nextMonth, this);
      this.generateMonth = __bind(this.generateMonth, this);
      this.selectDay = __bind(this.selectDay, this);
      this.insertBefore = __bind(this.insertBefore, this);
      this.insertAfter = __bind(this.insertAfter, this);
      this.appendTo = __bind(this.appendTo, this);
      this.registerCallback = __bind(this.registerCallback, this);
      this.close = __bind(this.close, this);
      this.closeCalendar = __bind(this.closeCalendar, this);
      moment.lang(lang);
      if (date === null) {
        this.moment = moment();
      } else {
        this.moment = moment(date, format);
      }
      this.callbackFunction = callbackFunction;
      this.calendar = document.getElementById('calendar-template').content.cloneNode(true);
      this.next = this.calendar.querySelector('.next-month');
      this.prev = this.calendar.querySelector('.prev-month');
      this.closeButton = this.calendar.querySelector('.close');
      this.next.addEventListener("click", this.nextMonth);
      this.prev.addEventListener("click", this.prevMonth);
      this.closeButton.addEventListener("click", this.closeCalendar);
      this.generateMonth();
    }

    /**
    # Закрыть календарь и передать дату, без изменений
    #
    */


    calendarController.prototype.closeCalendar = function(event) {
      if (this.callbackFunction !== null) {
        this.callbackFunction.call(this, null);
      }
      return this.calendar.parentNode.removeChild(this.calendar);
    };

    /**
    # Закрыть календарь и передать дату в функцию каллбек
    #
    */


    calendarController.prototype.close = function() {
      if (this.callbackFunction !== null) {
        this.callbackFunction.call(this, this.moment);
      }
      return this.calendar.parentNode.removeChild(this.calendar);
    };

    /**
    # Зарегистрировать фунцию callback
    #
    */


    calendarController.prototype.registerCallback = function(callbackFunction) {
      return this.callbackFunction = callbackFunction;
    };

    /**
    # Добавить календарь в качестве последнего ребенка элемента DOM
    #
    */


    calendarController.prototype.appendTo = function(element) {
      element.appendChild(this.calendar);
      return this.calendar = element.lastChild;
    };

    /**
    # Добавить календарь в DOM после элемента
    #
    */


    calendarController.prototype.insertAfter = function(element) {
      if (element.nextSibling !== null) {
        element.parentNode.insertBefore(this.calendar, element.nextSibling);
        return this.calendar = element.nextSibling;
      } else {
        return this.appendTo(element.parentNode);
      }
    };

    /**
    # Добавить календарь в DOM перед элементом
    #
    */


    calendarController.prototype.insertBefore = function(element) {
      element.parentNode.insertBefore(this.calendar, element);
      return this.calendar = element.previousSibling;
    };

    /**
    # Выбор дня в календаре
    #
    */


    calendarController.prototype.selectDay = function(event) {
      var day;
      day = event.currentTarget;
      this.moment = moment(day.getAttribute('data-date'), "YYYY-MM-DD");
      this.calendar.querySelector('.today').classList.remove('today');
      day.classList.add('today');
      return this.close();
    };

    /**
    # Сгенерировать дни месяца и добавить в календарь
    #
    */


    calendarController.prototype.generateMonth = function() {
      var day, days, days_count, i, moment_day, _i;
      this.calendar.querySelector('.month').innerHTML = this.moment.format('MMMM YYYY');
      days = this.calendar.querySelector('.days');
      days.parentNode.removeChild(days);
      days = document.createElement("DIV");
      days.className = "days";
      days_count = this.moment.daysInMonth();
      for (i = _i = 1; 1 <= days_count ? _i <= days_count : _i >= days_count; i = 1 <= days_count ? ++_i : --_i) {
        moment_day = moment(this.moment.format("YYYY") + "-" + this.moment.format("MM") + "-" + i, "YYYY-MM-D");
        day = document.createElement('DIV');
        day.className = 'day';
        day.setAttribute("data-date", moment_day.format("YYYY-MM-DD"));
        day.addEventListener("click", this.selectDay);
        if (moment_day.isSame(this.moment, 'day')) {
          day.classList.add('today');
        }
        day.appendChild(document.createTextNode(i));
        days.appendChild(day);
      }
      return this.calendar.querySelector('header').parentNode.appendChild(days);
    };

    /**
    # Показать в календаре следующий месяц
    #
    */


    calendarController.prototype.nextMonth = function(event) {
      this.moment.add('months', 1);
      return this.generateMonth();
    };

    /**
    # Показать в календаре предидущий месяц
    #
    */


    calendarController.prototype.prevMonth = function(event) {
      this.moment.subtract('months', 1);
      return this.generateMonth();
    };

    return calendarController;

  })();
  return calendarController;
});

/*
//@ sourceMappingURL=calendarController.js.map
*/