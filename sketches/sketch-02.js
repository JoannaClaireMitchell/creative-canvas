const canvasSketch = require("canvas-sketch");
const math = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");

const settings = {
  dimensions: [1080, 1080],
  // animate: true,
};

const colors = ["coral", "darkOliveGreen", "DimGray", "Moccasin"];

const sketch = ({ context, width, height }) => {
  // Sketch constants
  const arcs = [];
  const rectangles = [];
  const count = 50;
  const radius = width * 0.7;
  console.log(arcs)

  // Canvas origin
  const cx = 0;
  const cy = 0;

  // Rectangle origins
  let rx, ry;

  for (let i = 0; i < count; i++) {
    const slice = math.degToRad(360 / count);
    const angle = slice * i;
    const shift = random.range(-width * 0.3, width * 0.3);
    rx = cx + (radius + shift) * Math.sin(angle);
    ry = cy + (radius + shift) * Math.cos(angle);

    // 1. canvas manipulation
      // move the origin of the canvas to the rectangle origins
      // rotate canvas to -angle
      // context.save();
      // context.translate(rx, ry);
      // context.rotate(-angle);
      // context.scale(random.range(1, 3), random.range(1, 5));
    // 2. draw rectangle
    // rectangles.push(new Rectangle(width, height))
    // 3. canvas manipulation
    // 4. draw arc
    arcs.push(new Arc(radius, slice, angle));
  }

  // per frame
  // color
  // velocity
  // start and end points of slice?
  // angle? (to animate slice moving along circumference)

  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    arcs.forEach((arc) => {
      context.save();
      context.translate(cx, cy);
      context.rotate(-arc.angle);

      context.lineWidth = random.range(5, 60);
      // context.strokeStyle = colors[randomColor];

      arc.draw(context)
    })

    context.translate(100, 400);
    context.beginPath();
    context.arc(0, 0, 50, 0, Math.PI * 2);
    context.fill();
  };
};

canvasSketch(sketch, settings);

class Rectangle {
  constructor(width, height){
    this.rw = width * 0.01;
    this.rh = height * 0.05;
  }

  draw(context){
    context.beginPath();
    context.rect(-rw * 0.5, random.range(0, -rh * 0.5), rw, rh);
    context.fill();
    context.restore();
  }
}

class Arc {
  constructor(radius, slice, angle){
    this.radius = radius;
    this.slice = slice;
    this.angle = angle;
  }

  draw(context){
    context.save();
    context.beginPath();
    context.arc(
      0,
      0,
      this.radius * random.range(0.3, 1.7),
      this.slice * random.range(0, -8),
      this.slice * random.range(1, 5)
    );
    context.stroke();
    context.restore();
  }
}

/**
 * stores constants needed and creates a new frame from both arcs and rectangles
 *
**/
class Frame {
  constructor(){

  }

  create(){

  }
}
