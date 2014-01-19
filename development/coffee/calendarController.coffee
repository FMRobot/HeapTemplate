define ['moment'], (moment) ->
  ###*
  # Класс обеспечивает работу Календаря
  # 
  # @class calendarController
  ###
  class calendarController

    ###*
    # Конструктор выполняет инициализацию Календаря, создает его разметку и обработчики событий
    # 
    # @constructor
    ###
    constructor: (date=null)->

      if date == null
        @moment = moment()
      else
        @moment = moment date, "YYYY-MM-DD"

      # @calendar = document.getElementById('calendar-template').content.cloneNode true
      @calendar =  document.importNode document.getElementById('calendar-template').content, true
      @next = @calendar.querySelector '.next-month'
      @prev = @calendar.querySelector '.prev-month'

      @next.addEventListener "click", @nextMonth
      @prev.addEventListener "click", @prevMonth
      @generateMonth()

    appendTo: (element)=>
      @calendar = element.appendChild @calendar


    generateMonth: ()=>
      console.dir @calendar
      console.log @calendar, @calendar.querySelector('.month')

      @calendar.querySelector('.month').innerHTML = @moment.format 'MMMM YYYY'      

      days = document.createElement("DIV")
      days.className = "days"

      days_count = @moment.daysInMonth()
      for i in [1 .. days_count]
        moment_day = moment(@moment.format("YYYY")+"-"+@moment.format("MM")+"-"+i, "YYYY-MM-D");
        day = document.createElement 'DIV'
        day.className = 'day'
        day.setAttribute "data-date", moment_day.format("YYYY-MM-DD")
        
        if moment_day.isSame(@moment, 'day')
          day.classList.add 'today'

        day.appendChild document.createTextNode i
        days.appendChild day 

      @calendar.querySelector('header').parentNode.appendChild days



    nextMonth: (event)=>
      @moment.add 'months', 1
      @generateMonth()

    prevMonth: (event)=>
      @moment.subtract 'months', 1
      @generateMonth()


  return calendarController


