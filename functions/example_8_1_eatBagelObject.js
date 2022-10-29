console.log('> Example 8.1');

let bagels = { number: 5 };

function eatBagelObject(bagels) {
  bagels.number -= 1;
  if (bagels.number === 0) {
    console.log('> \t -> eatBagel: Oh nO, Out Of bagles!');
  } else {
    console.log(`> \t -> eatBagel: Yummy. There are ${bagels.number} left!`);
  }
}

eatBagelObject(bagels);
eatBagelObject(bagels);
console.log('> \t : bagels =', bagels);
