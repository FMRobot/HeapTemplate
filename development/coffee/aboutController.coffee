define [], ->

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
      @contactForm = document.querySelector ".contact-us"
      inputElements = @contactForm.querySelectorAll "input, textarea"
      @textarea = @contactForm.querySelector "textarea"
      @textarea.addEventListener "keydown", @delayedResize
      @textarea.addEventListener "cut", @delayedResize
      @textarea.addEventListener "paste", @delayedResize
      @textarea.addEventListener "drop", @delayedResize
      @textarea.addEventListener "change", @resizeTextarea

      for input in inputElements
        input.addEventListener "keyup", @changeTranslationURL


    ###*
    # Изменяем высоту textarea что бы всегда вмещать текст
    # 
    ###
    delayedResize: =>
      window.setTimeout =>
          @resizeTextarea()
        , 0

    resizeTextarea: =>
      @textarea.style.height = '1px'
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