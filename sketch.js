
var num = 60;
var mx = [];
var my = [];
var img; //add image here

var balls = []; //bouncse balls
var type; //user input
var output; //output text
var submit; //button

function preload(){
  img = loadImage("images/earth.png"); //add image here
  sound = loadSound("audio/Laser.mp3"); // add audio
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('BackgroundCanvas');
  //noStroke();
  //fill(255, 153);
  for (var i = 0; i < num; i++) {
    mx.push(i);
    my.push(i);
  }
  //text input for message board
    type = select("#feeling");
    type.input(newTyping);
    output = select("#output");
    submit = select("#submit");
    submit.mousePressed(newText);
}

function newTyping() {
  output.html(type.value());
  output.parent('output');
}

function newText(){
  createP(type.value());
}

function Ball() {
  x = 0;
  y = 0;
  c = color(random(255), random(255), random(255));
  speed= {
    x:random(-15,15),
    y:random(-15,15)
  };

  this.draw = function() {
    noStroke();
    fill(c);
    rect(x, y, 15,15);
    x = x + speed.x;
    y = y + speed.y;

    if(y > height || y < 0){
      speed.y = speed.y * -1;
    }
    if(x > width || x < 0){
      speed.x = speed.x * -1;
    }
  }
}

function addBall() {
  var ball = new Ball();
  ball.x = mouseX;
  ball.y = mouseY;
  balls.push(ball);
}

function draw() {

  // Cycle through the array, using a different entry on each frame.
  // Using modulo (%) like this is faster than moving all the values over.
  var which = frameCount % num;
  mx[which] = mouseX;
  my[which] = mouseY;

  for (var i = 0; i < num; i++) {
    // which+1 is the smallest (the oldest in the array)
    var index = (which+1 + i) % num;
    imageMode(CENTER);
    image(img, mx[index], my[index], i, i); //add image here
  }

  for(var i = 0; i < balls.length; i++) {
    var ball = balls[i];
    ball.draw();
  }

}

function mousePressed() {
  addBall();
  sound.play();
}
