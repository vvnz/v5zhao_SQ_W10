// ============================================================
// Getting Under It — Currents — sketch.js
// ============================================================

// ------------------------------------------------------------
// BUTTON LAYOUT — choice screens
// All values are for a 1200 x 800 canvas (width is fixed at 1200
// so backgrounds never need to exceed that).
// ------------------------------------------------------------
const BTN_W = 440;
const BTN_H = 70;
const BTN1_X = 370;
const BTN2_X = 830;
const BTN_Y = 550;
const QUOTE_X = 1050;

// ------------------------------------------------------------
// THEME_COLORS — per-obstacle-theme fallback palette, used
// until real sprite art is dropped into assets/images/.
// ------------------------------------------------------------
const THEME_COLORS = {
  rock: { base: [92, 96, 102], accent: [58, 62, 68] },
  current: { base: [72, 132, 142], accent: [40, 92, 102] },
  coral: { base: [205, 112, 122], accent: [150, 70, 90] },
  cave: { base: [92, 72, 142], accent: [185, 150, 255] },
  wreck: { base: [112, 92, 62], accent: [70, 55, 35] },
  kelp: { base: [52, 122, 72], accent: [30, 82, 46] },
};

// ============================================================
// preload()
// ============================================================
function preload() {
  img.surface = loadImage("assets/images/surface.png");
  img.dive_fast = loadImage("assets/images/dive_fast.png");
  img.dive_slow = loadImage("assets/images/dive_slow.png");
  img.cave_entrance = loadImage("assets/images/cave_entrance.png");
  img.current = loadImage("assets/images/current.png");
  img.shipwreck = loadImage("assets/images/shipwreck.png");
  img.kelp_forest = loadImage("assets/images/kelp_forest.png");
  img.abyss = loadImage("assets/images/abyss.png");
  img.surface_fail = loadImage("assets/images/surface_fail.png");
  img.whale = loadImage("assets/images/whale.png");
  img.trench = loadImage("assets/images/trench.png");
  img.shipwreck_interior = loadImage("assets/images/shipwreck_interior.png");
  img.ocean_floor = loadImage("assets/images/ocean_floor.png");

  bgm.underwater = loadSound("assets/sounds/underwater.mp3");
  sfx.hit = loadSound("assets/sounds/hit.mp3");

  // Optional polish assets — not supplied yet, so the game runs
  // on procedurally-drawn fallbacks (see drawPlayer/drawObstacleShape
  // below). Drop files at these paths and uncomment to use them:
  // img.diver = loadImage("assets/images/diver.png");
  // img.obstacle_rock = loadImage("assets/images/obstacle_rock.png");
  // img.obstacle_kelp = loadImage("assets/images/obstacle_kelp.png");
  // img.obstacle_cave = loadImage("assets/images/obstacle_cave.png");
  // img.obstacle_wreck = loadImage("assets/images/obstacle_wreck.png");
  // sfx.stroke = loadSound("assets/sounds/swim_stroke.mp3");

  obstacleData.opening = loadJSON("data/obstacles_opening.json");
  obstacleData["2a"] = loadJSON("data/obstacles_2a.json");
  obstacleData["2b"] = loadJSON("data/obstacles_2b.json");
  obstacleData["3a"] = loadJSON("data/obstacles_3a.json");
  obstacleData["3b"] = loadJSON("data/obstacles_3b.json");
  obstacleData["3c"] = loadJSON("data/obstacles_3c.json");
  obstacleData["3d"] = loadJSON("data/obstacles_3d.json");
}

// ============================================================
// setup()
// ============================================================
function setup() {
  createCanvas(1200, 800);
  textFont("Georgia");
  noSmooth(); // keep pixel-art backgrounds and shapes crisp, no blur on scaling
  bgm.underwater.loop();
  startSwimLevel(SCENE_OPENING);
}

