// ============================================================
// scene_end_6.js: Ending — Lost in the Ship (bittersweet)
// Path: Opening -> 2B -> 3C -> search the wreck
// ============================================================

function drawEnd6() {
  drawBg(img.shipwreck_interior);
  drawOverlay(150);

  push();
  fill(200, 200, 180);
  noStroke();
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  textSize(72);
  text("Lost in the Ship", BTN1_X - BTN_W / 2, 260);
  pop();

  drawNarration([
    "Corridor after corridor. Cabin after cabin.",
    "The porthole to the trench passes by once more — but you keep going.",
    "Some people never leave. The ship doesn't judge them for it.",
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
    '"Not all who wander are lost.',
    "But you are, a little.",
    'It suits you."',
  ]);
}
