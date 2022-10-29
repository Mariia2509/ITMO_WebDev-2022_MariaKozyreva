console.log('> Example 41');

let beans = 'peanut';

function shoutBeans() {
  return function () {
    beans = 'jack';
    console.log('> \t (closure) shoutBeans: beans.toUpperCase() =', beans.toUpperCase());
  };
}

let loudBeans = shoutBeans();
loudBeans();
console.log('> \t : beans =', beans);

/*
 * function shoutBeans() {
 *   return function() {
 *   beans = 'jack'; // The closure of this nested function has access to the global scope through
 *                   // the function in which it is nested.
 *     console.log(beans.toUpperCase());
 *   }
 * }
 * let beans;
 * beans = 'peanut';
 *
 * let loudBeans;
 * loudBeans = shoutBeans();
 *
 * loudBeans();
 * console.log(beans);
 */
