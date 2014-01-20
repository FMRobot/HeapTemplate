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
      this.toggleTranslationArticleForm = __bind(this.toggleTranslationArticleForm, this);
      this.showFilter = __bind(this.showFilter, this);
      this.hideFilter = __bind(this.hideFilter, this);
      this.clearFilter = __bind(this.clearFilter, this);
      this.filterBy = __bind(this.filterBy, this);
      var addButton, button, editButton, element, elements, hideButton, likeDisabledButton, removeButton, showButton, template, translateButton, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _len5, _len6, _len7, _len8, _m, _n, _o, _p, _q, _ref;
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
      translateButton = document.querySelectorAll(".translate");
      this.iWantToTranslateTemplate = document.querySelector("#i-want-to-translate");
      this.iDontWantToTranslateTemplate = document.querySelector("#i-dont-want-to-translate");
      this.addTranslationFormTemplate = document.querySelector('#add-translation-form');
      this.confirmArticleRemoveTemplate = document.querySelector('#confirm-article-remove');
      this.loginPopupTemplate = document.querySelector('#login-popup');
      this.editArticleTemplate = document.querySelector('#edit-article-form');
      this.articleList = document.querySelector('.article-list');
      for (_j = 0, _len1 = translateButton.length; _j < _len1; _j++) {
        button = translateButton[_j];
        button.addEventListener("click", this.toggleTranslationArticleForm);
      }
      for (_k = 0, _len2 = editButton.length; _k < _len2; _k++) {
        button = editButton[_k];
        button.addEventListener("click", this.showEditArticleForm);
      }
      for (_l = 0, _len3 = showButton.length; _l < _len3; _l++) {
        button = showButton[_l];
        button.addEventListener("click", this.showTranslationsList);
      }
      for (_m = 0, _len4 = hideButton.length; _m < _len4; _m++) {
        button = hideButton[_m];
        button.addEventListener("click", this.hideTranslationsList);
      }
      for (_n = 0, _len5 = addButton.length; _n < _len5; _n++) {
        button = addButton[_n];
        button.addEventListener("click", this.showTranslationForm);
      }
      for (_o = 0, _len6 = removeButton.length; _o < _len6; _o++) {
        button = removeButton[_o];
        button.addEventListener("click", this.showRemoveConfirmation);
      }
      for (_p = 0, _len7 = likeDisabledButton.length; _p < _len7; _p++) {
        button = likeDisabledButton[_p];
        button.addEventListener("click", this.showLoginPopup);
      }
      this.filterButton = document.querySelector('.filter');
      this.filterButton.addEventListener("click", this.showFilter);
      this.filterList = document.querySelector('.tag-list ');
      this.filterList.querySelector('.close').addEventListener("click", this.hideFilter);
      this.filterList.querySelector('.clear').addEventListener("click", this.clearFilter);
      elements = this.filterList.querySelectorAll('a');
      for (_q = 0, _len8 = elements.length; _q < _len8; _q++) {
        element = elements[_q];
        element.addEventListener("click", this.filterBy);
      }
    }

    /**
    # Очистить фильтр
    #
    */


    heapController.prototype.filterBy = function(event) {
      var link;
      event.preventDefault();
      link = event.currentTarget;
      return link.classList.toggle('selected');
    };

    /**
    # Очистить фильтр
    #
    */


    heapController.prototype.clearFilter = function(event) {
      var selected, tag, _i, _len, _results;
      event.preventDefault();
      selected = this.filterList.querySelectorAll('.selected');
      _results = [];
      for (_i = 0, _len = selected.length; _i < _len; _i++) {
        tag = selected[_i];
        _results.push(tag.classList.remove('selected'));
      }
      return _results;
    };

    /**
    # Скрыть фильтр
    #
    */


    heapController.prototype.hideFilter = function(event) {
      event.preventDefault();
      this.filterButton.style.display = "block";
      return this.filterList.style.display = "none";
    };

    /**
    # Показать фильтр
    #
    */


    heapController.prototype.showFilter = function(event) {
      event.preventDefault();
      this.filterButton.style.display = "none";
      return this.filterList.style.display = "block";
    };

    /**
    # Выбрать переводишь ты статью или нет
    #
    */


    heapController.prototype.toggleTranslationArticleForm = function(event) {
      var button, link, parent;
      event.preventDefault();
      button = event.currentTarget;
      parent = button.parentNode;
      if (button.classList.contains("my")) {
        link = this.iWantToTranslateTemplate.content.cloneNode(true);
        console.log("больше не переводишь");
      } else {
        link = this.iDontWantToTranslateTemplate.content.cloneNode(true);
        console.log("перевод за тобой");
      }
      parent.insertBefore(link, button);
      parent.removeChild(button);
      return parent.querySelector(".translate").addEventListener("click", this.toggleTranslationArticleForm);
    };

    /**
    # Показывает календарь для выбора даты
    #
    */


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