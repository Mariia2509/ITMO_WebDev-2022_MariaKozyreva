import {Earth, Mars, Moon, PlanetComposable, Position, RotatePlanet, Sun} from "./solar-system.js";

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

window.requestAnimationFrame(renderPlanets);

class RenderCirclePlanetAlgorithm {
  constructor(color, atmosphere, size) {
    this.color = color;
    this.atmosphere = atmosphere;
    this.size = size;
  }
  render(ctx, position) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.strokeStyle = this.atmosphere;
    ctx.arc(position.x, position.y, this.size / 2, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
  }
}

class RenderSquarePlanetAlgorithm {
  constructor(color, atmosphere, size) {
    this.color = color;
    this.atmosphere = atmosphere;
    this.size = size;
  }
  render(ctx, position) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.strokeStyle = this.atmosphere;
    ctx.rect(position.x, position.y, this.size, this.size);
    ctx.stroke();
    ctx.fill();
  }
}

class MoveRotateAlgorithm {
  constructor(radius, speed) {
    this.radius = radius;
    this.speed = speed;
    this.alpha = 0;
  }
  move(position, offset) {
    this.alpha += this.speed / Math.PI;
    position.x = this.radius * Math.sin(this.alpha) + offset.x;
    position.y = this.radius * Math.cos(this.alpha) + offset.y;
    if (this.alpha >= 2 * Math.PI) this.alpha = 0;
  }
}

const r1 = new RenderCirclePlanetAlgorithm('blue', 'lightblue', 50);
const r2 = new RenderSquarePlanetAlgorithm('red', 'lightblue', 30);

const planetComposable = new PlanetComposable(new Position(100, 100), r1, new MoveRotateAlgorithm ( 100, 0.05 ))

document.onclick = (e) =>{
  // console.log("jj")
  planetComposable.offset = new Position(e.pageX, e.pageY);
  if (planetComposable.renderAlgorithm instanceof RenderCirclePlanetAlgorithm) {
    planetComposable.renderAlgorithm = r2;
  } else planetComposable.renderAlgorithm = r1;

  asteroid.push(createAsteroid(e.pageX, e.pageY));
};

const asteroid = [...new Array(5)].map() => createAsteroid ()



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
      if (index < counter) draw(++index)
    }

    draw(0)

    function randomRange(max, min) {
      if (isNaN(max) || isNaN(min) throw new Error('>randomRange - error: "Input parameters must be a number"');
      return Math.random() * (max - min) + min;
    }

    function createAsteroid(x, y) {
      const borderSize = 10;
      const randomX = x || randomRange(canvas.width - borderSize, borderSize);
      const randomY = y || randomRange(canvas.height - borderSize, borderSize);
      return new Position(randomX, randomY);

    }
  }

  window.requestAnimationFrame(renderPlanets);


