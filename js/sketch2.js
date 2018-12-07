var message = "TOM SCHWAIGER";
var font,
  bounds, 
  fontsize = 148,
  x, y; 

var w;
var h;

var isOverSketch = false;

function preload() {
  font = loadFont('assets/Nadir-Light.otf');
}

function setup() {
  noCursor();
  createCanvas(windowWidth, windowHeight, P2D);

  textFont(font);
  textSize(fontsize);

  bounds = font.textBounds(message, 0, 0, fontsize);
  x = width / 2 - bounds.w / 2;
  y = height / 2 - bounds.h / 2;


  strokeCap(SQUARE);
  noFill();

}

function draw() {
  w = windowWidth;
  h = windowHeight;


  background(0);

  push();
  translate(w / 2, h / 2);
  var circleResolution = map(mouseY, 0, height, 2, 80);
  var radius = mouseX - width / 2 + 0.5;
  var angle = TAU / circleResolution;

  strokeWeight(mouseY / 20);

  for (var i = 0; i <= circleResolution; i++) {
    var x = cos(angle * i) * radius;
    var y = sin(angle * i) * radius;
    stroke(255);
    line(0, 0, x, y);
  }
  pop();

  push();
  fill(0);
  textAlign(CENTER, CENTER);
  text("TOM\nSCHWAIGER", windowWidth/2, windowHeight/2);
  bounds = font.textBounds(message,windowWidth/2,windowHeight/2 + 50,fontsize);
  pop();

  


  if ( mouseX >= bounds.x && mouseX <= bounds.x + bounds.w &&
    mouseY >= bounds.y && mouseY <= bounds.y + bounds.h) {
    filter(INVERT);
  }


  blendMode(DIFFERENCE);
  if(isOverSketch ){
    fill(255,255,255, 255);
  }else{
    fill(255,255,255, 0);
  }
  fill(255,255,255, 255);
  push();
  ellipse(mouseX, mouseY, 24, 24);
  pop();
  blendMode(NORMAL)
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}