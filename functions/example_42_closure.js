console.log('> Example 42');

function shoutBeans() {
  return function () {
    beans = 'moth';
    console.log('> \t (closure) shoutBeans: beans.toUpperCase() =', beans.toUpperCase(), this.beans);
  };
}

let loudBeans = shoutBeans();
loudBeans(); // 'MOTH'
console.log('> \t : beans =', beans); // 'moth'
