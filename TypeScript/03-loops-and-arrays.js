var numbers = [5, 8, 7, 3, 7, 1];
var total = 0;
for (var i = 0; i < numbers.length; i++) {
    total = total + numbers[i];
    console.log(numbers[i]);
    console.log("Hola");
}
var average = 0;
console.log("Total " + total);
average = total / numbers.length;
console.log("El promedio de los numeros es " + average);
