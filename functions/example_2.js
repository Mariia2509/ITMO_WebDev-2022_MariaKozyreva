console.log('> Example 2');

let dessert = 'ice cream';

if (dessert) {
  if (dessert.length < 5) {
    console.log('> \t: quick snack');
  } else {
    console.log('> \t: lengthy treat');
  }
}

// Все вложенные if блоки имеют доступ к глобальному "скопу"
