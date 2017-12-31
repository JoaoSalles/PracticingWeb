$('li').text('learn jQuery is cool!!!')


$('ul.second').html("<li>Changed ul</li>")


$('img').attr('src',"http://www.highland-news.co.uk/imagelibrary/Client_Images/Client00007/00537000/00537150.jpg").css('width', "200px")


setTimeout(function(){
    $('h1').toggleClass("correct");
 },2000);

 setTimeout(function(){
    $('h1').toggleClass("correct");
 },4000);
