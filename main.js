import {Earth,
        Mars,
        Moon, MoveRotateAlgorithm,
        PlanetComposable,
        Position,
        RenderCirclePlanetAlgorithm, RenderSquarePlanetAlgorithm,
        RotatePlanet,
        Sun,
} from "./solar-system.js";

const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.backgroundColor = '#f1f1f1';

document.getElementById('app').append(canvas);

const ctx = canvas.getContext('2d');

const sun = new Sun(new Position(canvas.width / 2, canvas.height / 2));
const earth = new Earth(sun.position, sun.size + 100);
const mars = new Mars(sun.position, sun.size + 250);
const moon = new Moon(earth.position, earth.size + 30);

const planets = [sun, earth, mars, moon];

const r1 = new RenderCirclePlanetAlgorithm('blue', 'lightblue', 50);
const r2 = new RenderSquarePlanetAlgorithm('red', 'lightblue', 30);
const m1 = new MoveRotateAlgorithm (100, 0.05);

const planetComposable = new PlanetComposable(new Position(100, 100), r1, m1);

document.onclick = (e) =>{
  // console.log("jj")
  planetComposable.offset = new Position(e.pageX, e.pageY);
  if (planetComposable.renderAlgorithm instanceof RenderCirclePlanetAlgorithm) {
    planetComposable.renderAlgorithm = r2;
  } else planetComposable.renderAlgorithm = r1;

  asteroid.push(createAsteroid(e.pageX, e.pageY));
};

const asteroid = [...new Array(5)].map(() => createAsteroid ())



function renderPlanets() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);


  planetComposable.move();

  renderAsteroids(canvas, asteroid);

  planets.forEach((item) => {
    if (item instanceof RotatePlanet) {
      item.rotate();
    }
    item.render(ctx);
  });

  planetComposable.render(ctx);

  window.requestAnimationFrame(renderPlanets);
}

  function renderAsteroids (canvas, array) {
    const ctx = canvas.getContext('2d');
    let counter = array.length
    const draw = (index) => {
      const position = array[index]
      ctx.fillStyle = 'black'
      ctx.fillRect(position.x, position.y, 100, 100);
      ctx.stroke();
      ctx.fill();
      if (++index < counter) draw(index)
    }

    draw(0)
  }
    function randomRange(max, min) {
      if (isNaN(max) || isNaN(min)) throw new Error('>randomRange - error: "Input parameters must be a number"');
      return Math.random() * (max - min) + min;
    }

    function createAsteroid(x, y) {
      const borderSize = 10;
      const randomX = x || randomRange(canvas.width - borderSize, borderSize);
      const randomY = y || randomRange(canvas.height - borderSize, borderSize);
      return new Position(randomX, randomY);

    }

  window.requestAnimationFrame(renderPlanets);


