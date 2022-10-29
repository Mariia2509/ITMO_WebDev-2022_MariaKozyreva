console.log('> Example 10');

var a = 5;
const b = 6;

function addThem() {
  console.log('> \t -> addThem:', a + b);
}

addThem();

// Ключевое слове let никак не влияет на доступ к этой переменной внутри локальной "скоупа"
