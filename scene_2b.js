// ============================================================
// scene_2b.js: Level 2 — Gentle Drift (swim + choice)
// ============================================================

LEVELS[SCENE_2B] = {
  bg: "dive_slow",
  worldH: 1100,
  obstacleFile: "2b",
  theme: "coral",
  title: "Gentle Drift",
};

function drawScene2B() {
  if (subState === SUBSTATE_SWIMMING) {
    drawSwimLevel(LEVELS[SCENE_2B]);
    return;
  }

  drawBg(img.dive_slow);
  drawOverlay(140);

  drawNarration([
    "You drift downward. A sea turtle glides past, indifferent.",
    "The light from above grows thin.",
    "Below you: a sunken shipwreck, and a kelp forest.",
  ]);

  drawButton(
    BTN1_X,
    BTN_Y,
    BTN_W,
    BTN_H,
    "Explore the shipwreck",
    isMouseOver(BTN1_X, BTN_Y, BTN_W, BTN_H),
  );

  drawButton(
    BTN2_X,
    BTN_Y,
    BTN_W,
    BTN_H,
    "Descend through the kelp",
    isMouseOver(BTN2_X, BTN_Y, BTN_W, BTN_H),
  );

  drawQuote([
    '"Patience is not the absence of desire.',
    'It is desire with better manners."',
  ]);
}

function handleClick2B() {
  if (subState !== SUBSTATE_CHOICE) return;
  if (isMouseOver(BTN1_X, BTN_Y, BTN_W, BTN_H)) goTo(SCENE_3C);
  if (isMouseOver(BTN2_X, BTN_Y, BTN_W, BTN_H)) goTo(SCENE_3D);
}
