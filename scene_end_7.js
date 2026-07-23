// ============================================================
// scene_end_7.js: Ending — Found the Floor (triumph)
// Path: Opening -> 2B -> 3D -> kick down
// ============================================================

function drawEnd7() {
  drawBg(img.ocean_floor);
  drawOverlay(130);

  push();
  fill(160, 230, 210);
  noStroke();
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  textSize(72);
  text("Found the Floor", BTN1_X - BTN_W / 2, 260);
  pop();

  drawNarration([
    "You kick hard. The kelp thins. The water stills.",
    "Sand. Rock. Silence.",
    "Your gut was right. It usually is, when you listen.",
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
    '"The body knows things the mind is still',
    "busy arguing about.",
    'Congratulations on listening."',
  ]);
}
