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

      showButton = document.querySelectorAll ".show-list"
      hideButton = document.querySelectorAll ".hide-list"
      likeDisabledButton = document.querySelectorAll ".likes.disabled"
      addButton = document.querySelectorAll ".add"
      removeButton = document.querySelectorAll ".remove"
      editButton = document.querySelectorAll ".edit"
      
      @addTranslationFormTemplate = document.querySelector('#add-translation-form');
      @confirmArticleRemoveTemplate = document.querySelector('#confirm-article-remove');
      @loginPopupTemplate = document.querySelector('#login-popup');
      @editArticleTemplate = document.querySelector('#edit-article-form');


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
      # form.querySelector("button.save").addEventListener "click", @saveEditArticleForm

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

      form.querySelector("[name='title']").value = article.querySelector(".title a").innerHTML;
      form.querySelector("[name='url']").value = article.querySelector(".title a").getAttribute('href');
      form.querySelector("[name='domain']").value = article.querySelector(".domain").innerHTML;
      form.querySelector("[name='date']").value = article.querySelector("time").innerHTML;
      form.querySelector("[name='language']").value = article.querySelector(".language").innerHTML;
      author = article.querySelector ".author"

      if author != null
        form.querySelector("[name='author']").value = author.innerHTML;

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
      article.style.display = "block";


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