console.log('> Example 35');

let beans = ['adzuki', 'soy', 'lima'];

function showBeans() {
  console.log('> \t -> showBeans: beans =', beans);
}

showBeans(); // [ 'adzuki', 'soy', 'lima' ]

beans = ['pinto ', 'kidney'];
showBeans(); // [ 'pinto ', 'kidney' ]

/*
 * function showBeans() {
 *  console.log(...);
 * }
 *
 * let beans = ['adzuki', 'soy', 'lima'];
 *
 * showBeans();
 *
 * beans = ['pinto ', 'kidney'];
 * showBeans();
 */
