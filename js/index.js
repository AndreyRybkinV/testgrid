"use strict"

var t=0; //показатель переключения режима просмотра (0 - плитка/1 - список), нужен при добавлении товара на страницу

/* Ассинхронная загрузка товара из файла JSON */

$.ajax({
	url: 'js/product.json',
	type: 'POST',
  error:
        function(){
            alert("Ошибка данных");

        },
  success: successFn
});



function successFn (data) {
  var items = [];
  $.each( data, function( key, val ) {
    items.push(val);
  }); 

  var count = 8; // количество товара, выводимого на страницу

  var $box = [];
  $("#container").html('<div id="content"></div>');
  
  for (var i=0; i<count; i++) {
     if(items[i]) {
        $box[i]= $( '<div class="box">ТОВАР №'+items[i]+'</div>' )
        $("#content").append($box[i]);
     }
  }

  $('#but').click(function(){ // Добавление товара чере кнопку "Показать еще"
     var add = count*2;
     for (var i=count; i<add; i++) {
        if(items[i]) {      
           $box[i]= $( '<div class="box">ТОВАР №'+items[i]+'</div>' )
           $("#content").append($box[i]);
        }
     }
     count = add;
     if(t==1) {list();} else {tile();}
  });

}

/* Включение режима плитка */

function tile() {
   t = 0;
   $(".box").css('width', '29%');
   $("#content").css('padding', '10px');
  
 if(window.innerWidth<=1024) {
   $(".box").css('width', '45%');
   $("#content").css('padding', '5px');
 }
 if(window.innerWidth<=768) {
   $(".box").css('width', '96%');
   $("#content").css('padding', '0');
 }
}

/* Включение режима список */

function list() {
  t = 1;
  $(".box").css('width', '96%');
  $("#content").css('padding', '0');
}

/* Автоматическая корректировка отображения в режиме плитка, при изменнеии размера окна */

$(window).resize(function(){
if(t==0) {   
   $(".box").css('width', '29%');
   $("#content").css('padding', '10px');
  
 if(window.innerWidth<=1024) {
   $(".box").css('width', '45%');
   $("#content").css('padding', '5px');
 }
 if(window.innerWidth<=768) {
   $(".box").css('width', '96%');
   $("#content").css('padding', '0');
 }
} else {
  return false;
}
});









