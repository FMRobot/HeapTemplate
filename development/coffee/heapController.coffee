define ['calendarController','MutationObserver-polyfil'], (calendarController) ->

  ###*
  # Класс обеспечивает работу Кучи
  # 
  # @class heapController
  ###
  class heapController


    ###*
    # Конструктор выполняет инициализацию Кучи и создает обработчики событий
    # 
    # @constructor
    ###
    constructor: ->
      if "content" not in document.createElement "template"
        for template in document.querySelectorAll "template"
          template.content = template.childNodes[0]  

      @lang = 'ru'  

      showButton = document.querySelectorAll ".show-list"
      hideButton = document.querySelectorAll ".hide-list"
      likeDisabledButton = document.querySelectorAll ".likes.disabled"
      addButton = document.querySelectorAll ".add"
      removeButton = document.querySelectorAll ".remove"
      editButton = document.querySelectorAll ".edit"
      translateButton = document.querySelectorAll ".translate"

      @paginator = document.querySelector ".paginator"
      @paginatorCurrent = @paginator.querySelector ".current"
      @paginatorCurrent.addEventListener "keydown", @blockKeys
      @paginatorCurrent.addEventListener "focus", @savePageValue
      @paginatorCurrent.addEventListener "blur", @setPage
      @paginatorTotal = parseInt(@paginator.querySelector(".total").innerHTML,10)

      @addArticleForm = document.querySelector ".add-article-form"
      @addArticleFormInput = @addArticleForm.querySelector "input"
      @addArticleButton = document.getElementById "add-article-button"
      
      @iWantToTranslateTemplate = document.querySelector "#i-want-to-translate"
      @iDontWantToTranslateTemplate = document.querySelector "#i-dont-want-to-translate"
      @addTranslationFormTemplate = document.querySelector '#add-translation-form'
      @confirmArticleRemoveTemplate = document.querySelector '#confirm-article-remove'
      @loginPopupTemplate = document.querySelector '#login-popup'
      @editArticleTemplate = document.querySelector '#edit-article-form'

      @articleList = document.querySelector '.article-list'

      for button in translateButton
        button.addEventListener "click", @toggleTranslationArticleForm

      for button in editButton
        button.addEventListener "click", @showEditArticleForm

      for button in showButton
        button.addEventListener "click", @showTranslationsList

      for button in hideButton
        button.addEventListener "click", @hideTranslationsList

      for button in addButton
        button.addEventListener "click", @showTranslationForm

      for button in removeButton
        button.addEventListener "click", @showRemoveConfirmation

      for button in likeDisabledButton
        button.addEventListener "click", @showLoginPopup


      @addArticleFormInput.addEventListener "keyup", @changeTranslationURL
      @addArticleButton.addEventListener "click", @showAddArticleForm

      @filterButton = document.querySelector '.filter'
      @filterButton.addEventListener "click", @toggleFilter
      @filterList = document.querySelector '.tag-list '
      @filterList.querySelector('.clear').addEventListener "click", @clearFilter
      elements = @filterList.querySelectorAll('a')
      for element in elements
        element.addEventListener "click", @filterBy

    savePageValue: (event)=>
      @paginatorCurrent.setAttribute "data-pages", @paginatorCurrent.innerHTML

    setPage: (event)=>
      value = @paginatorCurrent.innerHTML
      value = value.replace /[‒–—―]/ig, '-'
      value = value.replace /[^\d\-]/ig, ''
      value = value.split '-'

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
          @paginatorCurrent.innerHTML = value[0]
        else
          @paginatorCurrent.innerHTML = value[0]+"&#8202;–&#8202;"+value[1]
      else
        value = parseInt(value[0],10)
        if isNaN(value) || value<1 || value>@paginatorTotal
          value = 1
        @paginatorCurrent.innerHTML = value

    blockKeys: (event)=>
      numbers = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57]
      controls = [189, 32, 8, 9, 45, 46, 39, 37, 27, 17, 18, 16, 13, 91]
      
      if event.which not in controls and event.which not in numbers
        event.preventDefault()

      switch event.which
        when 13 
          # Ввод страницы закончен
          event.preventDefault()
          @setPage()
          @paginatorCurrent.blur()
        when 27
          # Отменить действие
          event.preventDefault()
          @paginatorCurrent.innerHTML = @paginatorCurrent.getAttribute "data-pages"
          @paginatorCurrent.blur()

      if @paginatorCurrent.innerHTML.length>10 and event.which in numbers
        event.preventDefault()

    showAddArticleForm: (event)=>
      event.preventDefault()
      link = event.currentTarget
      link.classList.add 'open'
      @addArticleForm.classList.add 'open'
      @addArticleFormInput.focus()

    ###*
    # Очистить фильтр
    # 
    ###
    filterBy: (event)=>
      event.preventDefault()
      link = event.currentTarget
      link.classList.toggle 'selected'

    ###*
    # Очистить фильтр
    # 
    ###
    clearFilter: (event)=>
      event.preventDefault()
      selected = @filterList.querySelectorAll('.selected')
      for tag in selected
        tag.classList.remove 'selected'

    ###*
    # Показать/скрыть фильтр
    # 
    ###
    toggleFilter: (event)=>
      event.preventDefault()
      @filterButton.classList.toggle "selected"
      @filterList.classList.toggle "open"


    ###*
    # Выбрать переводишь ты статью или нет
    # 
    ###
    toggleTranslationArticleForm: (event)=>
      event.preventDefault()
      button = event.currentTarget
      parent = button.parentNode
      if button.classList.contains "my"
        link = @iWantToTranslateTemplate.content.cloneNode true
        console.log "больше не переводишь"
      else
        link = @iDontWantToTranslateTemplate.content.cloneNode true
        console.log "перевод за тобой"

      parent.insertBefore link, button
      parent.removeChild button
      parent.querySelector(".translate").addEventListener "click", @toggleTranslationArticleForm

    ###*
    # Показывает календарь для выбора даты
    # 
    ###
    openCalendar: (event)=>
      form = event.currentTarget
      while form.tagName != 'FORM'
        form = form.parentNode
      date = form.querySelector("[name='date']").value.trim()
      if date.length == 0
        date = null
      calendar = new calendarController(date, "DD MMMM YYYY", (selected_moment)=>
        if selected_moment != null
          day = selected_moment.format 'DD MMMM YYYY'
          if form.querySelector("[name='date']").value != day
            form.classList.add 'changed'
          form.querySelector("[name='date']").value = day

        form.style.display = 'block'

      , @lang)
      form.style.display = 'none'
      calendar.insertAfter form

    ###*
    # Показывает форму редактирования статьи
    # 
    ###
    showEditArticleForm: (event)=>
      event.preventDefault()
      button = event.currentTarget
      article = button.parentNode.parentNode
      
      form = @editArticleTemplate.content.cloneNode true
      form.querySelector("button.close").addEventListener "click", @closeEditArticleForm
      form.querySelector("button.reset").addEventListener "click", @resetEditArticleForm
      form.querySelector(".open-calendar").addEventListener "click", @openCalendar

      @resetEditArticleForm null, form, article

      for input in form.querySelectorAll("input")
        input.addEventListener "change", @changeEditArticleForm

      article.style.display = "none";
      if article.nextSibling==null
        article.parentNode.appendChild form
      else
        article.parentNode.insertBefore form, article.nextSibling

      article.nextSibling.addEventListener "submit", @saveEditArticleForm

    ###*
    # Изменилось одно из полей формы
    # 
    ###
    changeEditArticleForm: (event)=>
      form = event.currentTarget
      while form.tagName != 'FORM'
        form = form.parentNode
      form.classList.add 'changed'

    ###*
    # Сохраняем результат редактирования
    # 
    ###
    saveEditArticleForm: (event)=>
      event.preventDefault()
      form = event.currentTarget
      if !form.classList.contains 'changed'
        console.log 'ничего не изменилось'
        return
      console.log 'отправляем данные на сервер'

      article = form.previousSibling
      article.querySelector(".title a").innerHTML = form.querySelector("[name='title']").value
      article.querySelector(".title a").setAttribute 'href', form.querySelector("[name='url']").value
      article.querySelector(".domain a").innerHTML = form.querySelector("[name='domain']").value
      article.querySelector("time").innerHTML = form.querySelector("[name='date']").value
      article.querySelector("time").setAttribute('datetime', moment(form.querySelector("[name='date']").value, 'DD MMMM YYYY').format("YYYY-MM-DD"))
      article.querySelector(".language a").innerHTML = form.querySelector("[name='language']").value  
      article.querySelector(".author").innerHTML = form.querySelector("[name='author']").value

      newTagsContainer = document.createElement "MENU"
      newTagsContainer.className = 'tags'
      tags = form.querySelector("[name='tags']").value.split(',')
      i = false
      for tag in tags
        if i == true
          newTagsContainer.appendChild document.createTextNode(", ")
        link = document.createElement "A"
        link.setAttribute "href", "/search/tags/"+ tag.trim()
        link.appendChild document.createTextNode(tag.trim())
        newTagsContainer.appendChild link
        i = true

      tagsContainer = article.querySelector(".tags")
      tagsContainer.parentNode.insertBefore newTagsContainer ,tagsContainer
      tagsContainer.parentNode.removeChild tagsContainer

      form.parentNode.removeChild form
      article.style.display = "block"

    ###*
    # Отменяем изменения
    # 
    ###
    resetEditArticleForm: (event, form, article)=>

      if event != null
        event.preventDefault()
        form = event.currentTarget
        while form.tagName != 'FORM'
          form = form.parentNode
        article = form.previousSibling
        form.classList.remove 'changed'

      form.querySelector("[name='title']").value = article.querySelector(".title a").innerHTML
      form.querySelector("[name='url']").value = article.querySelector(".title a").getAttribute('href')
      form.querySelector("[name='domain']").value = article.querySelector(".domain").innerHTML
      form.querySelector("[name='date']").value = article.querySelector("time").innerHTML
      form.querySelector("[name='language']").value = article.querySelector(".language").innerHTML
      author = article.querySelector ".author"

      if author != null
        form.querySelector("[name='author']").value = author.innerHTML

      tags = article.querySelectorAll ".tags a"
      line = []
      for tag in tags
        line.push tag.innerHTML
      form.querySelector("[name='tags']").value = line.join ', '


    ###*
    # Закрывает форму редактирования
    # 
    ###
    closeEditArticleForm: (event)=>
      event.preventDefault()
      button = event.currentTarget
      form = button.parentNode.parentNode
      article = form.previousSibling
      form.parentNode.removeChild form
      article.style.display = "block"


    ###*
    # Показывает форму предлагающую авторизироваться
    # 
    ###
    showLoginPopup: (event)=>
      event.preventDefault()
      button = event.currentTarget
      article = button.parentNode.parentNode
      article.appendChild @loginPopupTemplate.content.cloneNode true
      form = article.querySelector ".login-popup"
      form.querySelector(".deny").addEventListener "click", @denyLogin

    ###*
    # Закрывает форму предлагающую авторизацию
    # 
    ###
    denyLogin: (event)=>
      event.preventDefault()
      button = event.currentTarget
      popup = button.parentNode.parentNode
      article = popup.parentNode
      article.removeChild popup

    ###*
    # Показывает форму подтверждения удаления статьи из кучи
    # 
    ###
    showRemoveConfirmation: (event)=>
      event.preventDefault()
      button = event.currentTarget
      header = button.parentNode.parentNode
      header.appendChild @confirmArticleRemoveTemplate.content.cloneNode true
      form = header.querySelector ".confirm-article-remove"
      form.querySelector(".confirm").addEventListener "click", @confirmRemoveConfirmation
      form.querySelector(".deny").addEventListener "click", @denyRemoveConfirmation

    ###*
    # Отменить удаление статьи из кучи
    # 
    ###
    denyRemoveConfirmation: (event)=>
      event.preventDefault()
      button = event.currentTarget
      form = button.parentNode.parentNode
      article = form.parentNode
      article.removeChild form

    ###*
    # Подтвердить удаление статьи из кучи
    # 
    ###
    confirmRemoveConfirmation: (event)=>
      event.preventDefault()
      button = event.currentTarget
      form = button.parentNode.parentNode
      article = form.parentNode
      article.removeChild form
      article.parentNode.removeChild article


    ###*
    # Отобразить форму добавления перевода
    # 
    ###
    showTranslationForm: (event)=>
      event.preventDefault()
      button = event.currentTarget
      button.style.display = "none"
      header = button.parentNode.parentNode
      header.appendChild @addTranslationFormTemplate.content.cloneNode(true)
      form = header.querySelector ".add-translation-form"
      form.addEventListener "submit", @addTranslation
      input = form.querySelector("input")
      input.addEventListener "keyup", @changeTranslationURL 
      input.focus()
      form.querySelector("button[type='reset']").addEventListener "click", @hideTranslationForm

    ###*
    # Показать подставку, если в поле что то введено и не видно placeholder
    # 
    ###
    changeTranslationURL: (event)=>
      input = event.currentTarget

      if input.value.trim().length > 0
        input.classList.add "non-empty"
      else
        input.classList.remove "non-empty"

    ###*
    # Скрыть форму добавления перевода
    # 
    ###
    hideTranslationForm: (event)=>
      event.preventDefault()
      button = event.currentTarget
      form = button.parentNode.parentNode
      article = form.parentNode
      article.removeChild form
      article.querySelector(".add").style.display = "inline"

    ###*
    # Добавить перевод в кучу
    # 
    ###
    addTranslation: (event)=>
      event.preventDefault()


    ###*
    # Показать список переводов
    # 
    ###
    showTranslationsList: (event)=>
      event.preventDefault()
      button = event.currentTarget
      article = button.parentNode.parentNode
      list = article.querySelector ".translations"
      list.style.display = "block"
      article.querySelector(".hide-list").style.display = "inline"
      button.style.display = "none"

    ###*
    # Скрыть список переводов
    # 
    ###
    hideTranslationsList: (event)=>
      event.preventDefault()
      button = event.currentTarget
      article = button.parentNode.parentNode
      list = article.querySelector ".translations"
      list.style.display = "none"
      button.style.display = "none"
      article.querySelector(".show-list").style.display = "inline"

  return heapController