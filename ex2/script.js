function getRandomColor() {
 function c() {
    var hex = Math.floor(Math.random()*256).toString(16);
    return ("0"+String(hex)).substr(-2); 
  }
  return "#"+c()+c()+c();
}
	

$("document").ready(function () {
	
    var $cube = 8;
    for (i = 0; i < $cube; i++) {
    	
    $(" main").append(createSquare());
    }
    $(".rec:last").addClass("plus");
    $(".rec.plus").click(function () {
    $("main").prepend(createSquare());
    })
    $("main").on("click", ".rec:not(.plus)", function () {
       $("main").on("click", ".rec:not(.plus)", Star);
    })
})

function Star() {
  
    if ($(this).hasClass("star") == true)
        $(this).removeClass("star");
    else
        $(this).addClass("star");
   
   
}	
function createSquare(){
    var new_square = $("<article></article>");
    new_square.css("background-color", getRandomColor());
    new_square.addClass("rec");   
    return new_square;
}












