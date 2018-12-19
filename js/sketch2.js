var textObject;
var font;
var fontSize = 125;
var bounds;
var x, y;
var message = "TOM\nSCHWAIGER";

var w;
var h;

var isOverSketch = false;
var isMobile = false;
var isOverParagraph = false;

var angle1=0;
var scalar = 1;

function preload(){
  font = loadFont('assets/Nadir-Light.otf');
}


function setup() {
  noCursor();
  getMobileOperatingSystem();
  var multiCanvas = createCanvas(windowWidth, windowHeight, P2D);
  multiCanvas.style('display', 'block');

  textFont(font);
  textSize(fontSize);

  bounds = font.textBounds(message, 0, 0, fontSize);
  x = width / 2 - bounds.w / 2;
  y = height / 2 - bounds.h / 2;


  multiCanvas.strokeCap(SQUARE);
  noFill();

  multiCanvas.parent("multiCanvas");
  multiCanvas.mouseOver(overSketch);
  multiCanvas.mouseOut(outSketch);
  multiCanvas.mouseClicked(mClick);


  scalar = windowWidth;

}
function overParagraph(){
  isOverParagraph = true;
}

function outParagraph(){
  isOverParagraph = false;
}

function mClick(){
  window.location.href = 'https://www.tomschwaiger.co/work';
}

function overSketch() {
  isOverSketch = true;
}

function outSketch() {
  isOverSketch = false;
}

function draw() {
  w = windowWidth;
  h = windowHeight;

  var mx = mouseX;
  var my = mouseY;

  if(isMobile){

    var ang1 = radians(angle1);
    var mx = -width + (scalar * sin(ang1));
    var my = height/2 + (scalar * cos(ang1));
    angle1 += 0.5;
  }


  background(255);

  push();
  translate(w / 2, h / 2);
  var circleResolution = map(my, 0, height, 2, 80);
  var radius = mx - width / 2 + 0.5;
  var angle = TAU / circleResolution;

  strokeWeight(my / 20);

  for (var i = 0; i <= circleResolution; i++) {
    var x = cos(angle * i) * radius;
    var y = sin(angle * i) * radius;
    strokeCap(SQUARE);
    stroke(0);
    line(0, 0, x, y);
  }
  pop();


  push();
  textAlign(CENTER, CENTER);
  fontSize = width/6.5;
  textSize(fontSize);
  fill(0);
  text(message, width/2, height/2);
  x = width / 2;
  y = height / 2;
  bounds = font.textBounds(message, x, y, fontSize);
  pop();

  if ( mouseX >= bounds.x && mouseX <= bounds.x + bounds.w &&
    mouseY >= bounds.y - fontSize / 2 && mouseY <= bounds.y + fontSize / 2 + bounds.h) {
    filter(INVERT);
  }


blendMode(DIFFERENCE);
if(isOverSketch && !isMobile){
  fill(255,255,255, 255);
}else{
  fill(255,255,255, 0);
}

push();
ellipse(mouseX, mouseY, 24, 24);
pop();
blendMode(NORMAL)
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  multiCanvas.remove();
  multiCanvas = createCanvas(windowWidth, windowHeight, P2D);
  getMobileOperatingSystem();
  scalar = windowWidth;
}

function getMobileOperatingSystem() {
var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Windows Phone must come first because its UA also contains "Android"
  if (/windows phone/i.test(userAgent)) {
      isMobile = true;
      return "Windows Phone";
  }

  if (/android/i.test(userAgent)) {
      isMobile = true;
      return "Android";
  }

  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      isMobile = true;
      return "iOS";
  }

  isMobile = false;
  return "unknown";
}