let lyrics = [
  "Give it up to me",
  "You know I've been waiting for too long",
  "Man, this chemistry is way too strong",
  "Faded way too long, baby, I can't even see",
  "Got this bud in my bag",
  "Should I break down the tree?",
  "And help me lose my mind"
];

let floatingLines = [];
let echoes = [];
let currentIndex = 0;
let revealDelay = 160;

let customFont;
let bgImg;

function preload() {
  customFont = loadFont('../font/DigitaldreamFatNarrow.ttf');
  bgImg = loadImage('../img/Ojerime.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(customFont);
  textAlign(CENTER, CENTER);
  noStroke();
}

function draw() {
  image(bgImg, 0, 0, width, height);
  fill(0, 100);
  rect(0, 0, width, height);

  if (frameCount % revealDelay === 0 && currentIndex < lyrics.length) {
    floatingLines.push(new FloatingLine(lyrics[currentIndex]));
    currentIndex++;
  }

  for (let line of floatingLines) {
    line.update();
    line.display();
  }

  for (let echo of echoes) {
    echo.update();
    echo.display();
  }

  echoes = echoes.filter(e => e.alpha > 0);
}

function mousePressed() {
  if (floatingLines.length > 0) {
    let echoText = random(floatingLines).text;
    echoes.push(new EchoText(echoText));
  }
}

function keyPressed() {
  if (key === '1') {
    window.location.href = "Solange.html";
  } else if (key === '2') {
    window.location.href = "kelela.html";
  }
}

class FloatingLine {
  constructor(txt) {
    this.text = txt;
    this.x = width / 2;
    this.y = height + 20;
    this.alpha = 0;
    this.speed = 0.3;
    this.pulseOffset = random(1000);
  }

  update() {
    this.y -= this.speed;
    this.alpha = min(255, this.alpha + 3);
  }

  display() {
    let pulse = 1 + 0.02 * sin(frameCount * 0.05 + this.pulseOffset);
    push();
      translate(this.x, this.y);
      scale(pulse);
      fill(255, this.alpha);
      textSize(22);
      text(this.text, 0, 0);
    pop();
  }
}

class EchoText {
  constructor(txt) {
    this.text = txt;
    this.x = random(width * 0.2, width * 0.8);
    this.y = random(height * 0.2, height * 0.8);
    this.alpha = 200;
    this.size = random(12, 16);
  }

  update() {
    this.alpha -= 0.5;
  }

  display() {
    fill(255, this.alpha);
    textSize(this.size);
    text(this.text, this.x, this.y);
  }
}
