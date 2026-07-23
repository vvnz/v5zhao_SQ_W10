// ============================================================
// scene_3a.js: Level 3 — The Cave (swim + choice)
// ============================================================

LEVELS[SCENE_3A] = {
  bg: "cave_entrance",
  worldH: 1400,
  obstacleFile: "3a",
  theme: "cave",
  title: "The Cave",
};

function drawScene3A() {
  if (subState === SUBSTATE_SWIMMING) {
    drawSwimLevel(LEVELS[SCENE_3A]);
    return;
  }

  drawBg(img.cave_entrance);
  drawOverlay(160);

  drawNarration([
    "The cave narrows. Bioluminescent creatures dot the walls like stars.",
    "Your air gauge ticks downward. The passage ahead looks promising.",
    "The passage behind you still glows with open water.",
  ]);

  drawButton(
    BTN1_X,
    BTN_Y,
    BTN_W,
    BTN_H,
    "Keep going — the trench must be close",
    isMouseOver(BTN1_X, BTN_Y, BTN_W, BTN_H),
  );

  drawButton(
    BTN2_X,
    BTN_Y,
    BTN_W,
    BTN_H,
    "Turn back",
    isMouseOver(BTN2_X, BTN_Y, BTN_W, BTN_H),
  );

  drawQuote(['"Every tunnel promises an end.', 'Most of them are right."']);
}

function handleClick3A() {
  if (subState !== SUBSTATE_CHOICE) return;
  if (isMouseOver(BTN1_X, BTN_Y, BTN_W, BTN_H)) goTo(SCENE_END_1);
  if (isMouseOver(BTN2_X, BTN_Y, BTN_W, BTN_H)) goTo(SCENE_END_2);
}
