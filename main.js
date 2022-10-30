
function updateFullName (){
    let num1, num2, num3, result
    num1 = document.getElementById('n1').value;
    num2 = document.getElementById('n2').value;
    num3 = document.getElementById('out');

    result = num1 +' '+ num2;
    num3.innerHTML  = result;
}
