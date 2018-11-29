var canvas;
var w;
var h;

var font;

function preload() {
  font = loadFont('assets/Agenda-Super210.otf');
  
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  canvas.position(0,0);
  canvas.style('z-index', '-1');

  canvas.parent("parent_canvas");

  strokeCap(SQUARE);
  noFill();
} 

function draw() {
  w = windowWidth;
  h = windowHeight;

  background(255);

  translate(w / 2, h / 2);
  var circleResolution = map(mouseY, 0, height, 2, 80);
  var radius = mouseX - width / 2 + 0.5;
  var angle = TAU / circleResolution;

  strokeWeight(mouseY / 20);

  for (var i = 0; i <= circleResolution; i++) {
    var x = cos(angle * i) * radius;
    var y = sin(angle * i) * radius;
    line(0, 0, x, y);
  }

  /*
  fill('#ffffff');
  textSize(48);
  textAlign(CENTER);
  textStyle(BOLD);
  text("tom", 32,32);
  */
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}