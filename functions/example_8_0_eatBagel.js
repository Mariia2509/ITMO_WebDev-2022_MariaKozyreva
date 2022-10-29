console.log('> Example 8');

let numberOfBagels = 5;

function eatBagel(bagels) {
  bagels -= 1;
  if (bagels === 0) {
    console.log('> \t -> eatBagel: Oh nO, Out Of bagles!');
  } else {
    console.log(`> \t -> eatBagel: Yummy. There are ${bagels} left!`);
  }
}

eatBagel(numberOfBagels);
eatBagel(numberOfBagels);
console.log('> \t :', numberOfBagels);

// В данном случае параметр функции bagels создается (определяется) как локальная переменная
// внутри локальной области выполнения функции eatBagel. При вызове функции eatBagel этой переменной bagels
// присваивается значение, каждый раз заново (пеменная заново создается вместе с область выполнения и локальным "скоупом",
// в данном случае оно дублируется и отвязывается от значения внешней переменной
