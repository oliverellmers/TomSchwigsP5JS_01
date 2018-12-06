

var canvas;
var w;
var h;

var font;
var fontsize = 128;
var bounds;
var message = "TOM\nSCHWAIGER";
var tx, ty; // x and y coordinates of the text

function preload() {
  font = loadFont('assets/Nadir-Light.otf');
  
}

function setup() {
  noCursor();
  /*
  canvas = createCanvas(windowWidth, windowHeight, P2D);
  pixelDensity(1);
  canvas.position(0,0);
  canvas.style('z-index', '-1');

  canvas.parent("parent_canvas");
  */
  createCanvas(windowWidth, windowHeight, P2D);
  pixelDensity(1);
  //position(0,0);
  //style('z-index', '-1');


  strokeCap(SQUARE);
  noFill();

  textFont(font);
  textSize(fontsize);

  bounds = font.textBounds(message, 0, 0, fontsize);
  tx = windowWidth / 2 - bounds.w / 2;
  ty = windowHeight / 2 - bounds.h / 2;
  

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

  
  push();
  textAlign(CENTER, CENTER);
  fill(0,0,0);
  stroke(0,0,0);
  text(message, windowWidth/2, windowHeight/2);
  bounds = font.textBounds(message,windowWidth/2, windowHeight/2,fontsize);
  pop();
  blendMode(NORMAL);

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
  
  ellipse(mouseX, mouseY, 24, 24);
  
  blendMode(NORMAL)





  //filter(INVERT);
  
  

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}