var message = "TOM SCHWAIGER";
var font,
bounds, 
fontsize = 148,
x, y; 

var w;
var h;

var isOverSketch = false;
var isMobile = false;

var angle1=0;
var scalar = 1;

function preload() {
  font = loadFont('assets/Nadir-Light.otf');
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

  // iOS detection from: http://stackoverflow.com/a/9039885/177710
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

  textFont(font);
  textSize(fontsize);

  bounds = font.textBounds(message, 0, 0, fontsize);
  x = width / 2 - bounds.w / 2;
  y = height / 2 - bounds.h / 2;


  strokeCap(SQUARE);
  noFill();

  multiCanvas.parent("multiCanvas");
  multiCanvas.mouseOver(overSketch);
  multiCanvas.mouseOut(outSketch);
  multiCanvas.mouseClicked(mClick);


  scalar = windowWidth;

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


   // console.log(mx + " " + my);

  }


  background(0);

  push();
  translate(w / 2, h / 2);
  var circleResolution = map(my, 0, height, 2, 80);
  var radius = mx - width / 2 + 0.5;
  var angle = TAU / circleResolution;

  strokeWeight(my / 20);

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
  bounds = font.textBounds(message,w/2,h/2 + 50,fontsize);
  pop();

  


  if ( mouseX >= bounds.x && mouseX <= bounds.x + bounds.w &&
    mouseY >= bounds.y && mouseY <= bounds.y + bounds.h) {
    filter(INVERT);
}


blendMode(DIFFERENCE);
if(isOverSketch && !isMobile){
  fill(255,255,255, 255);
}else{
  fill(255,255,255, 0);
}

//fill(255,255,255, 255);
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