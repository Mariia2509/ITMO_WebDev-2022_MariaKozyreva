console.log('> Example 11');

var a = 'ham';
const b = ' spam';

function addThem() {
  console.log('> \t -> addThem:', a + b);
}

addThem();

// Ключевое слове const никак не влияет на доступ к этой переменной внутри локальной "скоупа"
