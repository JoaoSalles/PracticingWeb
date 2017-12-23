var number = [1,2,3,4];


function printReverse(seguence){
    for (var i = seguence.length-1; i >= 0; i--){
        console.log(seguence[i]);
    }
}

printReverse(number);


function isUniform(sequence){
    if (sequence.length > 0){
        var aux_number = sequence[0];
        for (var i = 1; i < sequence.length;i++){
            if (aux_number != sequence[i]){
                return false;
            }
        }
        return true;
    }
    else
    {
        return true;
    }
}

console.log(isUniform(number));

console.log(isUniform([1,1,1,1]));

console.log(isUniform([]));

console.log(isUniform(['a','a','a']));

console.log(isUniform(['a','a','b']));


function sumArray(sequence){
    var sum = 0;
    for (var i = 0; i < sequence.length; i++){
        if (!isNaN(sequence[i])){
            sum += sequence[i];
        }
    }
    return sum
}

console.log(sumArray(['a','a','b',1]));

console.log(sumArray([1,1,2,3,5]));

