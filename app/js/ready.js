$('document').ready(function(){

  var doc = document.documentElement;
  doc.setAttribute('data-useragent', navigator.userAgent);

  $('.print a').click(function() {
    window.print();
  });
});