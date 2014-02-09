define ['donateController'], (donateController)->

  ###*
  # Класс обеспечивает работу страницы о проекте
  # 
  # @class abstractController
  ###
  class abstractController


    ###*
    # Конструктор выполняет инициализацию страницы о проекте и создает обработчики событий
    # 
    # @constructor
    ###
    constructor: ->


      if "content" not in document.createElement "template"
        for template in document.querySelectorAll "template"
          template.content = template.childNodes[0]


      # Регулярное выражение для дополнительной проверкеи email
      @re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

      @contactForm = document.querySelector ".contact-us"
      inputElements = @contactForm.querySelectorAll "input, textarea"
      @textarea = @contactForm.querySelector "textarea"
      @email = @contactForm.querySelector "[name='email']"
      @skype = @contactForm.querySelector "[name='skype']"
      @button = @contactForm.querySelector "button"



      @contactForm.addEventListener "submit", @sendMessage
      @email.addEventListener "change", @testEmail
      @email.addEventListener "change", @testContacts
      @skype.addEventListener "change", @testContacts

      @textarea.addEventListener "keydown", @delayedResize
      @textarea.addEventListener "cut", @delayedResize
      @textarea.addEventListener "paste", @delayedResize
      @textarea.addEventListener "drop", @delayedResize
      @textarea.addEventListener "change", @resizeTextarea

      for input in inputElements
        input.addEventListener "keyup", @changeTranslationURL

      donateForm = new donateController()
      donateForm.setDefault 40
      donateForm.insertAfter document.getElementById("donate")


    ###*
    # Сообщение редакции
    # 
    ###
    sendMessage: (event)=>
      event.preventDefault()

      if not @testContacts()
        return
      if not @testEmail()
        return

      @button.classList.add "loading"
      
    hideErr: =>
      @contactForm.classList.remove("email-err")
      @contactForm.classList.remove("contact-err")

    testContacts: =>
      if @email.value.trim().length == 0 and @skype.value.trim().length == 0
        @contactForm.classList.add "contact-err"
        @contactForm.classList.remove "email-err"
        window.setTimeout =>
          @hideErr()
        , 5000
        return false

      @contactForm.classList.remove "contact-err"
      return true

    testEmail: =>
      if @email.value.trim().length > 0 and !@re.test @email.value.trim()
        @contactForm.classList.add "email-err"
        @contactForm.classList.remove "contact-err"
        window.setTimeout =>
          @hideErr()
        , 5000
        return false

      @contactForm.classList.remove "email-err"
      return true


    ###*
    # Изменяем высоту textarea что бы всегда вмещать текст
    # 
    ###
    delayedResize: =>
      window.setTimeout =>
          @resizeTextarea()
        , 0

    resizeTextarea: =>
      @textarea.style.height = '0'
      @textarea.style.height = (@textarea.scrollHeight)+'px';

    ###*
    # Показать подсказку, если в поле что то введено и не видно placeholder
    # 
    ###
    changeTranslationURL: (event)=>
      input = event.currentTarget

      if input.value.trim().length > 0
        input.classList.add "non-empty"
      else
        input.classList.remove "non-empty"



  return abstractController