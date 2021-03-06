define ['calendarController','pageController', 'donateController'], (calendarController, pageController, donateController) ->

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

      likeDisabledButton = document.querySelectorAll ".likes.disabled"
      likeEnabledButton = document.querySelectorAll "a.likes:not(.disabled)"
      addButton = document.querySelectorAll ".add"
      removeButton = document.querySelectorAll ".remove"
      editButton = document.querySelectorAll ".edit"
      translateButton = document.querySelectorAll ".translate"
      donateButton = document.querySelectorAll ".donate"

      @addArticleForm = document.querySelector ".add-article-form"
      @addArticleFormInput = @addArticleForm.querySelector "input"
      @addArticleButton = document.getElementById "add-article-button"
      
      @iWantToTranslateTemplate = document.querySelector "#i-want-to-translate"
      @iDontWantToTranslateTemplate = document.querySelector "#i-dont-want-to-translate"
      @addTranslationFormTemplate = document.querySelector '#add-translation-form'
      @confirmArticleRemoveTemplate = document.querySelector '#confirm-article-remove'
      @loginPopupTemplate = document.querySelector '#login-popup'
      @editArticleTemplate = document.querySelector '#edit-article-form'

      @moreButton = document.querySelector ".more"
      @moreButton.addEventListener "click", @loadNextPage

      @articleList = document.querySelector '.article-list'

      for button in donateButton
        button.addEventListener "click", @showDonateForm

      for button in translateButton
        button.addEventListener "click", @toggleTranslationArticleForm

      for button in editButton
        button.addEventListener "click", @showEditArticleForm

      for button in addButton
        button.addEventListener "click", @showTranslationForm

      for button in removeButton
        button.addEventListener "click", @showRemoveConfirmation

      for button in likeEnabledButton
        button.addEventListener "click", @likeArticle

      for button in likeDisabledButton
        button.addEventListener "click", @showLoginPopup

      @addArticleFormInput.addEventListener "keyup", @changeTranslationURL
      @addArticleButton.addEventListener "click", @showAddArticleForm

      @filterButton = document.querySelector '.filter'
      @filterButton.addEventListener "click", @toggleFilter
      @filterList = document.querySelector '.tag-list '
      @filterList.querySelector('.close').addEventListener "click", @toggleFilter
      @filterList.querySelector('.clear').addEventListener "click", @clearFilter
      elements = @filterList.querySelectorAll('a')
      for element in elements
        element.addEventListener "click", @filterBy

      @page = new pageController()
      @page.registerCallback @loadPage

    ###*
    # лайкаем
    # 
    ###
    likeArticle: (event)=>
      event.preventDefault()
      link = event.currentTarget
      num = parseInt link.innerHTML, 10
      if link.classList.contains "liked"
        num--
      else
        num++
      link.innerHTML = num
      link.classList.toggle "liked"

    ###*
    # Показать форму пожертвований
    # 
    ###
    showDonateForm: (event)=>
      event.preventDefault()
      link = event.currentTarget
      article = link.parentNode.parentNode
      donateForm = new donateController()
      donateForm.appendTo article

    ###*
    # Загрузка страниц
    # 
    ###
    loadPage: =>
      # Вообще то тут должен быть аякс запрос, который получит нужный диапазон страниц
      if @page.getLastPage() == @page.getPagesTotal()
        @moreButton.parentNode.removeChild @moreButton
      else
        window.setTimeout(=>
          @moreButton.classList.remove 'loading'
        ,
        1500)


    ###*
    # Загрузить следующую страничку
    # 
    ###
    loadNextPage: (event)=>
      event.preventDefault()
      if @moreButton.classList.contains 'loading'
        return
      @moreButton.classList.add 'loading'
      @page.addPage()

    ###*
    # Показать форму добавления новой статьи
    # 
    ###
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

  return heapController