// ============================================================
// draw()
// ============================================================
function draw() {
  background(0);

  if (LEVELS[currentScene]) updateSwimLevel();

  if (currentScene === SCENE_OPENING) drawOpening();
  else if (currentScene === SCENE_2A) drawScene2A();
  else if (currentScene === SCENE_2B) drawScene2B();
  else if (currentScene === SCENE_3A) drawScene3A();
  else if (currentScene === SCENE_3B) drawScene3B();
  else if (currentScene === SCENE_3C) drawScene3C();
  else if (currentScene === SCENE_3D) drawScene3D();
  else if (currentScene === SCENE_END_1) drawEnd1();
  else if (currentScene === SCENE_END_2) drawEnd2();
  else if (currentScene === SCENE_END_3) drawEnd3();
  else if (currentScene === SCENE_END_4) drawEnd4();
  else if (currentScene === SCENE_END_5) drawEnd5();
  else if (currentScene === SCENE_END_6) drawEnd6();
  else if (currentScene === SCENE_END_7) drawEnd7();
  else if (currentScene === SCENE_END_8) drawEnd8();
}

// ============================================================
// INPUT
// ============================================================
// Movement is continuous (keyIsDown, polled from updateSwimLevel
// via handleSwimInput in game.js). Clicks only matter for the
// choice screens, exactly like the original SQ4 dispatch.
// ============================================================
function mousePressed() {
  getAudioContext().resume();
  if (bgm.underwater && !bgm.underwater.isPlaying()) bgm.underwater.loop();

  if (subState === SUBSTATE_SWIMMING && LEVELS[currentScene]) return;

  if (currentScene === SCENE_OPENING) handleClickOpening();
  else if (currentScene === SCENE_2A) handleClick2A();
  else if (currentScene === SCENE_2B) handleClick2B();
  else if (currentScene === SCENE_3A) handleClick3A();
  else if (currentScene === SCENE_3B) handleClick3B();
  else if (currentScene === SCENE_3C) handleClick3C();
  else if (currentScene === SCENE_3D) handleClick3D();
  else handleClickEnd();
}

// Movement is key-driven, so the very first input might be a
// keypress rather than a click — unlock audio here too.
function keyPressed() {
  getAudioContext().resume();
  if (bgm.underwater && !bgm.underwater.isPlaying()) bgm.underwater.loop();
}

// ------------------------------------------------------------
// handleClickEnd()
// All endings share the same click logic — one "Try Again"
// button centred on the canvas. Ported unchanged from SQ4.
// ------------------------------------------------------------
function handleClickEnd() {
  if (isMouseOver(width / 2, BTN_Y, BTN_W, BTN_H)) {
    resetGame();
  }
}

// ============================================================
// SWIM LEVEL RENDERING
// ============================================================

// ------------------------------------------------------------
// drawSwimLevel(level)
// Draws one frame of a real-time swim/dodge segment: scrolling
// world in a translated push/pop, then a screen-space depth
// vignette and HUD on top.
// ------------------------------------------------------------
function drawSwimLevel(level) {
  push();
  translate(0, -camY);
  drawWorldBackground(level);
  drawObstacles(level);
  drawPlayer();
  pop();

  let depthAlpha = map(player.y, 0, level.worldH, 30, 150, true);
  drawOverlay(depthAlpha);

  drawSwimHUD(level);
}

// ------------------------------------------------------------
// drawWorldBackground(level)
// Draws the level's background image once, stretched to cover
// the full world height — each background is authored at the
// exact 1200 x worldH size, so nothing repeats or seams.
// ------------------------------------------------------------
function drawWorldBackground(level) {
  let bg = img[level.bg];
  if (bg && bg.width > 0) {
    image(bg, 0, 0, width, level.worldH);
  } else {
    noStroke();
    fill(8, 20, 36);
    rect(0, 0, width, level.worldH);
  }
}

// ------------------------------------------------------------
// drawObstacles(level) / drawObstacleShape(o, themeName, theme)
// Themed hazards. Falls back to procedural shapes per theme
// until real sprites are supplied (see preload() above).
// ------------------------------------------------------------
function drawObstacles(level) {
  let theme = THEME_COLORS[level.theme] || THEME_COLORS.rock;
  for (let i = 0; i < obstacles.length; i++) {
    let o = obstacles[i];
    if (o.y + o.size * 2 < camY || o.y - o.size * 2 > camY + height) continue;
    drawObstacleShape(o, level.theme, theme);
  }
}

