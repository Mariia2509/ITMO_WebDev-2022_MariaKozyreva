console.log('> Example 5');

let tea = 'sweet';

if (true) {
  tea = 'sour';
  let tea = 'iced';
}

console.log('> \t :', tea);

// Переменная создается в локальном "скоупе" после того как она используется
// Uncaught ReferenceError: Cannot access 'tea' before initialization
//     at <anonymous>:4:7
