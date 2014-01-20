define ['calendarController'], (calendarController) ->

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


      @filterButton = document.querySelector '.filter'
      @filterButton.addEventListener "click", @showFilter
      @filterList = document.querySelector '.tag-list '
      @filterList.querySelector('.close').addEventListener "click", @hideFilter
      @filterList.querySelector('.clear').addEventListener "click", @clearFilter
      elements = @filterList.querySelectorAll('a')
      for element in elements
        element.addEventListener "click", @filterBy


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
    # Скрыть фильтр
    # 
    ###
    hideFilter: (event)=>
      event.preventDefault()
      @filterButton.style.display = "block"
      @filterList.style.display = "none"

    ###*
    # Показать фильтр
    # 
    ###
    showFilter: (event)=>
      event.preventDefault()
      @filterButton.style.display = "none"
      @filterList.style.display = "block"


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
      article.querySelector(".domain").innerHTML = form.querySelector("[name='domain']").value
      article.querySelector("time").innerHTML = form.querySelector("[name='date']").value
      article.querySelector("time").setAttribute('datetime', moment(form.querySelector("[name='date']").value, 'DD MMMM YYYY').format("YYYY-MM-DD"))
      article.querySelector(".language").innerHTML = form.querySelector("[name='language']").value  
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
      form = button.parentNode
      article = form.parentNode
      article.removeChild form

    ###*
    # Подтвердить удаление статьи из кучи
    # 
    ###
    confirmRemoveConfirmation: (event)=>
      event.preventDefault()
      button = event.currentTarget
      form = button.parentNode
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
      form.querySelector("button[type='reset']").addEventListener "click", @hideTranslationForm

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
      article.querySelector(".add").style.display = "inline-block"

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
      article.querySelector(".hide-list").style.display = "inline-block"
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
      article.querySelector(".show-list").style.display = "inline-block"

  return heapController