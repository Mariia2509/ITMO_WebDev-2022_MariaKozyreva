console.log('> Example 36');

let beans = 'lentil';

function showBeans() {
  console.log('> \t -> showBeans: beans =', beans);
}

showBeans(); // 'lentil

beans = 'meowmeow';
showBeans(); // 'meowmeow'

/*
 * function showBeans() {
 *  console.log(beans);
 * }
 *
 * let beans;
 * beans = 'lentil';
 *
 * showBeans();
 *
 * beans = 'meowmeow';
 * showBeans();
 */
