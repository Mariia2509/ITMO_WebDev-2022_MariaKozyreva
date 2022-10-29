console.log('> Example 19');

let bread = 'sourdough';

function makeSandwich() {
  let meat = ' spam';
  let condiment = ' mayo';

  function getCheese() {
    let cheese = ' swiss';

    if (cheese) {
      let condiment = ' sriracha';
    }

    return cheese + condiment;
  }

  return bread + meat + getCheese();
}

console.log('> \t : makeSandwich() =', makeSandwich());

// sourdough spam swiss mayo
