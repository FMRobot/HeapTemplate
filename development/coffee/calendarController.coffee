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
    constructor: (date=null, format=null, callbackFunction=null, lang='ru')->
      
      moment.lang(lang);
      
      if date == null
        @moment = moment()
      else
        @moment = moment date, format

      @callbackFunction = callbackFunction

      @calendar = document.getElementById('calendar-template').content.cloneNode true
      @next = @calendar.querySelector '.next-month'
      @prev = @calendar.querySelector '.prev-month'
      @closeButton = @calendar.querySelector '.close'

      @next.addEventListener "click", @nextMonth
      @prev.addEventListener "click", @prevMonth
      @closeButton.addEventListener "click", @closeCalendar
      @generateMonth()

    ###*
    # Закрыть календарь и передать дату, без изменений
    # 
    ###
    closeCalendar: (event)=>
      if @callbackFunction != null
        @callbackFunction.call @, null
      @calendar.parentNode.removeChild @calendar

    ###*
    # Закрыть календарь и передать дату в функцию каллбек
    # 
    ###
    close: ()=>
      if @callbackFunction != null
        @callbackFunction.call @, @moment
      @calendar.parentNode.removeChild @calendar


    ###*
    # Зарегистрировать фунцию callback
    # 
    ###
    registerCallback: (callbackFunction)=>
      @callbackFunction = callbackFunction


    ###*
    # Добавить календарь в качестве последнего ребенка элемента DOM
    # 
    ###
    appendTo: (element)=>
      element.appendChild @calendar
      @calendar = element.lastChild

    ###*
    # Добавить календарь в DOM после элемента
    # 
    ###
    insertAfter: (element)=>
      if element.nextSibling != null
        element.parentNode.insertBefore @calendar, element.nextSibling
        @calendar = element.nextSibling
      else

        @appendTo element.parentNode
      

    ###*
    # Добавить календарь в DOM перед элементом
    # 
    ###
    insertBefore: (element)=>
      element.parentNode.insertBefore @calendar, element
      @calendar = element.previousSibling


    ###*
    # Выбор дня в календаре
    # 
    ###
    selectDay: (event)=>
      day = event.currentTarget
      @moment = moment(day.getAttribute('data-date'), "YYYY-MM-DD")
      @calendar.querySelector('.today').classList.remove 'today'
      day.classList.add 'today'
      @close()


    ###*
    # Сгенерировать дни месяца и добавить в календарь
    # 
    ###
    generateMonth: ()=>

      @calendar.querySelector('.month').innerHTML = @moment.format 'MMMM YYYY'      

      days = @calendar.querySelector '.days'
      days.parentNode.removeChild days

      days = document.createElement("DIV")
      days.className = "days"

      days_count = @moment.daysInMonth()
      for i in [1 .. days_count]
        moment_day = moment(@moment.format("YYYY")+"-"+@moment.format("MM")+"-"+i, "YYYY-MM-D");
        day = document.createElement 'DIV'
        day.className = 'day'
        day.setAttribute "data-date", moment_day.format("YYYY-MM-DD")
        day.addEventListener "click", @selectDay
        
        if moment_day.isSame(@moment, 'day')
          day.classList.add 'today'

        day.appendChild document.createTextNode i
        days.appendChild day 

      @calendar.querySelector('header').parentNode.appendChild days


    ###*
    # Показать в календаре следующий месяц
    # 
    ###
    nextMonth: (event)=>
      @moment.add 'months', 1
      @generateMonth()


    ###*
    # Показать в календаре предидущий месяц
    # 
    ###
    prevMonth: (event)=>
      @moment.subtract 'months', 1
      @generateMonth()


  return calendarController


