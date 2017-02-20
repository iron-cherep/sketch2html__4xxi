window.onload = function() {

  // сворачивает списки при загрузке страницы
  // (по умолчанию развёрнуты для доступности без js)
  $(".list__info").next().slideToggle();

  // переключает состояние списка по клику на заголовок
  $(".list__info").click(function() {
    $(this).next().slideToggle();
  });

  // скрывает всплывающее меню с мобильным приложением
  $("#close-app-popup").click(function() {
    $(this).parent().slideToggle();
  });

  // закрывает окно с кнопками соцсетей
  $("#social-popup__close").click(function() {
    $("#social-popup__window").addClass("popup--hidden");
  });

  // открывает окно с кнопками соцсетей
  $(".note__button--share").click(function() {
    $("#social-popup__window").removeClass("popup--hidden");
  });
  $(".social__toggle").click(function() {
    $("#social-popup__window").removeClass("popup--hidden");
  });

}
