// ============================================================
// scene_3d.js: Level 3 — The Kelp Forest (swim + choice)
// ============================================================

LEVELS[SCENE_3D] = {
  bg: "kelp_forest",
  worldH: 1300,
  obstacleFile: "3d",
  theme: "kelp",
  title: "The Kelp Forest",
};

function drawScene3D() {
  if (subState === SUBSTATE_SWIMMING) {
    drawSwimLevel(LEVELS[SCENE_3D]);
    return;
  }

  drawBg(img.kelp_forest);
  drawOverlay(145);

  drawNarration([
    "The kelp closes in. A frond catches your fin — then another.",
    "You kick free, but now you've lost your sense of direction.",
    "Your bubbles drift. Which way is down?",
  ]);

  drawButton(
    BTN1_X,
    BTN_Y,
    BTN_W,
    BTN_H,
    "Trust your gut and kick down",
    isMouseOver(BTN1_X, BTN_Y, BTN_W, BTN_H),
  );

  drawButton(
    BTN2_X,
    BTN_Y,
    BTN_W,
    BTN_H,
    "Follow the bubbles",
    isMouseOver(BTN2_X, BTN_Y, BTN_W, BTN_H),
  );

  drawQuote([
    '"Instinct is just experience',
    'that forgot to explain itself."',
  ]);
}

function handleClick3D() {
  if (subState !== SUBSTATE_CHOICE) return;
  if (isMouseOver(BTN1_X, BTN_Y, BTN_W, BTN_H)) goTo(SCENE_END_7);
  if (isMouseOver(BTN2_X, BTN_Y, BTN_W, BTN_H)) goTo(SCENE_END_8);
}
