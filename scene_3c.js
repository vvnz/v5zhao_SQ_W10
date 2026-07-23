// ============================================================
// scene_3c.js: Level 3 — The Shipwreck (swim + choice)
// ============================================================

LEVELS[SCENE_3C] = {
  bg: "shipwreck",
  worldH: 1300,
  obstacleFile: "3c",
  theme: "wreck",
  title: "The Shipwreck",
};

function drawScene3C() {
  if (subState === SUBSTATE_SWIMMING) {
    drawSwimLevel(LEVELS[SCENE_3C]);
    return;
  }

  drawBg(img.shipwreck);
  drawOverlay(155);

  drawNarration([
    "You swim through a collapsed hull. Barnacles cover everything.",
    "A rusted porthole in the floor opens to a vertical drop —",
    "the ocean trench, right there. But the wreck holds other mysteries.",
  ]);

  drawButton(
    BTN1_X,
    BTN_Y,
    BTN_W,
    BTN_H,
    "Drop through the porthole",
    isMouseOver(BTN1_X, BTN_Y, BTN_W, BTN_H),
  );

  drawButton(
    BTN2_X,
    BTN_Y,
    BTN_W,
    BTN_H,
    "Search the wreck first",
    isMouseOver(BTN2_X, BTN_Y, BTN_W, BTN_H),
  );

  drawQuote(['"The destination was never the only thing worth finding."']);
}

function handleClick3C() {
  if (subState !== SUBSTATE_CHOICE) return;
  if (isMouseOver(BTN1_X, BTN_Y, BTN_W, BTN_H)) goTo(SCENE_END_5);
  if (isMouseOver(BTN2_X, BTN_Y, BTN_W, BTN_H)) goTo(SCENE_END_6);
}
