console.log('> Example 33');

teaTime();
var teaTime = 'shortcake';

teaTime();
function teaTime() {
  console.log('> \t -> teaTime: custard tart');
}

// Uncaught TypeError: teaTime is not a function

/*
 * function teaTime() {
 *   console.log('custard tart');
 * }
 *
 * teaTime(); // logs 'custard tart'
 *
 * teaTime = 'shortcake';
 * teaTime(); // cannot call a function on a variable that isn't assigned to one
 */
