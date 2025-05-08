let binzLyrics = [
  "I just wanna wake up to the suns and Saint Laurent",
  "Hundred thousand dollars on the fronts and the blunts",
  "I just wanna wake up on ya thigh, on a yacht",
  "Or in the Rolls that's rented, windows tinted",
  "We call that big spendin', big spendin'",
  "I'ma get back on my feet, give me a minute",
  "I'ma feel this in my thighs, like he been in it",
  "Young Simma, Young Simmer",
  "Give me a minute",
  "Sun down, wind chimes",
  "Break it down, one line, a line",
  "Can't no see me, no flex, be kind",
  "Dollars never show up on CP time",
  "I just wanna wake up on CP time",
  "Wake up to that nigga, leave he behind",
  "Get a presidential suite, leave with they linen",
  "In the Rolls that's rented, windows tinted"
];

let mySkinLyrics = [
  "My skin, my logo",
  "My skin is my logo",
  "Real Black, no edit",
  "Black don't crack when it glow",
  "My aura bright, my glow up light",
  "I’m the light"
];

let stayFloLyrics = [
  "Stay Flo, stay Flo",
  "Money don't make me, I make me",
  "Never take me out my zone",
  "When I pull up, don't need a loan",
  "I been on my own, I'm grown",
  "Stay Flo, stay Flo"
];

let currentLyrics = binzLyrics;
let verbs = [
  "wake", "want", "make", "pull", "crack", "glow", "take", "been",
  "give", "see", "show", "leave", "get", "feel", "call", "break", "rent"
];

let customFont;
let ghostWords = [];

function preload() {
  customFont = loadFont("font/Brushed.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(customFont);
  textAlign(CENTER, CENTER);
  noStroke();
}

function draw() {
  background(255);

  // spawn ghost verbs occasionally
  if (frameCount % 30 === 0 && ghostWords.length < 30) {
    ghostWords.push({
      word: random(verbs),
      x: random(width),
      y: random(height),
      alpha: 80,
      size: random(20, 28),
      dx: random(-0.2, 0.2),
      dy: random(-0.2, 0.2)
    });
  }

  // draw drifting ghost words
  for (let gw of ghostWords) {
    fill(255, 0, 100, gw.alpha);
    textSize(gw.size);
    text(gw.word, gw.x, gw.y);
    gw.x += gw.dx;
    gw.y += gw.dy;
  }

  const defaultCharSpacing = 10;
  const verbCharSpacing = 20;
  const wordSpacing = 20;
  const verticalBuffer = 80;
  const energy = map(dist(mouseX, mouseY, width / 2, height / 2), 0, width / 2, 0.4, 1.8);

  // loop through each lyric line
  currentLyrics.forEach((line, i) => {
    let y = map(i, 0, currentLyrics.length - 1, verticalBuffer, height - verticalBuffer);
    let words = line.split(" ");

    // calculate line total width
    let lineWidth = words.reduce((sum, w) => {
      let clean = w.toLowerCase().replace(/[^a-z]/gi, "");
      let spacing = verbs.includes(clean) ? verbCharSpacing : defaultCharSpacing;
      return sum + (w.length * spacing + wordSpacing);
    }, 0);

    let x = width / 2 - lineWidth / 2;

    words.forEach((word, wIndex) => {
      let t = frameCount * 0.03 + i + wIndex;
      let clean = word.toLowerCase().replace(/[^a-z]/gi, "");
      let isVerb = verbs.includes(clean);
      let spacing = isVerb ? verbCharSpacing : defaultCharSpacing;

      push();
      translate(x, y);
      translate(0, sin(t) * 6 * energy);
      rotate(sin(t * 0.1) * 0.05 * energy);

      if (isVerb) {
        let pulseSize = 52 + sin(t) * 6;
        textSize(pulseSize);
        fill(255, 0, 150);
        drawingContext.shadowBlur = 12;
        drawingContext.shadowColor = 'rgba(255, 0, 150, 0.6)';
      } else {
        textSize(44);
        fill(0);
        drawingContext.shadowBlur = 0;
      }

      // draw each character with its own spacing
      for (let j = 0; j < word.length; j++) {
        let xOffset = j * spacing - (word.length * spacing) / 2;
        text(word[j], xOffset, 0);
      }
      pop();

      // advance x position for next word
      x += word.length * spacing + wordSpacing;
    });
  });
}

function mousePressed() {
  for (let i = 0; i < 4; i++) {
    let echoLine = random(currentLyrics);
    let echoWord = random(echoLine.split(" "));
    push();
    fill(0, 50);
    textSize(24);
    text(echoWord, random(width), random(height));
    pop();
  }
}

function keyPressed() {
  if (key === '1') {
    window.location.href = "index.html";
  } else if (key === '2') {
    window.location.href = "Ojerime.html";
  } else if (key === '3') {
    currentLyrics = binzLyrics;
  } else if (key === '4') {
    currentLyrics = mySkinLyrics;
  } else if (key === '5') {
    currentLyrics = stayFloLyrics;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
