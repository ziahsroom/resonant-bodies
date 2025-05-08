let title = "RESONANT BODIES";
let descLines = [
  "A digital ritual",
  "on the power of sound,",
  "movement, and the freedom",
  "carved by Black femme artists."
];
let pulseOffsets = [];

let customFont;
let bgImgs = [];
let currentBg = 0;
let bgChangeInterval = 5000;
let lastBgSwap = 0;

// Exact image filenames
const fileNames = [
  "img/danc11.jpg",
  "img/dance11.jpg",
  "img/danc21.jpg",
  "img/dance2.jpg",
  "img/dance3.jpg",
  "img/dance6.jpg",
  "img/dance7.jpg",
  "img/dance8.jpg",
  "img/dance11.jpg",
  "img/danc22.jpg",
  "img/dance21.jpg",
  "img/danc19.jpg",
  "img/danc17.jpg",
  "img/danc16.jpg",
  "img/danc12.jpg",
  "img/danc10.jpg",
  "img/danc18.jpg",
  "img/danc22.jpg",
  "img/dance13.jpg"
];

function preload() {
  customFont = loadFont("font/abduction2002.ttf");
  fileNames.forEach(fn => {
    bgImgs.push(
      loadImage(
        fn,
        ()   => console.log(`✅ Loaded ${fn}`),
        err => console.error(`❌ Error loading ${fn}`, err)
      )
    );
  });
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  console.log(`🔢 bgImgs contains ${bgImgs.length} entries.`);
  textFont(customFont);
  textAlign(CENTER, CENTER);
  noStroke();
  for (let i = 0; i < descLines.length; i++) {
    pulseOffsets.push(random(0.5, 1.5));
  }
  lastBgSwap = millis();
}

function nextBg() {
  let start = currentBg;
  do {
    currentBg = (currentBg + 1) % bgImgs.length;
    if (currentBg === start) break;
  } while (!bgImgs[currentBg]);
  lastBgSwap = millis();
}

function draw() {
  textAlign(CENTER, CENTER);

  // Cycle background images
  if (millis() - lastBgSwap > bgChangeInterval) {
    nextBg();
  }

  // Draw background image
  if (bgImgs[currentBg]) {
    image(bgImgs[currentBg], 0, 0, width, height);
  }

  // Title in white with pulsing
  fill(255);
  let titlePulse = sin(frameCount * 0.05) * 5;
  textSize(72 + titlePulse);
  text(title, width / 2, height * 0.2);

  // Subheader with pulsing
  for (let i = 0; i < descLines.length; i++) {
    let pulse = sin(frameCount * 0.05 * pulseOffsets[i]) * 4;
    textSize(34 + pulse);
    switch (i) {
      case 0:
        text(descLines[i], width * 0.3, height * 0.4);
        break;
      case 1:
        text(descLines[i], width * 0.7, height * 0.48);
        break;
      case 2:
        text(descLines[i], width * 0.5, height * 0.58);
        break;
      case 3:
        text(descLines[i], width * 0.25, height * 0.7);
        break;
    }
  }

  // Footer text in bright red
  textAlign(RIGHT, BOTTOM);
  textSize(20);
  fill(255, 0, 0); // Bright red
  text("Press 2 to enter a textual, sonic landscape shaped by Black women.", width - 30, height - 30);
}

function keyPressed() {
  if (key === '2') {
    window.location.href = "Solange.html";
  }
}