function drawObstacleShape(o, themeName, theme) {
  push();
  translate(o.x, o.y);
  noStroke();
  rectMode(CENTER);

  if (themeName === "kelp") {
    let sway = sin(frameCount * 0.03 + o.x) * 8;
    fill(theme.base[0], theme.base[1], theme.base[2], 220);
    beginShape();
    vertex(-o.size * 0.18, o.size * 0.3);
    vertex(o.size * 0.18, o.size * 0.3);
    vertex(o.size * 0.22 + sway, -o.size * 1.4);
    vertex(-o.size * 0.22 + sway, -o.size * 1.4);
    endShape(CLOSE);
    fill(theme.accent[0], theme.accent[1], theme.accent[2], 200);
    ellipse(sway * 0.6, -o.size * 0.9, o.size * 0.3, o.size * 0.3);
  } else if (themeName === "cave") {
    fill(theme.base[0], theme.base[1], theme.base[2]);
    triangle(-o.size / 2, -o.size / 2, o.size / 2, -o.size / 2, 0, o.size / 2);
    let glow = map(sin(frameCount * 0.05 + o.x), -1, 1, 60, 170);
    fill(theme.accent[0], theme.accent[1], theme.accent[2], glow);
    ellipse(0, o.size / 2 - 6, o.size * 0.28, o.size * 0.28);
  } else if (themeName === "wreck") {
    fill(theme.base[0], theme.base[1], theme.base[2]);
    rect(0, 0, o.size, o.size * 0.55, 4);
    fill(theme.accent[0], theme.accent[1], theme.accent[2]);
    rect(0, -o.size * 0.2, o.size * 0.9, 5);
    fill(35, 30, 25);
    ellipse(-o.size * 0.35, o.size * 0.15, 6, 6);
    ellipse(o.size * 0.35, o.size * 0.15, 6, 6);
  } else if (themeName === "current") {
    push();
    rotate(frameCount * 0.012 + o.x);
    fill(theme.base[0], theme.base[1], theme.base[2]);
    rect(0, 0, o.size * 0.9, o.size * 0.9, 6);
    fill(theme.accent[0], theme.accent[1], theme.accent[2]);
    rect(0, 0, o.size * 0.4, o.size * 0.4, 4);
    pop();
  } else {
    // rock / coral / default: rounded boulder
    fill(theme.base[0], theme.base[1], theme.base[2]);
    ellipse(0, 0, o.size, o.size * 0.9);
    fill(theme.accent[0], theme.accent[1], theme.accent[2]);
    ellipse(-o.size * 0.15, -o.size * 0.1, o.size * 0.35, o.size * 0.3);
    if (themeName === "coral") {
      fill(theme.accent[0], theme.accent[1], theme.accent[2]);
      for (let i = 0; i < 5; i++) {
        let ang = (TWO_PI / 5) * i;
        ellipse(
          cos(ang) * o.size * 0.35,
          sin(ang) * o.size * 0.35,
          o.size * 0.25,
          o.size * 0.25,
        );
      }
    }
  }

  rectMode(CORNER);
  pop();
}

// ------------------------------------------------------------
// drawPlayer()
// Procedural diver fallback (wetsuit, tank, mask, fins). Blinks
// during invincibility frames, same tell as the source shooter.
// ------------------------------------------------------------
function drawPlayer() {
  if (player.invincible && floor(player.invincibleTimer / 6) % 2 === 0) return;

  push();
  translate(player.x, player.y);
  scale(player.facing, 1);
  noStroke();

  fill(0, 0, 0, 40);
  ellipse(2, player.r * 0.9, player.r * 1.8, player.r * 0.6);

  fill(70, 75, 85);
  rect(-6, -player.r * 0.4, 10, player.r * 1.1, 3);

  fill(30, 60, 90);
  ellipse(0, 0, player.r * 1.6, player.r * 2);

  fill(210, 230, 245, 230);
  ellipse(player.r * 0.35, -player.r * 0.3, player.r * 0.9, player.r * 0.7);
  fill(20, 20, 25);
  ellipse(player.r * 0.45, -player.r * 0.3, player.r * 0.4, player.r * 0.35);

  let finFlap = sin(frameCount * 0.3) * 6;
  fill(230, 140, 40);
  triangle(
    -player.r * 0.3,
    player.r * 0.9,
    -player.r * 0.9,
    player.r * 1.3 + finFlap,
    -player.r * 0.1,
    player.r * 1.3,
  );

  pop();
}

