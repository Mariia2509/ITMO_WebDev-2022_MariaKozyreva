console.log('> Example 15');

let food = 'sushi';

function eatEmUp() {
  let sauce = ' soy';

  function mixEmUp() {
    console.log('> \t -> eatEmUp -> mixEmUp: (food + sauce) =', food + sauce);
  }

  mixEmUp();
}

eatEmUp();
