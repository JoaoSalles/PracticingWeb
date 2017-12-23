var toChange = document.querySelector("#ButtoToChange");

// just the div
// function changeColor(){
//     console.log(this.style.background)
//     if (this.style.background == "purple none repeat scroll 0% 0%") {
//         this.style.background = "white";
//     }else{
//         this.style.background = "purple";
//     }
// }

// get all body
// function changeColor(){
//     if (document.body.style.background == "purple none repeat scroll 0% 0%") {
//         document.body.style.background = "white";
//     }else{
//         document.body.style.background = "purple";
//     }
// }
// var isPurple = false;

// function changeColor(){
//     if (isPurple) {
//         document.body.style.background = "white";
//     }else{
//         document.body.style.background = "purple";
//     }
//     isPurple = !isPurple;
// }

function changeColor(){
    document.body.classList.toggle("purple");
}


toChange.addEventListener("click",changeColor);