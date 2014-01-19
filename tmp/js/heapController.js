var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

define(['calendarController'], function(calendarController) {
  /**
  # Класс обеспечивает работу Кучи
  # 
  # @class heapController
  */

  var heapController;
  heapController = (function() {
    /**
    # Конструктор выполняет инициализацию Кучи и создает обработчики событий
    # 
    # @constructor
    */

    function heapController() {
      this.hideTranslationsList = __bind(this.hideTranslationsList, this);
      this.showTranslationsList = __bind(this.showTranslationsList, this);
      this.addTranslation = __bind(this.addTranslation, this);
      this.hideTranslationForm = __bind(this.hideTranslationForm, this);
      this.showTranslationForm = __bind(this.showTranslationForm, this);
      this.confirmRemoveConfirmation = __bind(this.confirmRemoveConfirmation, this);
      this.denyRemoveConfirmation = __bind(this.denyRemoveConfirmation, this);
      this.showRemoveConfirmation = __bind(this.showRemoveConfirmation, this);
      this.denyLogin = __bind(this.denyLogin, this);
      this.showLoginPopup = __bind(this.showLoginPopup, this);
      this.closeEditArticleForm = __bind(this.closeEditArticleForm, this);
      this.resetEditArticleForm = __bind(this.resetEditArticleForm, this);
      this.saveEditArticleForm = __bind(this.saveEditArticleForm, this);
      this.changeEditArticleForm = __bind(this.changeEditArticleForm, this);
      this.showEditArticleForm = __bind(this.showEditArticleForm, this);
      this.openCalendar = __bind(this.openCalendar, this);
      var addButton, button, editButton, hideButton, likeDisabledButton, removeButton, showButton, template, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _len5, _len6, _m, _n, _o, _ref;
      if (__indexOf.call(document.createElement("template"), "content") < 0) {
        _ref = document.querySelectorAll("template");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          template = _ref[_i];
          template.content = template.childNodes[0];
        }
      }
      this.lang = 'ru';
      showButton = document.querySelectorAll(".show-list");
      hideButton = document.querySelectorAll(".hide-list");
      likeDisabledButton = document.querySelectorAll(".likes.disabled");
      addButton = document.querySelectorAll(".add");
      removeButton = document.querySelectorAll(".remove");
      editButton = document.querySelectorAll(".edit");
      this.addTranslationFormTemplate = document.querySelector('#add-translation-form');
      this.confirmArticleRemoveTemplate = document.querySelector('#confirm-article-remove');
      this.loginPopupTemplate = document.querySelector('#login-popup');
      this.editArticleTemplate = document.querySelector('#edit-article-form');
      this.articleList = document.querySelector('.article-list');
      for (_j = 0, _len1 = editButton.length; _j < _len1; _j++) {
        button = editButton[_j];
        button.addEventListener("click", this.showEditArticleForm);
      }
      for (_k = 0, _len2 = showButton.length; _k < _len2; _k++) {
        button = showButton[_k];
        button.addEventListener("click", this.showTranslationsList);
      }
      for (_l = 0, _len3 = hideButton.length; _l < _len3; _l++) {
        button = hideButton[_l];
        button.addEventListener("click", this.hideTranslationsList);
      }
      for (_m = 0, _len4 = addButton.length; _m < _len4; _m++) {
        button = addButton[_m];
        button.addEventListener("click", this.showTranslationForm);
      }
      for (_n = 0, _len5 = removeButton.length; _n < _len5; _n++) {
        button = removeButton[_n];
        button.addEventListener("click", this.showRemoveConfirmation);
      }
      for (_o = 0, _len6 = likeDisabledButton.length; _o < _len6; _o++) {
        button = likeDisabledButton[_o];
        button.addEventListener("click", this.showLoginPopup);
      }
    }

    heapController.prototype.openCalendar = function(event) {
      var calendar, date, form,
        _this = this;
      form = event.currentTarget;
      while (form.tagName !== 'FORM') {
        form = form.parentNode;
      }
      date = form.querySelector("[name='date']").value.trim();
      if (date.length === 0) {
        date = null;
      }
      calendar = new calendarController(date, "DD MMMM YYYY", function(selected_moment) {
        var day;
        day = selected_moment.format('DD MMMM YYYY');
        if (form.querySelector("[name='date']").value !== day) {
          form.classList.add('changed');
        }
        form.querySelector("[name='date']").value = day;
        return form.style.display = 'block';
      }, this.lang);
      form.style.display = 'none';
      return calendar.insertAfter(form);
    };

    /**
    # Показывает форму редактирования статьи
    #
    */


    heapController.prototype.showEditArticleForm = function(event) {
      var article, button, form, input, _i, _len, _ref;
      event.preventDefault();
      button = event.currentTarget;
      article = button.parentNode.parentNode;
      form = this.editArticleTemplate.content.cloneNode(true);
      form.querySelector("button.close").addEventListener("click", this.closeEditArticleForm);
      form.querySelector("button.reset").addEventListener("click", this.resetEditArticleForm);
      form.querySelector(".open-calendar").addEventListener("click", this.openCalendar);
      this.resetEditArticleForm(null, form, article);
      _ref = form.querySelectorAll("input");
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        input = _ref[_i];
        input.addEventListener("change", this.changeEditArticleForm);
      }
      article.style.display = "none";
      if (article.nextSibling === null) {
        article.parentNode.appendChild(form);
      } else {
        article.parentNode.insertBefore(form, article.nextSibling);
      }
      return article.nextSibling.addEventListener("submit", this.saveEditArticleForm);
    };

    /**
    # Изменилось одно из полей формы
    #
    */


    heapController.prototype.changeEditArticleForm = function(event) {
      var form;
      form = event.currentTarget;
      while (form.tagName !== 'FORM') {
        form = form.parentNode;
      }
      return form.classList.add('changed');
    };

    /**
    # Сохраняем результат редактирования
    #
    */


    heapController.prototype.saveEditArticleForm = function(event) {
      var article, form, i, link, newTagsContainer, tag, tags, tagsContainer, _i, _len;
      event.preventDefault();
      form = event.currentTarget;
      if (!form.classList.contains('changed')) {
        console.log('ничего не изменилось');
        return;
      }
      console.log('отправляем данные на сервер');
      article = form.previousSibling;
      article.querySelector(".title a").innerHTML = form.querySelector("[name='title']").value;
      article.querySelector(".title a").setAttribute('href', form.querySelector("[name='url']").value);
      article.querySelector(".domain").innerHTML = form.querySelector("[name='domain']").value;
      article.querySelector("time").innerHTML = form.querySelector("[name='date']").value;
      article.querySelector("time").setAttribute('datetime', moment(form.querySelector("[name='date']").value, 'DD MMMM YYYY').format("YYYY-MM-DD"));
      article.querySelector(".language").innerHTML = form.querySelector("[name='language']").value;
      article.querySelector(".author").innerHTML = form.querySelector("[name='author']").value;
      newTagsContainer = document.createElement("MENU");
      newTagsContainer.className = 'tags';
      tags = form.querySelector("[name='tags']").value.split(',');
      i = false;
      for (_i = 0, _len = tags.length; _i < _len; _i++) {
        tag = tags[_i];
        if (i === true) {
          newTagsContainer.appendChild(document.createTextNode(", "));
        }
        link = document.createElement("A");
        link.setAttribute("href", "/search/tags/" + tag.trim());
        link.appendChild(document.createTextNode(tag.trim()));
        newTagsContainer.appendChild(link);
        i = true;
      }
      tagsContainer = article.querySelector(".tags");
      tagsContainer.parentNode.insertBefore(newTagsContainer, tagsContainer);
      tagsContainer.parentNode.removeChild(tagsContainer);
      form.parentNode.removeChild(form);
      return article.style.display = "block";
    };

    /**
    # Отменяем изменения
    #
    */


    heapController.prototype.resetEditArticleForm = function(event, form, article) {
      var author, line, tag, tags, _i, _len;
      if (event !== null) {
        event.preventDefault();
        form = event.currentTarget;
        while (form.tagName !== 'FORM') {
          form = form.parentNode;
        }
        article = form.previousSibling;
        form.classList.remove('changed');
      }
      form.querySelector("[name='title']").value = article.querySelector(".title a").innerHTML;
      form.querySelector("[name='url']").value = article.querySelector(".title a").getAttribute('href');
      form.querySelector("[name='domain']").value = article.querySelector(".domain").innerHTML;
      form.querySelector("[name='date']").value = article.querySelector("time").innerHTML;
      form.querySelector("[name='language']").value = article.querySelector(".language").innerHTML;
      author = article.querySelector(".author");
      if (author !== null) {
        form.querySelector("[name='author']").value = author.innerHTML;
      }
      tags = article.querySelectorAll(".tags a");
      line = [];
      for (_i = 0, _len = tags.length; _i < _len; _i++) {
        tag = tags[_i];
        line.push(tag.innerHTML);
      }
      return form.querySelector("[name='tags']").value = line.join(', ');
    };

    /**
    # Закрывает форму редактирования
    #
    */


    heapController.prototype.closeEditArticleForm = function(event) {
      var article, button, form;
      event.preventDefault();
      button = event.currentTarget;
      form = button.parentNode.parentNode;
      article = form.previousSibling;
      form.parentNode.removeChild(form);
      return article.style.display = "block";
    };

    /**
    # Показывает форму предлагающую авторизироваться
    #
    */


    heapController.prototype.showLoginPopup = function(event) {
      var article, button, form;
      event.preventDefault();
      button = event.currentTarget;
      article = button.parentNode.parentNode;
      article.appendChild(this.loginPopupTemplate.content.cloneNode(true));
      form = article.querySelector(".login-popup");
      return form.querySelector(".deny").addEventListener("click", this.denyLogin);
    };

    /**
    # Закрывает форму предлагающую авторизацию
    #
    */


    heapController.prototype.denyLogin = function(event) {
      var article, button, popup;
      event.preventDefault();
      button = event.currentTarget;
      popup = button.parentNode.parentNode;
      article = popup.parentNode;
      return article.removeChild(popup);
    };

    /**
    # Показывает форму подтверждения удаления статьи из кучи
    #
    */


    heapController.prototype.showRemoveConfirmation = function(event) {
      var button, form, header;
      event.preventDefault();
      button = event.currentTarget;
      header = button.parentNode.parentNode;
      header.appendChild(this.confirmArticleRemoveTemplate.content.cloneNode(true));
      form = header.querySelector(".confirm-article-remove");
      form.querySelector(".confirm").addEventListener("click", this.confirmRemoveConfirmation);
      return form.querySelector(".deny").addEventListener("click", this.denyRemoveConfirmation);
    };

    /**
    # Отменить удаление статьи из кучи
    #
    */


    heapController.prototype.denyRemoveConfirmation = function(event) {
      var article, button, form;
      event.preventDefault();
      button = event.currentTarget;
      form = button.parentNode;
      article = form.parentNode;
      return article.removeChild(form);
    };

    /**
    # Подтвердить удаление статьи из кучи
    #
    */


    heapController.prototype.confirmRemoveConfirmation = function(event) {
      var article, button, form;
      event.preventDefault();
      button = event.currentTarget;
      form = button.parentNode;
      article = form.parentNode;
      article.removeChild(form);
      return article.parentNode.removeChild(article);
    };

    /**
    # Отобразить форму добавления перевода
    #
    */


    heapController.prototype.showTranslationForm = function(event) {
      var button, form, header;
      event.preventDefault();
      button = event.currentTarget;
      button.style.display = "none";
      header = button.parentNode.parentNode;
      header.appendChild(this.addTranslationFormTemplate.content.cloneNode(true));
      form = header.querySelector(".add-translation-form");
      form.addEventListener("submit", this.addTranslation);
      return form.querySelector("button[type='reset']").addEventListener("click", this.hideTranslationForm);
    };

    /**
    # Скрыть форму добавления перевода
    #
    */


    heapController.prototype.hideTranslationForm = function(event) {
      var article, button, form;
      event.preventDefault();
      button = event.currentTarget;
      form = button.parentNode.parentNode;
      article = form.parentNode;
      article.removeChild(form);
      return article.querySelector(".add").style.display = "inline-block";
    };

    /**
    # Добавить перевод в кучу
    #
    */


    heapController.prototype.addTranslation = function(event) {
      return event.preventDefault();
    };

    /**
    # Показать список переводов
    #
    */


    heapController.prototype.showTranslationsList = function(event) {
      var article, button, list;
      event.preventDefault();
      button = event.currentTarget;
      article = button.parentNode.parentNode;
      list = article.querySelector(".translations");
      list.style.display = "block";
      article.querySelector(".hide-list").style.display = "inline-block";
      return button.style.display = "none";
    };

    /**
    # Скрыть список переводов
    #
    */


    heapController.prototype.hideTranslationsList = function(event) {
      var article, button, list;
      event.preventDefault();
      button = event.currentTarget;
      article = button.parentNode.parentNode;
      list = article.querySelector(".translations");
      list.style.display = "none";
      button.style.display = "none";
      return article.querySelector(".show-list").style.display = "inline-block";
    };

    return heapController;

  })();
  return heapController;
});

/*
//@ sourceMappingURL=heapController.js.map
*/