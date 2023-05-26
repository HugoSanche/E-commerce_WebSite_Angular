let numbers:number[]=[5,8,7,3,7,1];
let total:number=0;

for(let i=0; i<numbers.length;i++){
    total=total+numbers[i];
    console.log(numbers[i]);
}
let average:number=0;
console.log("Total "+total);

average=total/numbers.length;

console.log("El promedio de los numeros es "+average);

