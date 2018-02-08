var navMain = document.querySelector('.main-nav');
  var navToggle = document.querySelector('.main-nav__toggle');

  navMain.classList.remove('main-nav--nojs');

  navToggle.addEventListener('click', function() {
    if (navMain.classList.contains('main-nav--closed')) {
      navMain.classList.remove('main-nav--closed');
      navMain.classList.add('main-nav--opened');
    } else {
      navMain.classList.add('main-nav--closed');
      navMain.classList.remove('main-nav--opened');
    }
  });

  var modaloverlay = document.querySelector('.modal-overlay');
  var catalogbtn = document.querySelectorAll('.catalog__btn');
    console.log (catalogbtn);

    function addEventListenerList(list, event, fn) {
    for (var i = 0, len = list.length; i < len; i++) {
        list[i].addEventListener(event, fn, false);
    }
}

 function added() {
  if (modaloverlay.classList.contains('modal-close')) {
    modaloverlay.classList.remove('modal-close');
    modaloverlay.classList.add('modal-show');
  }
}

var ar_coins = document.getElementsByClassName('coins');
addEventListenerList(catalogbtn, 'click', added);



    window.addEventListener("keydown", function (evt) {
      if (evt.keyCode === 27) {
        if (modaloverlay.classList.contains("modal-show")) {
            modaloverlay.classList.remove("modal-show");
            modaloverlay.classList.add("modal-close");
        }
      }
    });
