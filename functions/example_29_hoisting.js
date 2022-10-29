console.log('> Example 29');

teaTime();
let snack = 'scones';

function teaTime() {
  console.log('> \t -> teaTime: snack =', snack);
}

// Uncaught ReferenceError: snack is not defined

/*
 * function teaTime() {
 *   console.log(snack);
 * }
 *
 * let snack;  // no defined value assigned
 *
 * teaTime();
 * snack = 'scones'
 */
