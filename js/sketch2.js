var message = "TOM SCHWAIGER";
var font,
  bounds, // holds x, y, w, h of the text's bounding box
  fontsize = 128,
  x, y; // x and y coordinates of the text

var w;
var h;

function preload() {
  font = loadFont('assets/Nadir-Light.otf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // set up the font
  textFont(font);
  textSize(fontsize);

  // get the width and height of the text so we can center it initially
  bounds = font.textBounds(message, 0, 0, fontsize);
  x = width / 2 - bounds.w / 2;
  y = height / 2 - bounds.h / 2;


  strokeCap(SQUARE);
  noFill();
}

function draw() {
  w = windowWidth;
  h = windowHeight;


  background(255);

  push();
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
  pop();

  // write the text in black and get its bounding box
  fill(255);
  textAlign(CENTER, CENTER);
  text("TOM\nSCHWAIGER", windowWidth/2, windowHeight/2);
  bounds = font.textBounds(message,windowWidth/2,windowHeight/2 + 50,fontsize);

  

  

  // check if the mouse is inside the bounding box and tickle if so
  if ( mouseX >= bounds.x && mouseX <= bounds.x + bounds.w &&
    mouseY >= bounds.y && mouseY <= bounds.y + bounds.h) {
    filter(INVERT);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}