// ============================================================
// scene_end_8.js: Ending — Wrong Way (comedic failure)
// Path: Opening -> 2B -> 3D -> follow bubbles
// ============================================================

function drawEnd8() {
  drawBg(img.surface_fail);
  drawOverlay(135);

  push();
  fill(220, 220, 200);
  noStroke();
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  textSize(72);
  text("Wrong Way", BTN1_X - BTN_W / 2, 260);
  pop();

  drawNarration([
    "You followed the bubbles. Of course you did.",
    "Bubbles go up. You went up.",
    "You surface, blinking in the daylight. The floor is still down there.",
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
    '"Bubbles always rise. This is not a metaphor.',
    "It is just physics.",
    'And now it is also your problem."',
  ]);
}
