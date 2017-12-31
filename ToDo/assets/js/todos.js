
// click on delete
$('ul').on("click",'.DeleteIcon',function(event){
    // $(this).parent
    // do not trigger other events
    event.stopPropagation();
    $(this).parent().fadeOut(500,function(){
        $(this).remove();
    });
});

// change color on click
$('ul').on('click',"li",function(){;
    $(this).toggleClass("Completed");
});


// // show delete icon
// $('ul').on('mouseenter',"li",function(){
//     $(this).find('.DeleteIcon').animate({width:'toggle'},350)
// });

// // show delete icon
// $('ul').on('mouseleave',"li",function(){
//     $(this).find('.DeleteIcon').animate({width:'toggle'},350)
// });

// add to do
$("input[type='text']").keypress(function(event){
    if (event.which == 13){
        // get value in input
        var todoText = $(this).val();
        // add new li
        $("ul").append('<li><span class="DeleteIcon">\
        <i class="fa fa-trash-o" aria-hidden="true"></i>\
        </span> ' + todoText + '</li>');
    }
})

$('.fa-plus').on("click",function(){
    $("input[type='text']").fadeToggle();
})