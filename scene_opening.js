// ============================================================
// scene_opening.js: Opening — Surface Descent (swim + choice)
// ============================================================

LEVELS[SCENE_OPENING] = {
  bg: "surface",
  worldH: 1200,
  obstacleFile: "opening",
  theme: "rock",
  title: "Surface Descent",
};

function drawOpening() {
  if (subState === SUBSTATE_SWIMMING) {
    drawSwimLevel(LEVELS[SCENE_OPENING]);
    return;
  }

  drawBg(img.surface);
  drawOverlay(130);

  push();
  fill(255);
  noStroke();
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  textSize(90);
  text("Getting Under It", BTN1_X - BTN_W / 2, 200);
  pop();

  drawNarration([
    "You hang at the surface. The ocean floor is somewhere far below.",
    "No one is coming to help you. The depth is the only destination.",
    "How do you descend?",
  ]);

  drawButton(
    BTN1_X,
    BTN_Y,
    BTN_W,
    BTN_H,
    "Dive fast — burn your air",
    isMouseOver(BTN1_X, BTN_Y, BTN_W, BTN_H),
  );

  drawButton(
    BTN2_X,
    BTN_Y,
    BTN_W,
    BTN_H,
    "Descend slowly — conserve oxygen",
    isMouseOver(BTN2_X, BTN_Y, BTN_W, BTN_H),
  );

  drawQuote([
    "\"The ocean doesn't care about your urgency.",
    'It has been here longer than ambition."',
  ]);
}

function handleClickOpening() {
  if (subState !== SUBSTATE_CHOICE) return;
  if (isMouseOver(BTN1_X, BTN_Y, BTN_W, BTN_H)) goTo(SCENE_2A);
  if (isMouseOver(BTN2_X, BTN_Y, BTN_W, BTN_H)) goTo(SCENE_2B);
}
