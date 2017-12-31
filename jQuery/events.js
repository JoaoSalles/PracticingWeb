

// $('button').click(function(){
//     $(this).css('background', "pink");
// })

$('input[type="text"]').keypress(function(event){
    if (event.which === 13){
        alert("user pressed enter!");
    }
});


$('h1').on("click",function(){
    $(this).css('color','purple');
});


$('button').on("mouseenter",function(){
    $(this).css('font-weight','bold');
});

// $('button').on("mouseout",function(){
//     $(this).css('font-weight','normal');
// });

$('button').on("mouseleave",function(){
    $(this).css('font-weight','normal');
});