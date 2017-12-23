var age = prompt("What is your age");

// alert("The amount of days that you lived is: " + (age * 365))

if ((age % 2) == 0){
    alert('Your age is even');
}else if((age % 2) == 1){
    alert('Your age is odd');
}

if (age % Math.sqrt(age) == 0){
    alert ('Perfect square')
}