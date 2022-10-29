console.log('> Example 39');

let beans = 'peanut';

function shoutBeans() {
  let beans = 'green';

  return function () {
    console.log('> \t (closure) beans.toUpperCase() =', beans.toUpperCase());
  };
}

let loudBeans = shoutBeans();

loudBeans();

/*
 * function shoutBeans() {
 *   let beans
 *   beans = 'green'  // This is the only beans variable that is in scope for the below function!
 *
 *   return function() {
 *     console.log(beans.toUpperCase());
 *   }
 * }
 * let beans;
 * beans = 'peanut';
 *
 * let loudBeans;
 * loudBeans = shoutBeans();
 *
 * beans = 'chickpea';  // this is really a declaration of a new global scope variable!
 * loudBeans();
 */
