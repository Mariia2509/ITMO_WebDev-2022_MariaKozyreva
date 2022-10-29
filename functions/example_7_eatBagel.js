console.log('> Example 7');

let numberOfBagels = 5;

function eatBagel() {
  numberOfBagels -= 1;
  if (numberOfBagels === 0) {
    console.log('> \t -> eatBagel: Oh nO, Out Of bagles!');
  } else {
    console.log(`> \t -> eatBagel: Yummy. There are ${numberOfBagels} left!`);
  }
}

eatBagel();
eatBagel();
console.log('> \t :', numberOfBagels);

// Функция eatBagel создает контекст выполнения, который создает локальный "скоуп", при выполнение функции
// интерпретатор смотрит есть ли внутри этого локального "скоупа" такое имя переменной как numberOfBagels,
// и не находит его, его там нет, тогда интерпретатор смотрит во внешнюю область выполнения, внешний "скоуп"
// пытаясь разрешить это имя (и так до самого верхнего-глобального "скоупа")
