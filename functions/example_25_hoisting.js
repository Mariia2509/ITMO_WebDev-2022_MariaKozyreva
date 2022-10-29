console.log('> Example 25');

function stringCheese(cheese) {
  cheese = cheddar;
  console.log('> \t -> stringCheese: cheese =', cheese);
  let cheddar = 'sharp';
}
stringCheese('camembert');

// Uncaught ReferenceError: Cannot access 'cheddar' before initialization
