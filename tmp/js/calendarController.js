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

    function calendarController(date) {
      if (date == null) {
        date = null;
      }
      this.prevMonth = __bind(this.prevMonth, this);
      this.nextMonth = __bind(this.nextMonth, this);
      this.generateMonth = __bind(this.generateMonth, this);
      this.appendTo = __bind(this.appendTo, this);
      if (date === null) {
        this.moment = moment();
      } else {
        this.moment = moment(date, "YYYY-MM-DD");
      }
      this.calendar = document.importNode(document.getElementById('calendar-template').content, true);
      this.next = this.calendar.querySelector('.next-month');
      this.prev = this.calendar.querySelector('.prev-month');
      this.next.addEventListener("click", this.nextMonth);
      this.prev.addEventListener("click", this.prevMonth);
      this.generateMonth();
    }

    calendarController.prototype.appendTo = function(element) {
      return this.calendar = element.appendChild(this.calendar);
    };

    calendarController.prototype.generateMonth = function() {
      var day, days, days_count, i, moment_day, _i;
      console.dir(this.calendar);
      console.log(this.calendar, this.calendar.querySelector('.month'));
      this.calendar.querySelector('.month').innerHTML = this.moment.format('MMMM YYYY');
      days = document.createElement("DIV");
      days.className = "days";
      days_count = this.moment.daysInMonth();
      for (i = _i = 1; 1 <= days_count ? _i <= days_count : _i >= days_count; i = 1 <= days_count ? ++_i : --_i) {
        moment_day = moment(this.moment.format("YYYY") + "-" + this.moment.format("MM") + "-" + i, "YYYY-MM-D");
        day = document.createElement('DIV');
        day.className = 'day';
        day.setAttribute("data-date", moment_day.format("YYYY-MM-DD"));
        if (moment_day.isSame(this.moment, 'day')) {
          day.classList.add('today');
        }
        day.appendChild(document.createTextNode(i));
        days.appendChild(day);
      }
      return this.calendar.querySelector('header').parentNode.appendChild(days);
    };

    calendarController.prototype.nextMonth = function(event) {
      this.moment.add('months', 1);
      return this.generateMonth();
    };

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