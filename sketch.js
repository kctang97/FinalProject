
var num = 60;
var mx = [];
var my = [];
var img; //add image here

var balls = []; //bouncse balls
var type; //user input
var output; //output text
var submit; //button
var textBox;

function preload(){
  img = loadImage("images/smileEmoji1.png"); //add image here
  sound = loadSound("audio/Laser.mp3"); // add audio
  sound1 = loadSound("audio/windowxp.wav");
}

function setup() {
  //backgound
  noCursor();
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('BackgroundCanvas');
  for (var i = 0; i < num; i++) {
    mx.push(i);
    my.push(i);
  }
  //opening sound
  sound1.play();
  //text input for message board
    type = select("#feeling");
    type.input(newTyping);
    output = select("#output");
    submit = select("#submit");
    submit.mousePressed(newText);

    //display text over background
    submit.mousePressed(placeText);
    placeText = select("#feeling");
    textAlign(CENTER);
    textSize(60);
}
//display while user typing
function newTyping() {
  output.html(type.value());
  output.parent('output');
}

function newText(){

}

//place text over the backgound
function placeText() {
  const name = type.value();
  placeText.html('hello ' + name + '!');
  this.c = color(random(255), random(255), random(255));
  type.value('');
//number of text
  for (let i = 0; i < 150; i++) {
    push();
    fill(this.c);
    translate(random(1800), random(1500));
    text(name, 0, 0);
    pop();
  }
}

//bounce ball
function Ball() {
  x = 0;
  y = 0;
  c = color(random(255), random(255), random(255));
  speed= {
    x:random(-15,15),
    y:random(-15,15)
  }; //speed

  this.draw = function() {
    noStroke();
    fill(c);
    rect(x, y, 20, 20);
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

//recreate a boall after click
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
  //bounce ball
  for(var i = 0; i < balls.length; i++) {
    var ball = balls[i];
    ball.draw();
  }
}
//mousepress
function mousePressed() {
  addBall();
  sound.play();
}
