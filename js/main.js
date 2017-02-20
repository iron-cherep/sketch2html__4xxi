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

}
