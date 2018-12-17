var paragraph; 

var w;
var h;

var isOverSketch = false;
var isMobile = false;
var isOverParagraph = false;

var angle1=0;
var scalar = 1;


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

function setup() {
  noCursor();
  getMobileOperatingSystem();
  var multiCanvas = createCanvas(windowWidth, windowHeight, P2D);
  multiCanvas.style('display', 'block');

  paragraph = createP("TOM\nSCHWAIGER")
  paragraph.mouseOver(overParagraph);
  paragraph.mouseOut(outParagraph);

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
  fill(0);
  paragraph.width = windowWidth;
  paragraph.height = windowHeight;
  paragraph.position(width/2 - width/2, height/2 - paragraph.height/2);
  //fill(255, 0, 0, 128);
  //rect(-paragraph.width/2, -paragraph.height/2, paragraph.width, paragraph.height);

  pop();



  if(isOverParagraph){
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