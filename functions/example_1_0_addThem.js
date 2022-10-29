console.log('> Example 1');

let a = 5;
let b = 6;

function addThem() {
  console.log('> \t : addThem', a + b);
}

console.log('> \t :', { a, b });
addThem();

// В консоли будет число 11, локальный scope функции имеет доступ к внешнему scope
