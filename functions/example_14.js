console.log('> Example 14');

function chopIt() {
  let pieces = 10;
}

chopIt();
console.log('> \t : pieces =', pieces);

// В глобальной области видимости нельзя использовать переменные из функционального "скоупа"
// Uncaught ReferenceError: pieces is not defined
