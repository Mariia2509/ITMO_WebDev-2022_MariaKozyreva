console.log('> Example 43');

function buildTaco(firstFilling, secondFilling) {
  return `Taco with ${firstFilling} and ${secondFilling}`;
}

function makeMeatTaco(meatFilling) {
  return function (otherFilling) {
    return buildTaco(meatFilling, otherFilling);
  };
}

let chickenTaco = makeMeatTaco('chicken');

console.log('> \t chickenTaco:', chickenTaco('grilled onions'));
console.log('> \t chickenTaco:', chickenTaco('salsa verde'));