// ------------------------------------------------------------
// drawSwimHUD(level)
// Oxygen bar, depth progress, level title, and control hint.
// ------------------------------------------------------------
function drawSwimHUD(level) {
  noStroke();

  fill(255, 255, 255, 220);
  textAlign(LEFT, TOP);
  textStyle(ITALIC);
  textSize(20);
  textFont("Georgia");
  text(level.title, 24, 24);

  textSize(13);
  textStyle(NORMAL);
  fill(255, 255, 255, 160);
  text("A/D dodge   ·   W resist the current", 24, 52);

  let heartSize = 6;
  let heartW = HEART_BITMAP[0].length * heartSize;
  let heartH = HEART_BITMAP.length * heartSize;
  let heartGap = 10;
  let totalW = player.maxHealth * heartW + (player.maxHealth - 1) * heartGap;
  let heartsX = width - totalW - 24;
  let heartsY = 30;

  for (let i = 0; i < player.maxHealth; i++) {
    drawHeart(
      heartsX + i * (heartW + heartGap),
      heartsY,
      heartSize,
      i < player.health,
    );
  }

  fill(255, 255, 255, 200);
  textAlign(RIGHT, TOP);
  textSize(12);
  text("AIR", heartsX + totalW, heartsY + heartH + 6);

  let depthPct = constrain(player.y / level.worldH, 0, 1);
  fill(255, 255, 255, 150);
  text("DEPTH " + floor(depthPct * 100) + "%", width - 24, 24);
}

// ------------------------------------------------------------
// drawHeart(x, y, pixelSize, filled)
// One pixel-art heart, drawn from a small bitmap so it matches
// the blocky style of the rest of the game. Filled = still have
// this hit point; empty = already lost.
// ------------------------------------------------------------
const HEART_BITMAP = [
  [0, 1, 1, 0, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [0, 1, 1, 1, 1, 1, 0],
  [0, 0, 1, 1, 1, 0, 0],
  [0, 0, 0, 1, 0, 0, 0],
];

function drawHeart(x, y, pixelSize, filled) {
  noStroke();
  let fillColor = filled ? color(230, 60, 80) : color(45, 35, 40);
  for (let ry = 0; ry < HEART_BITMAP.length; ry++) {
    for (let rx = 0; rx < HEART_BITMAP[ry].length; rx++) {
      if (HEART_BITMAP[ry][rx] === 1) {
        fill(fillColor);
        rect(x + rx * pixelSize, y + ry * pixelSize, pixelSize, pixelSize);
      }
    }
  }
}

// ============================================================
// SHARED CHOICE-SCREEN HELPERS (ported unchanged from SQ4)
// ============================================================

function drawBg(bg) {
  image(bg, 0, 0, width, height);
}

function drawOverlay(alpha) {
  noStroke();
  fill(0, 0, 0, alpha);
  rect(0, 0, width, height);
}

function drawNarration(lines) {
  push();
  fill(255, 255, 255);
  noStroke();
  textAlign(LEFT, BOTTOM);
  textStyle(NORMAL);
  textSize(28);

  let bottomOfNarration = BTN_Y - BTN_H / 2 - 40;
  let lineH = 44;
  let startY = bottomOfNarration - (lines.length - 1) * lineH;
  let leftEdge = BTN1_X - BTN_W / 2;

  for (let i = 0; i < lines.length; i++) {
    text(lines[i], leftEdge, startY + i * lineH);
  }
  pop();
}

function drawQuote(lines) {
  push();
  fill(180, 190, 220);
  noStroke();
  textAlign(RIGHT, TOP);
  textStyle(ITALIC);
  textSize(18);

  let topOfQuote = BTN_Y + BTN_H / 2 + 20;
  let lineH = 28;

  for (let i = 0; i < lines.length; i++) {
    text(lines[i], QUOTE_X, topOfQuote + i * lineH);
  }
  pop();
}

function drawButton(x, y, w, h, label, isHovered) {
  push();
  rectMode(CENTER);

  fill(isHovered ? color(30, 60, 100, 230) : color(10, 30, 60, 210));
  stroke(isHovered ? color(120, 180, 255) : color(60, 100, 160));
  strokeWeight(1.5);
  rect(x, y, w, h, 6);

  fill(220, 230, 255);
  noStroke();
  textAlign(CENTER, CENTER);
  textStyle(NORMAL);
  textSize(22);
  text(label, x, y);

  pop();
}

function isMouseOver(x, y, w, h) {
  return (
    mouseX > x - w / 2 &&
    mouseX < x + w / 2 &&
    mouseY > y - h / 2 &&
    mouseY < y + h / 2
  );
}
