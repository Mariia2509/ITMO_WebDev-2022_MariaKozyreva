import {Earth, Mars, Moon, PlanetComposable, Position, RotatePlanet, Sun} from "./solar-system.js";

const canvas = document.createElement('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

canvas.style.backgroundColor = '#f1f1f1';

document.getElementById('app').append(canvas);

const ctx = canvas.getContext('2d');


const sun = new Sun(new Position(canvas.width / 2, canvas.height / 2));
const earth = new Earth(sun.position, sun.size + 100);
const mars = new Mars(sun.position, sun.size + 150);
const moon = new Moon(earth.position, earth.size + 15);

const planets = [sun, earth, mars, moon];

window.requestAnimationFrame(renderPlanets);

class renderCirclePlanetAlgorithm {
  constructor(color, atmosphere, size) {
    this.color = color;
    this.atmosphere = atmosphere;
    this.size = size;
  }
  render(ctx, position) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(position.x, position.y, this.size / 2, 0, 2 * Math.PI);
    ctx.fill();
  }

}

class moveRotateAlgorithm {
  constructor(center, radius, speed) {
    this.center = center;
    this.radius = radius;
    this.speed = speed;
  }
  move(position) {
    this.alpha += this.speed / Math.PI;
    position.x = this.radius * Math.sin(this.alpha) + offset.x;
    position.y = this.radius * Math.cos(this.alpha) + offset.y;
    if (this.alpha >= 2 * Math.PI) this.alpha = 0;
  }

}

const planetComposable = new PlanetComposable(
    new Position(100, 100),
    new renderCirclePlanetAlgorithm ('blue', 'lightblue', 50),
    new moveRotateAlgorithm (sun.position, 100, 0.05)
);

document.onclick = (e) =>{
  planetComposable.offset = new Position(e.pageX, e.pageY);
};



function renderPlanets() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  planetComposable.render(ctx);

  planets.forEach((item) => {
    if (item instanceof RotatePlanet)
    {
      item.rotate();
    }
    item.render(ctx);
});

  window.requestAnimationFrame(renderPlanets);
}
