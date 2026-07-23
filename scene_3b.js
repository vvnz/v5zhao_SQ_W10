// ============================================================
// scene_3b.js: Level 3 — The Open Water (swim + choice)
// ============================================================

LEVELS[SCENE_3B] = {
  bg: "current",
  worldH: 1300,
  obstacleFile: "3b",
  theme: "current",
  title: "The Open Water",
};

function drawScene3B() {
  if (subState === SUBSTATE_SWIMMING) {
    drawSwimLevel(LEVELS[SCENE_3B]);
    return;
  }

  drawBg(img.current);
  drawOverlay(155);

  drawNarration([
    "You break through. The pressure builds against your suit.",
    "The water turns dark. Something enormous moves below —",
    "a shadow the size of a building, slow and unhurried.",
  ]);

  drawButton(
    BTN1_X,
    BTN_Y,
    BTN_W,
    BTN_H,
    "Swim toward it",
    isMouseOver(BTN1_X, BTN_Y, BTN_W, BTN_H),
  );

  drawButton(
    BTN2_X,
    BTN_Y,
    BTN_W,
    BTN_H,
    "Hold position and wait",
    isMouseOver(BTN2_X, BTN_Y, BTN_W, BTN_H),
  );

  drawQuote([
    '"There are things in this world that do not know you exist.',
    'Approach them anyway."',
  ]);
}

function handleClick3B() {
  if (subState !== SUBSTATE_CHOICE) return;
  if (isMouseOver(BTN1_X, BTN_Y, BTN_W, BTN_H)) goTo(SCENE_END_3);
  if (isMouseOver(BTN2_X, BTN_Y, BTN_W, BTN_H)) goTo(SCENE_END_4);
}
