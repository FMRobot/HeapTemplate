define ['MutationObserver-polyfil'], ->
  ###*
  # Класс обеспечивает работу формы пожертвований
  # 
  # @class donateController
  ###
  class donateController

    ###*
    # Конструктор выполняет инициализацию донейта и обработчиков событий
    # 
    # @constructor
    ###
    constructor: ->
      @enter = 13
      @esc = 27
      @dash = 189
      @ctrl = 17
      @cmd = 91
      @shift = 16
      @alt = 18
      @space = 32
      @r = 82
      @numbers = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57]
      @controls = [8, 9, 45, 46, 39, 37, @esc, @ctrl, @alt, @shift, @enter, @cmd]

      @controlsPressed = []

      @donate = document.getElementById('donate-template').content.cloneNode true

      @donateLabel = @donate.querySelector ".label"
      @donateAmount = @donate.querySelector ".amount_due"
      @donateSource = @donate.querySelector ".money_source"

      @deny = @donate.querySelector ".deny"

      @donateAmount.addEventListener "keydown", @keyDown
      @donateAmount.addEventListener "keyup", @savePageValue
      @donateAmount.addEventListener "focus", @savePageValue
      @donateAmount.addEventListener "blur", @setAmount

      @donateLabel.addEventListener "click", @pseudoLabel

      @deny.addEventListener "click", @closeForm

      @wallet = true
      @card = false
      @donateSource.addEventListener "click", @toggleSource


    ###*
    # Закрываем форму
    # 
    ###
    closeForm: (event)=>
      @donate.parentNode.removeChild @donate

    ###*
    # Выбираем источник пожертвований
    # 
    ###
    toggleSource: (event)=>
      @donateSource.classList.toggle "wallet"
      @wallet = !@wallet
      @card = !@card

    ###*
    # Добавить форму пожертвований в качестве последнего ребенка элемента DOM
    # 
    ###
    appendTo: (element)=>
      element.appendChild @donate
      @donate = element.lastChild

    ###*
    # Добавить форму пожертвований в DOM после элемента
    # 
    ###
    insertAfter: (element)=>
      if element.nextSibling != null
        element.parentNode.insertBefore @donate, element.nextSibling
        @donate = element.nextSibling
      else
        @appendTo element.parentNode
      

    ###*
    # Добавить форму пожертвований в DOM перед элементом
    # 
    ###
    insertBefore: (element)=>
      element.parentNode.insertBefore @donate, element
      @donate = element.previousSibling

    ###*
    # Передать фокус полю ввода
    # 
    ###
    pseudoLabel: (event)=>
      @donateAmount.focus()

    ###*
    # Получить размер пожертвования из текста
    # 
    ###
    getFromText: (value)=>
      value = value.replace "/[^\d]/ig", ''
      value  = parseInt value, 10
      if isNaN(value) || value < 1
        value = 1
      return value

    ###*
    # Получить текущий размер пожертвования
    # 
    ###
    getAmount: =>
      return @getFromText @donateAmount.innerHTML

    ###*
    # Кнопку отпустили
    # 
    ###
    keyUp: (event)=>
      index = @controlsPressed.indexOf event.which
      if index > -1  
        @controlsPressed.splice index, 1

    ###*
    # Зарегистрировать коллбек
    # 
    ###
    registerCallback: (callbackFunction)=>
      @callbackFunction = callbackFunction


    ###*
    # Установить размер пожертвования
    # 
    ###
    setAmount: (event)=>
      @controlsPressed = []
      @donateAmount.innerHTML = @getFromText @donateAmount.innerHTML
      if typeof @callbackFunction == "function"
        @callbackFunction.call @



    ###*
    # Блокируем запретные кнопки
    # 
    ###
    keyDown: (event)=>
      if event.which not in @controls and event.which not in @numbers and event.which != @r
        event.preventDefault()

      if event.which in @controls and @controlsPressed.indexOf(event.which)<0
        @controlsPressed.push event.which

      if (event.which in @numbers) and ((@controlsPressed.indexOf(@shift) > -1)||(@donateAmount.innerHTML.length>4))
        event.preventDefault()
        return

      switch event.which

        when @r
          # нельзя запрещать обновление страницы
          isCmd = (@controlsPressed.indexOf(@cmd) > -1)
          isCtrl = (@controlsPressed.indexOf(@ctrl) > -1)
          if not isCmd and not isCtrl
            event.preventDefault()

        when @enter
          # Ввод страницы закончен
          event.preventDefault()
          @setAmount()
          @donateAmount.blur()
          index = @controlsPressed.indexOf event.which
          if index > -1  
            @controlsPressed.splice index, 1

        when @esc
          # Отменить действие
          event.preventDefault()
          @donateAmount.innerHTML = @donateAmount.getAttribute "data-pages"
          @donateAmount.blur()


  return donateController