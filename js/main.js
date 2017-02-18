window.onload = function() {

  $(".list__info").next().slideToggle();

  $(".list__info").click(function() {
    $(this).next().slideToggle();
  });

}
