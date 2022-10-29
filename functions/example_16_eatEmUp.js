console.log('> Example 16');

let food = 'sushi';

function eatEmUp() {
  function sauceEmUp() {
    let sauce = ' garlic soy';
  }

  sauceEmUp();

  console.log('> \t -> eatEmUp: (food + sauce) =', food + sauce);
}

eatEmUp();

// Uncaught ReferenceError: sauce is not defined
