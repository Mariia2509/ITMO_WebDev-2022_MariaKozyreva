console.log('> Example 18');

let bread = 'sourdough';

function makeSandwich() {
  let meat = ' spam';
  let condiment = 'mayo';

  function getCheese() {
    let cheese = ' swiss';

    function condiment() {
      let condiment = ' sriracha';
    }

    condiment();
    return cheese + condiment;
  }

  return bread + meat + getCheese();
}

console.log('> \t : makeSandwich() =', makeSandwich());

// sourdough spam swissfunction condiment() {
//       let condiment = ' sriracha';
//     }
