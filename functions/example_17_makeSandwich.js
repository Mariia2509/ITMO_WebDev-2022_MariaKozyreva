console.log('> Example 17');

let bread = 'sourdough';

function makeSandwich() {
  let meat = ' spam';

  if (meat === ' spam') {
    meat += ' and eggs';
  }

  function getCheese() {
    let cheese = ' swiss';

    function condiment() {
      let condiment = ' sriracha';
      return condiment;
    }

    return cheese + condiment();
  }

  return bread + meat + getCheese();
}

console.log('> \t : makeSandwich() =', makeSandwich());
