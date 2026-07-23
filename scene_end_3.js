// ============================================================
// scene_end_3.js: Ending — The Whale (ambiguous)
// Path: Opening -> 2A -> 3B -> swim toward it
// ============================================================

function drawEnd3() {
  drawBg(img.whale);
  drawOverlay(135);

  push();
  fill(160, 210, 255);
  noStroke();
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  textSize(72);
  text("The Whale", BTN1_X - BTN_W / 2, 260);
  pop();

  drawNarration([
    "You reach it. It is impossibly large.",
    "It doesn't notice you — or it doesn't mind.",
    "You hold its fin and it carries you down, and down, and down.",
  ]);

  drawButton(
    width / 2,
    BTN_Y,
    BTN_W,
    BTN_H,
    "Try Again",
    isMouseOver(width / 2, BTN_Y, BTN_W, BTN_H),
  );

  drawQuote([
    '"Some journeys end by arriving.',
    "Others end by being carried.",
    "I'm told both count.\"",
  ]);
}
