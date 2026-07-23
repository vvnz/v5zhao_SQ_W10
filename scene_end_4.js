// ============================================================
// scene_end_4.js: Ending — Out of Air (failure)
// Path: Opening -> 2A -> 3B -> hold position
// ============================================================

function drawEnd4() {
  drawBg(img.dive_slow);
  drawOverlay(170);

  push();
  fill(180, 190, 210);
  noStroke();
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  textSize(72);
  text("Out of Air", BTN1_X - BTN_W / 2, 260);
  pop();

  drawNarration([
    "You hold position. The shadow drifts away.",
    "Your gauge hits empty. Bubbles stop rising.",
    "The ocean continues without you.",
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
    '"Patience requires resources.',
    "Waiting forever is not patience.",
    "It's just a longer way of running out.\"",
  ]);
}
