const canvasSketch = require("canvas-sketch");
const math = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");

const settings = {
  dimensions: [1080, 1080],
};

const colors = ["coral", "darkOliveGreen", "DimGray", "Moccasin"];

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    const cx = 0;
    const cy = 0;
    const rw = width * 0.01;
    const rh = height * 0.05;
    let rx, ry;

    const count = 50;
    const radius = width * 0.7;

    for (let i = 0; i < count; i++) {
      const slice = math.degToRad(360 / count);
      const angle = slice * i;
      const randomColor = Math.floor(random.range(0, colors.length));
      const shift = random.range(-width * 0.3, width * 0.3);

      rx = cx + (radius + shift) * Math.sin(angle);
      ry = cy + (radius + shift) * Math.cos(angle);

      // Canvas manipulations
      context.save();
      context.translate(rx, ry);
      context.rotate(-angle);
      context.scale(random.range(1, 3), random.range(1, 5));

      context.fillStyle = colors[randomColor];

      // Line paths
      context.beginPath();
      context.rect(-rw * 0.5, random.range(0, -rh * 0.5), rw, rh);
      context.fill();
      context.restore();

      // canvas manipulations
      context.save();
      context.translate(cx, cy);
      context.rotate(-angle);

      context.lineWidth = random.range(5, 60);
      context.strokeStyle = colors[randomColor];

      // Arc paths
      context.beginPath();
      context.arc(
        0,
        0,
        radius * random.range(0.3, 1.7),
        slice * random.range(0, -8),
        slice * random.range(1, 5)
      );
      context.stroke();
      context.restore();
    }

    // context.translate(100, 400);
    // context.beginPath();
    // context.arc(0, 0, 50, 0, Math.PI * 2);
    // context.fill();
  };
};

canvasSketch(sketch, settings);
