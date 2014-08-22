$('document').ready(function(){

  var doc = document.documentElement;
  doc.setAttribute('data-useragent', navigator.userAgent);

  $('.print a').click(function() {
    window.print();
  });
  
  //the navbar menu (small screen version) does not retract when an option is clicked
  $('body').on('click','.navbar-collapse .nav a',function(event){
    $('button.navbar-toggle').click();
  });
});