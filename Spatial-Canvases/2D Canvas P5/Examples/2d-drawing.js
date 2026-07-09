// Static primitive-shape composition - using p5.js instance mode
var sketch1 = function(p) {
  var canvasWidth = 800;
  var canvasHeight = 400;
  var canvas;

  p.setup = function() {
    canvas = p.createCanvas(canvasWidth, canvasHeight);
    canvas.parent('canvas-container-1');
    p.noLoop();
  };

  p.draw = function() {
    // Bauhaus-style minimalist composition with expanded palette
    p.background(240, 235, 220); // updated warm off-white background

    // Ensure no strokes for pure color blocks
    p.noStroke();

    // Large rotated lemon-yellow rectangle (left anchor)
    p.push();
    p.rectMode(p.CENTER);
    p.translate(180, 220);
    p.rotate(-0.18);
    p.fill(255, 215, 0, 200); // 柠檬黄 (alpha 200)
    p.rect(0, 0, 360, 180);
    p.pop();

    // Cobalt blue circle overlapping the rectangle
    p.push();
    p.fill(0, 80, 150, 200); // 钴蓝色 (alpha 200)
    p.translate(360, 140);
    p.rotate(0.08);
    p.ellipse(0, 0, 240, 240);
    p.pop();

    // Vermilion triangle as counterbalance (each shape a different color)
    p.push();
    p.fill(210, 50, 45, 200); // 朱红色 (alpha 200)
    p.translate(260, 260);
    p.rotate(0.06);
    p.triangle(-100, 80, 100, 80, 0, -140);
    p.pop();

    // Small deep ochre rectangle accent on the right
    p.push();
    p.fill(140, 80, 40, 200); // 深赭色 (alpha 200)
    p.translate(520, 260);
    p.rotate(-0.12);
    p.rectMode(p.CENTER);
    p.rect(0, 0, 80, 120);
    p.pop();
  };

  function drawSoftGrid() {
    p.stroke(213, 198, 175, 120);
    p.strokeWeight(1);
    for (var x = 40; x <= p.width - 40; x += 40) {
      p.line(x, 0, x, p.height);
    }
    for (var y = 40; y <= p.height - 40; y += 40) {
      p.line(0, y, p.width, y);
    }
  }

  function drawFoldedField() {
    // Base folded field band (keep as a background element)
    p.noStroke();
    p.fill(31, 45, 61);
    p.rect(70, 250, 660, 42, 20);

    // LEFT: Triangle(s) and large circle (moved left, blue and green, scaled ~2x)
    p.noStroke();
    p.fill(54, 126, 230); // blue triangles
    // two larger blue triangles placed on the left, roughly scaled 2x
    p.triangle(120, 220, 220, 20, 320, 220);
    p.triangle(200, 240, 380, 40, 520, 240);

    // large green circle, scaled 2x and positioned on the left near the triangles
    p.fill(34, 139, 34); // green
    p.ellipse(200, 180, 328, 328);
    // arc to give the lower half shading (keep original dark arc style)
    p.fill(31, 45, 61);
    p.arc(200, 180, 328, 328, p.PI, p.TWO_PI);

    // RIGHT: rotated purple rectangle and other right-side accents
    // rotated rectangle (drawn centered and rotated 90 degrees)
    p.push();
    p.rectMode(p.CENTER);
    p.translate(620, 180);
    p.rotate(p.HALF_PI);
    p.noStroke();
    p.fill(138, 43, 226); // purple
    p.rect(0, 0, 116, 108, 4);
    p.pop();

    // keep a decorative quad on the right
    p.fill(118, 74, 157);
    p.quad(558, 118, 680, 160, 644, 268, 516, 226);

    // smaller soft ellipse on the right (unchanged)
    p.fill(246, 235, 217, 215);
    p.ellipse(610, 192, 92, 92);
  }

  function drawForegroundMarks() {
    p.stroke(31, 45, 61);
    p.strokeWeight(3);
    for (var i = 0; i < 9; i++) {
      var x = 120 + i * 64;
      p.line(x, 318, x + 32, 340);
    }

    // Prominent red lines on the right, lengthened ~2x
    p.stroke(220, 20, 60);
    p.strokeWeight(6);
    p.line(560, 104, 740, 56);
    p.line(640, 310, 780, 252);

    // endpoint markers (moved to correspond with the new line positions)
    p.noStroke();
    p.fill(31, 45, 61);
    p.circle(560, 104, 18);
    p.circle(760, 252, 18);
    p.fill(244, 182, 71);
    p.circle(404, 86, 34);
  }
};

// Create the instance
var myp5_1 = new p5(sketch1, 'canvas-container-1'); 
