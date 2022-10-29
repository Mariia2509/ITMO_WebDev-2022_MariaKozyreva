console.log('> Example 37');

function shoutBeans() {
  let beans = 'green';

  return function (number) {
    console.log('\t (closure) beans.toUpperCase() =', beans.toUpperCase() + ` number = ${number}`);
  };
}

let loudBeans = shoutBeans();

loudBeans();
loudBeans(1);
loudBeans(3);

/*
 * function shoutBeans() {
 *   let beans
 *   beans = 'green'
 *
 *   return function() {
 *     console.log(beans.toUpperCase());
 *   }
 * }
 *
 * let loudBeans
 * loudBeans = shoutBeans();
 *
 * loudBeans();
 */
