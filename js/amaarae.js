let customFont;

function preload() {
  customFont = loadFont('../font/blox2.ttf');
}

let allWords = [];
let flyingWords = [];
let glitterParticles = [];
let isStarryNight = true;
let lastSwitchTime = 0;
let switchInterval = 12000;

let verbs = [
  "go", "lookin", "find", "handle", "manage", "move", "bring", "do",
  "say", "feed", "spend", "play", "take", "pay", "love"
];

let lyrics = [
  "I been goin' out like a bad bitch",
  "I been lookin' fine through the madness",
  "I can't find a nigga who can handle",
  "I can't find nobody that can manage",
  "But then I found you, can we go?",
  "Can you move it on the floor?",
  "Can we bring it to the back?",
  "Can we do it on the track?",
  "Louvre and Armani, I like how you say it",
  "Feeding me body, I like how you cater",
  "I took a trip to the stylist today",
  "I spend the bitch like I'm spending the paper",
  "Okay, keep going, I'll Lindsay a Lohan",
  "I'll play with my favorite, but y’all bitches boring",
  "Dior in the club", "Take it off in the club",
  "Pay homage in the club", "To the god in the club",
  "Play your part in the club", "Say no more in the club",
  "Love and war in the club", "Je t'adore in the club"
];

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(customFont);
  textAlign(CENTER, CENTER);
  noStroke();
  lastSwitchTime = millis();

  for (let line of lyrics) {
    let lineWords = line.split(" ");
    for (let w of lineWords) {
      allWords.push(w);
    }
  }

  for (let i = 0; i < 150; i++) {
    glitterParticles.push(new Glitter());
  }
}

function draw() {
  let now = millis();

  if (now - lastSwitchTime > switchInterval) {
    isStarryNight = !isStarryNight;
    lastSwitchTime = now;
  }

  if (isStarryNight) {
    background(10, 10, 30);
    for (let g of glitterParticles) {
      g.update();
      g.display();
    }
  } else {
    background(255, 255, 100);
  }

  for (let fw of flyingWords) {
    fw.update();
    fw.display();
  }
  flyingWords = flyingWords.filter(fw => fw.alpha > 0);
}

function mousePressed() {
  let line = random(lyrics);
  let word = random(line.split(" "));
  flyingWords.push(new PopWord(word, mouseX, mouseY));
}

function keyPressed() {
  if (key === '1') {
    window.location.href = "kelela.html";
  } else if (key === '2') {
    window.location.href = "index.html";
  }
}

class PopWord {
  constructor(txt, x, y) {
    this.txt = txt;
    this.x = x;
    this.y = y;
    this.size = random(48, 72);
    this.alpha = 255;
    this.scalePulse = 1;
    this.frame = 0;
    this.isVerb = verbs.includes(this.txt.toLowerCase().replace(/[^a-zA-Z]/g, ""));
    this.xSpeed = random(-1, 1);
    this.ySpeed = random(-2, -0.5);
    this.rotation = random(TWO_PI);
    this.rotationSpeed = random(-0.05, 0.05);
  }

  update() {
    this.frame++;
    this.scalePulse = 1 + 0.1 * sin(this.frame * 0.5);
    this.alpha -= 2.5;
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    this.rotation += this.rotationSpeed;
  }

  display() {
    push();
    translate(this.x, this.y);
    rotate(this.rotation);
    scale(this.scalePulse);

    if (!isStarryNight) {
      fill(0, this.alpha);
    } else {
      if (this.isVerb) {
        fill(255, 60, 160, this.alpha);
      } else {
        fill(255, this.alpha);
      }
    }

    textSize(this.size);
    text(this.txt, 0, 0);
    pop();
  }
}

class Glitter {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = random(width);
    this.y = random(height);
    this.size = random(1, 3);
    this.alpha = random(80, 160);
    this.twinkle = random(0.01, 0.03);
  }

  update() {
    this.alpha += sin(frameCount * this.twinkle) * 2;
    if (random() < 0.005) this.reset();
  }

  display() {
    noStroke();
    fill(255, 200, 255, this.alpha);
    ellipse(this.x, this.y, this.size);
  }
}
