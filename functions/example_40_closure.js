console.log('> Example 40');

let beans = 'peanut';

function shoutBeans() {
  let beans = 'green';

  return function () {
    let beans = 'red';
    console.log('> \t (closure) beans.toUpperCase() =', beans.toUpperCase(), this.beans);
  };
}

let loudBeans = shoutBeans();

loudBeans();

// this.beans = beans;
//
// loudBeans();

/*
 * function shoutBeans() {
 *   let beans;
 *   beans = 'green';
 *
 *   return function() {
 *   let beans;
 *   beans = 'red';
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
 */
