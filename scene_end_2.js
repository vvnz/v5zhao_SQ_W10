// ============================================================
// scene_end_2.js: Ending — Back to the Surface (failure)
// Path: Opening -> 2A -> 3A -> turn back
// ============================================================

function drawEnd2() {
  drawBg(img.surface_fail);
  drawOverlay(140);

  push();
  fill(200, 200, 220);
  noStroke();
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  textSize(72);
  text("Back to the Surface", BTN1_X - BTN_W / 2, 260);
  pop();

  drawNarration([
    "You turn around. The cave shrinks behind you.",
    "Light from above grows. You break the surface.",
    "The ocean floor is still down there. Waiting.",
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
    '"Giving up is always available to you.',
    "That's what makes it a choice,",
    'and not a relief."',
  ]);
}
