console.log('> Example 9');

let numberOfBagels = 5;

function eatBagel(numberOfBagels) {
  numberOfBagels -= 1;
  if (numberOfBagels === 0) {
    console.log('> \t -> eatBagel: Oh nO, Out Of bagles!');
  } else {
    console.log(`> \t -> eatBagel: Yummy. There are ${numberOfBagels} left!`);
  }
}

eatBagel(numberOfBagels);
eatBagel(numberOfBagels);
console.log('> \t : numberOfBagels =', numberOfBagels);
