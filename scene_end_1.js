// ============================================================
// scene_end_1.js: Ending — The Abyss (triumph)
// Path: Opening -> 2A -> 3A -> keep going
// ============================================================

function drawEnd1() {
  drawBg(img.abyss);
  drawOverlay(130);

  push();
  fill(180, 230, 255);
  noStroke();
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  textSize(72);
  text("The Abyss", BTN1_X - BTN_W / 2, 260);
  pop();

  drawNarration([
    "The cave opens. Below you: the floor.",
    "You drift down and touch it. Cold. Still. Real.",
    "You made it.",
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
    '"Most people will never come here. You did.',
    "I'm not sure what that says about you,",
    'but I mean it as a compliment."',
  ]);
}
