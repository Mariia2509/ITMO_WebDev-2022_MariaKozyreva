console.log('> Example 26');

function stringCheese(cheese) {
  cheese = cheddar;
  var cheddar = 'sharp';
  console.log('> \t -> stringCheese: cheese =', cheese);
}
stringCheese('mozzarela'); // cheese = undefined

console.log('> \t : cheddar =', cheddar); // Uncaught ReferenceError: cheddar is not defined
