console.log('> Example 3');

let dessert = 'tart';

if (dessert) {
  let dessert = 'cannoli';
  if (dessert.length < 5) {
    console.log('> \t : quick snack');
  } else {
    console.log('> \t : lengthy treat');
  }
} else {
  console.log('> \t : no dessert...');
}

// Внутренние блоки имеют доступ к глобальному "споку", к переменной desert
// но новая локальная переменная с тем же именем "переписывает/перекрывает" (shadows)
// внешную переменную
