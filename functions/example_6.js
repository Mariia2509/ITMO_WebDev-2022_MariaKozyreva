console.log('> Example 6');

let tea = 'sweet';

if (true) {
  tea = 'sour';
  var tea = 'iced';
}

console.log('> \t :', tea);

// создание переменной var tea в локальном "скоупе" будет "поднято" hoisted вне блока,
// что значит что оба определения tea будут определены в глобальном "скоупе", что приведет к ошибке

// Uncaught SyntaxError: Identifier 'tea' has already been declared
