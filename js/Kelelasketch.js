let lyrics = [
  "Oh, it's a sauna",
  "Here if you wanna",
  "I'm standing in the light",
  "It's 2 a.m., yeah, we made it",
  "Everybody faded",
  "So high, so high, so high",
  "And now I'm floating away",
  "Far and away",
  "You know it feels so right",
  "You tryna stall and delay, but I wanna play"
];

let currentLine = 0;
let fadeAmt = 40;
let spinAngle = 25;
let ghostWords = ["faded", "floating", "delay", "touch", "2am", "play", "high"];
let colors = [
  [255, 105, 180],
  [0, 255, 255],
  [255, 255, 0],
  [138, 43, 226],
  [255, 165, 0],
  [173, 216, 230],
  [240, 128, 128],
  [60, 179, 113],
  [255, 20, 147],
  [75, 0, 130]
];

let customFont;

function preload() {
  customFont = loadFont("font/destructobeambb_bold.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(customFont);
  textAlign(CENTER, CENTER);
  noStroke();
}

function draw() {
  background(10, 10, 20, 100);

  // Ghost words with reduced opacity
  for (let i = 0; i < 20; i++) {
    fill(255, 80); // lower opacity for background words
    textSize(random(12, 22));
    text(random(ghostWords), random(width), random(height));
  }

  let t = frameCount * 0.01;
  fadeAmt = 200 + sin(t) * 55;
  spinAngle = sin(t * 0.6) * 0.1;

  let c = colors[currentLine];
  let pulseSize = 64 + sin(t) * 6;
  let line = lyrics[currentLine];

  push();
  translate(width / 2, height / 2);
  rotate(spinAngle);

  fill(c[0], c[1], c[2], 255); // fully opaque main text
  textSize(pulseSize);

  let maxTextWidth = width * 0.8;
  let wrapped = splitLines(line, maxTextWidth, pulseSize);

  for (let i = 0; i < wrapped.length; i++) {
    text(wrapped[i], 0, (i - wrapped.length / 2) * pulseSize * 1.2);
  }

  pop();
}

function splitLines(txt, maxW, size) {
  textSize(size);
  let words = txt.split(" ");
  let lines = [];
  let current = "";

  for (let w of words) {
    let testLine = current.length > 0 ? current + " " + w : w;
    if (textWidth(testLine) > maxW) {
      lines.push(current);
      current = w;
    } else {
      current = testLine;
    }
  }

  if (current) lines.push(current);
  return lines;
}

function mousePressed() {
  currentLine = (currentLine + 1) % lyrics.length;
}

function keyPressed() {
  if (key === '1') {
    window.location.href = "Ojerime.html";
  } else if (key === '2') {
    window.location.href = "amaarae.html";
  }
}

