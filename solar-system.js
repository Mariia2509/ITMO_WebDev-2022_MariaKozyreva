export class Position {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

export class Planet {
    constructor(color, atmosphere, position, size) {
        this.atmosphere = atmosphere;
        this.position = position;
        this.size = size;
    }

        render(ctx) {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.strokeStyle = this.atmosphere;
            // ctx.lineWidth = 10;
            ctx.arc(this.position.x, this.position.y, this.size, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.fill();
        }



    }

    export class PlanetComposable {
    constructor(position, renderAlgorithm, moveAlgorithm) {
        this.position = position;
        this.renderAlgorithm = renderAlgorithm;
        this.moveAlgorithm = moveAlgorithm;

    }
    move() {
        if(this.moveAlgorithm){
            this.moveAlgorithm.render()

        }
    }

    render(ctx) {
        if (this.renderAlgorithm) this.renderAlgorithm.render(ctx)
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.strokeStyle = this.atmosphere;
        // ctx.lineWidth = 10;
        ctx.arc(this.position.x, this.position.y, this.size, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
    }
}

export class Sun extends Planet {
    constructor(position) {
        super('red', 'yellow', position, 100);
    }
}

export class RotatePlanet extends Planet {
    constructor(color, atmosphere, size, center, radius, speed) {
        super(color, atmosphere, new Position(center.x + radius + size, center.y + radius + size), size);
        this.radius = radius;
        this.center = center;
        this.alpha = 0;
        this.speed = speed

    }
    rotate() {
        this.alpha += this.speed / Math.PI;
        this.position.x = this.radius * Math.sin(this.alpha) + this.center.x;
        this.position.y = this.radius * Math.cos(this.alpha) + this.center.y;
        if (this.alpha >= 2 * Math.PI) this.alpha = 0;
    }

}
export class Earth extends RotatePlanet {
    constructor(center, radius) {
        super('green', 'blue', 40, center, radius, 0.05);
        this.radius = radius;
        this.center = center;
        this.alpha = 0;
    }


    render(ctx) {
        super.render(ctx);
        ctx.fillStyle = 'blue';
        ctx.beginPath();
        ctx.arc(this.position.x - 10, this.position.y, this.size / 2, 0, 2 * Math.PI);
        ctx.fill();
    }
}

export class Mars extends RotatePlanet {
    constructor(center, radius) {
        super('green', 'red', 20, center, radius, 0.01) ;
        this.radius = radius;
        this.center = center;
        this.alpha = 0;

    }

    render(ctx) {
        super.render(ctx);
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(this.position.x - 10, this.position.y, this.size / 2, 0, 2 * Math.PI);
        ctx.fill();
    }
}

export class Moon extends RotatePlanet {
    constructor(center, radius) {
        super('gray', 'red', 9, center, radius, -0.09);

    }


    render(ctx) {
        super.render(ctx);
        ctx.fillStyle = 'blue';
        ctx.beginPath();
        ctx.fill();
    }
}
