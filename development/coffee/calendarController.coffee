define ['moment-with-langs.min'], (momentjs) ->
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
    constructor: ->
      console.log 'calendar costructor'

  return calendarController