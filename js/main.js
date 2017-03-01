window.onload = function() {
  logic.onReady();
};

var logic = {

  onReady: function() {
    console.log("logic started");
    logic.wrapLists();
    logic.toggleSocial();
    logic.toggleList();
    logic.hideAppPopup();
  },

  wrapLists: function() {
    // сворачивает списки при загрузке страницы
    // (по умолчанию развёрнуты для доступности без js)
    $(".list__info").next().slideToggle();
  },

  toggleSocial: function() {
    var socialPopup = "#social-popup__window",
        popupCloseButton = "#social-popup__close",
        socialToggles = ".note__button--share, .social__toggle";

    // добавляет eventListener для открытия окна с кнопками соцсетей
    $(socialToggles).click(function() {
      $(socialPopup).removeClass("popup--hidden");
    });

    // добавляет eventListener для закрытия окна с кнопками соцсетей
    $(popupCloseButton).click(function() {
      $(socialPopup).addClass("popup--hidden");
    });
  },

  toggleList: function() {
    // добавляет eventListener для переключения состояния списка по клику на заголовок
    $(".list__info").click(function() {
      $(this).next().slideToggle();
    });
  },

  hideAppPopup: function() {
    // добавляет eventListener для скрытия всплывающего меню с мобильным приложением
    $("#close-app-popup").click(function() {
      $(this).parent().slideToggle();
    });
  }
};
