// ============================================================
// scene_end_5.js: Ending — The Trench (triumph)
// Path: Opening -> 2B -> 3C -> drop through porthole
// ============================================================

function drawEnd5() {
  drawBg(img.trench);
  drawOverlay(130);

  push();
  fill(160, 220, 200);
  noStroke();
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  textSize(72);
  text("The Trench", BTN1_X - BTN_W / 2, 260);
  pop();

  drawNarration([
    "You slip through the porthole and fall freely.",
    "The wreck shrinks above you. The trench floor rises to meet you.",
    "You land. Softly. You are at the bottom of the world.",
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
    '"There are many roads down.',
    "You found one that went through a ship.",
    "That's a strange and perfect way to arrive.\"",
  ]);
}
