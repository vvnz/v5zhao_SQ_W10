// ============================================================
// scene_2a.js: Level 2 — Fast Current (swim + choice)
// ============================================================

LEVELS[SCENE_2A] = {
  bg: "dive_fast",
  worldH: 1300,
  obstacleFile: "2a",
  theme: "current",
  title: "Fast Current",
};

function drawScene2A() {
  if (subState === SUBSTATE_SWIMMING) {
    drawSwimLevel(LEVELS[SCENE_2A]);
    return;
  }

  drawBg(img.dive_fast);
  drawOverlay(150);

  drawNarration([
    "You plunge past the sunlight zone. Your tank hisses with effort.",
    "A strong current pulls you sideways.",
    "To the left: a cave entrance. Ahead: open water.",
  ]);

  drawButton(
    BTN1_X,
    BTN_Y,
    BTN_W,
    BTN_H,
    "Enter the cave",
    isMouseOver(BTN1_X, BTN_Y, BTN_W, BTN_H),
  );

  drawButton(
    BTN2_X,
    BTN_Y,
    BTN_W,
    BTN_H,
    "Push through the current",
    isMouseOver(BTN2_X, BTN_Y, BTN_W, BTN_H),
  );

  drawQuote([
    '"Speed is a convincing substitute for direction.',
    "Until it isn't.\"",
  ]);
}

function handleClick2A() {
  if (subState !== SUBSTATE_CHOICE) return;
  if (isMouseOver(BTN1_X, BTN_Y, BTN_W, BTN_H)) goTo(SCENE_3A);
  if (isMouseOver(BTN2_X, BTN_Y, BTN_W, BTN_H)) goTo(SCENE_3B);
}
