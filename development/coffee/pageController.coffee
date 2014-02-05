define ['MutationObserver-polyfil'], ->
  ###*
  # Класс обеспечивает работу пагинатора
  # 
  # @class pageController
  ###
  class pageController

    ###*
    # Конструктор выполняет инициализацию пагинатора и обработчиков событий
    # 
    # @constructor
    ###
    constructor: ()->
      @enter = 13
      @esc = 27
      @dash = 189
      @ctrl = 17
      @cmd = 91
      @shift = 16
      @alt = 18
      @space = 32
      @chars =  [@dash, @space]
      @r = 82
      @numbers = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57]
      @controls = [8, 9, 45, 46, 39, 37, @esc, @ctrl, @alt, @shift, @enter, @cmd]

      @f_dash = '‒'
      @en_dash = '–'
      @em_dash = '—'
      @h_bar = '―'
      @s_dash = '⁓'
      @hyphen = '‐'
      @mhyphen = '-'
      @dashes = [@f_dash, @en_dash, @em_dash, @h_bar, @s_dash, @hyphen, @mhyphen]

      @nbsp = ' '
      @mnbsp = "&nbsp;"
      @space = ' '
      @tspace = ' '
      @hspace = ' '

      @controlsPressed = []
      @paginator = document.querySelector ".paginator"
      @paginatorCurrent = @paginator.querySelector ".current"
      @paginatorCurrent.addEventListener "keydown", @keyDown
      @paginatorCurrent.addEventListener "keyup", @keyUp
      @paginatorCurrent.addEventListener "focus", @savePageValue
      @paginatorCurrent.addEventListener "blur", @setPage
      @paginatorTotal = parseInt(@paginator.querySelector(".total").innerHTML,10)

    ###*
    # Догрузить 1 страничку
    # 
    ###
    addPage: =>

      value = @getFromText @paginatorCurrent.innerHTML
      if typeof value == "number"
        @paginatorCurrent.innerHTML = value+@hspace+@en_dash+@hspace+(value+1)
      else
        @paginatorCurrent.innerHTML = value[0]+@hspace+@en_dash+@hspace+(value[1]+1)

      if @callbackFunction != null
        @callbackFunction.call @

    ###*
    # Показать странички с по
    # 
    ###
    showPages: (from, to)=>

      from = parseInt from, 10
      to = parseInt to, 10
      if not isNaN(from) or not isNaN(to)
        return
      @paginatorCurrent.innerHTML = from+@hspace+@en_dash+@hspace+to

      if @callbackFunction != null
        @callbackFunction.call @

    ###*
    # Получить текущие странички
    # 
    ###
    getPages: =>
      return @getFromText @paginatorCurrent.innerHTML

    ###*
    # Зарегистрировать коллбек
    # 
    ###
    registerCallback: (callbackFunction)=>
      @callbackFunction = callbackFunction

    ###*
    # Запомнить текущее
    # 
    ###
    savePageValue: (event)=>
      @paginatorCurrent.setAttribute "data-pages", @paginatorCurrent.innerHTML

    ###*
    # Установить страничку
    # 
    ###
    setPage: (event)=>

      value = @getFromText @paginatorCurrent.innerHTML
      if typeof value == "number"
        @paginatorCurrent.innerHTML = value
      else
        @paginatorCurrent.innerHTML = value[0]+@hspace+@en_dash+@hspace+value[1]

      if @callbackFunction != null
        @callbackFunction.call @
      

    ###*
    # А есть ли дефис в поле
    # 
    ###
    ifDash: =>

      for dash in @dashes
        if @paginatorCurrent.innerHTML.indexOf(dash)>-1
          return true
      return false

    ###*
    # Кнопку отпустили
    # 
    ###
    keyUp: (event)=>

      index = @controlsPressed.indexOf event.which
      if index > -1  
        @controlsPressed.splice index, 1

    ###*
    # Получить номера страниц из текста
    # 
    ###
    getFromText: (value)=>

      spaces = "["+@mnbsp+@nbsp+@space+@tspace+@hspace+"\s]"
      space_unity = new RegExp spaces, "ig"
      value = value.replace space_unity, ''
      dashes = "["+@mhyphen+@f_dash+@en_dash+@em_dash+@h_bar+@s_dash+@hyphen+"]"
      dash_unity = new RegExp dashes, "ig"
      value = value.replace dash_unity, @en_dash
      value = value.replace "/[^\d\\"+@en_dash+"]/ig", ''
      value = value.split @en_dash

      if value.length>1
        value[0] = parseInt value[0], 10
        value[1] = parseInt value[1], 10
        if isNaN(value[0]) || value[0]<1
          value[0] = 1
        if isNaN(value[1]) || value[1]>@paginatorTotal
          value[1] = @paginatorTotal
        if value[0]>value[1]
          value[1]+= value[0]
          value[0] = value[1] - value[0]
          value[1] = value[1] - value[0]
          if value[0]<1
            value[0] = 1
          if value[1]>@paginatorTotal
            value[1] = @paginatorTotal
        if value[0] == value[1]
          return value[0]
        else
          return value
      else
        value = parseInt(value[0],10)
        if isNaN(value) || value<1 || value>@paginatorTotal
          value = 1
        return value

    ###*
    # Блокируем запретные кнопки
    # 
    ###
    keyDown: (event)=>
      
      if event.which not in @controls and event.which not in @numbers and event.which not in @chars and event.which != @r
        event.preventDefault()

      if event.which in @controls and @controlsPressed.indexOf(event.which)<0
        @controlsPressed.push event.which

      switch event.which
        when @r
          # нельзя запрещать обновление страницы
          isCmd = (@controlsPressed.indexOf(@cmd) > -1)
          isCtrl = (@controlsPressed.indexOf(@ctrl) > -1)
          if not isCmd and not isCtrl
            event.preventDefault()

        when @dash
          # зачем нам два дефиса?
          if @ifDash()
            event.preventDefault()

          if @controlsPressed.length>0
            isAlt = (@controlsPressed.indexOf(@alt) > -1)
            isShift = (@controlsPressed.indexOf(@shift) > -1)

            # можно выводить дефис или тире, но не подчеркивание
            if isShift and not isAlt
              event.preventDefault()

        when @enter
          # Ввод страницы закончен
          event.preventDefault()
          @setPage()
          @paginatorCurrent.blur()
          index = @controlsPressed.indexOf event.which
          if index > -1  
            @controlsPressed.splice index, 1

        when @esc
          # Отменить действие
          event.preventDefault()
          @paginatorCurrent.innerHTML = @paginatorCurrent.getAttribute "data-pages"
          @paginatorCurrent.blur()

      if (@paginatorCurrent.innerHTML.length>8 || @controlsPressed.length>0) and  (event.which in @numbers)
        event.preventDefault()


  return pageController
