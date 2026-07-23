// ============================================================
// game.js: Game Logic + Swim Engine
// ============================================================
// This file contains all game state, scene navigation, and the
// real-time "swim" traversal engine shared by every branch scene.
//
// Lineage:
//   - Scene constants / goTo() / resetGame() pattern is from
//     v5zhao_SQ4 ("Getting Under It").
//   - The swim engine (world/camera/obstacles/collision/health)
//     is a trimmed, reskinned port of v5zhao_SQ_W6's
//     ("Papers Please") player-movement + obstacle-collision code.
//
// Each branch scene file (scene_opening.js, scene_2a.js, ...,
// scene_3d.js) registers a LEVELS[scene] config object and owns
// its own choice-screen narration/quote/buttons. This file only
// holds the generic engine that runs any of those levels.
// ============================================================

// ------------------------------------------------------------
// SCENES
// ------------------------------------------------------------
const SCENE_OPENING = "opening";

const SCENE_2A = "2a";
const SCENE_2B = "2b";

const SCENE_3A = "3a";
const SCENE_3B = "3b";
const SCENE_3C = "3c";
const SCENE_3D = "3d";

const SCENE_END_1 = "end1"; // The Abyss           (3a -> keep going)
const SCENE_END_2 = "end2"; // Back to Surface      (3a -> turn back)
const SCENE_END_3 = "end3"; // The Whale            (3b -> swim toward it)
const SCENE_END_4 = "end4"; // Out of Air           (3b -> hold position)
const SCENE_END_5 = "end5"; // The Trench           (3c -> drop through porthole)
const SCENE_END_6 = "end6"; // Lost in the Ship     (3c -> search the wreck)
const SCENE_END_7 = "end7"; // Found the Floor      (3d -> kick down)
const SCENE_END_8 = "end8"; // Wrong Way — Surface  (3d -> follow bubbles)

let currentScene = SCENE_OPENING;
let img = {};
let bgm = {};
let sfx = {};
let obstacleData = {};

// ------------------------------------------------------------
// LEVELS registry
// Populated by each branch scene file: LEVELS[SCENE_X] = {...}.
// Any scene present here is treated as a swim level; scenes
// absent from this table (the endings) draw as static screens.
// ------------------------------------------------------------
let LEVELS = {};

// ------------------------------------------------------------
// SUB-STATE
// Branch scenes nest a second state inside the outer scene
// state machine: SWIMMING (real-time dodge traversal) or
// CHOICE (the original SQ4-style narration + two buttons).
// ------------------------------------------------------------
const SUBSTATE_SWIMMING = "swimming";
const SUBSTATE_CHOICE = "choice";
let subState = SUBSTATE_SWIMMING;

// ------------------------------------------------------------
// goTo(scene)
// Navigates to a new scene. If the scene is a swim level, also
// resets and (re)starts that level's swim traversal.
// ------------------------------------------------------------
function goTo(scene) {
  currentScene = scene;
  if (LEVELS[scene]) startSwimLevel(scene);
}

// ------------------------------------------------------------
// resetGame()
// Returns the player to the opening scene and restarts it.
// ------------------------------------------------------------
function resetGame() {
  goTo(SCENE_OPENING);
}

// ============================================================
// SWIM ENGINE
// ============================================================
// CURRENT_SPEED / STRAFE_SPEED / RESIST_SPEED are the new
// "current-driven descent" mechanic: the diver drifts downward
// on their own, A/D (or arrow keys) dodge sideways, and W/Up
// briefly fights the current instead of granting free 4-way
// roam like the source shooter did.
const CURRENT_SPEED = 1.3;
const STRAFE_SPEED = 3.4;
const RESIST_SPEED = 0.8;
const PLAYER_R = 22;
const MAX_HEALTH = 3;
const INVINCIBLE_FRAMES = 55;
const CAM_SMOOTHING = 0.12;
const STROKE_SOUND_INTERVAL = 26;

let player = {
  x: 0,
  y: 0,
  r: PLAYER_R,
  health: MAX_HEALTH,
  maxHealth: MAX_HEALTH,
  invincible: false,
  invincibleTimer: 0,
  bounceVX: 0,
  bounceVY: 0,
  facing: 1,
  moveTimer: 0,
};

let obstacles = [];
let camY = 0;
let currentLevel = null;

// ------------------------------------------------------------
// startSwimLevel(scene)
// Resets the player, camera, and obstacle field for a level.
// Obstacle data is copied (not referenced) so a respawn or a
// replay of the same level never mutates the loaded JSON.
// ------------------------------------------------------------
function startSwimLevel(scene) {
  currentLevel = LEVELS[scene];
  if (!currentLevel) return;

  subState = SUBSTATE_SWIMMING;

  player.x = width / 2;
  player.y = 60;
  player.health = MAX_HEALTH;
  player.maxHealth = MAX_HEALTH;
  player.invincible = false;
  player.invincibleTimer = 0;
  player.bounceVX = 0;
  player.bounceVY = 0;
  player.facing = 1;
  player.moveTimer = 0;

  camY = 0;

  let data = obstacleData[currentLevel.obstacleFile];
  obstacles = data.obstacles.map((o) => ({ x: o.x, y: o.y, size: o.size }));
}

// ------------------------------------------------------------
// updateSwimLevel()
// Called once per frame from sketch.js while the current scene
// is a swim level. Advances input, physics, and the level-clear
// check. Does nothing once the level has switched to CHOICE.
// ------------------------------------------------------------
function updateSwimLevel() {
  if (subState !== SUBSTATE_SWIMMING || !currentLevel) return;

  handleSwimInput();
  applyBounce();
  checkObstacleCollision();
  updateInvincibility();

  let targetY = constrain(
    player.y - height * 0.4,
    0,
    max(currentLevel.worldH - height, 0),
  );
  camY = lerp(camY, targetY, CAM_SMOOTHING);

  if (player.y > currentLevel.worldH) {
    subState = SUBSTATE_CHOICE;
  }
}

// ------------------------------------------------------------
// handleSwimInput()
// The current always pulls the diver down; steering only
// changes how much you resist it or dodge sideways.
// ------------------------------------------------------------
function handleSwimInput() {
  let vy = CURRENT_SPEED;
  let vx = 0;
  let moving = false;

  if (keyIsDown(87) || keyIsDown(UP_ARROW)) {
    vy -= RESIST_SPEED;
    moving = true;
  }
  if (keyIsDown(83) || keyIsDown(DOWN_ARROW)) {
    vy += RESIST_SPEED * 0.6;
    moving = true;
  }
  if (keyIsDown(65) || keyIsDown(LEFT_ARROW)) {
    vx -= STRAFE_SPEED;
    player.facing = -1;
    moving = true;
  }
  if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) {
    vx += STRAFE_SPEED;
    player.facing = 1;
    moving = true;
  }

  player.x += vx;
  player.y += vy;
  player.x = constrain(player.x, player.r, width - player.r);
  player.y = max(player.y, player.r);

  if (moving) {
    player.moveTimer++;
    if (player.moveTimer % STROKE_SOUND_INTERVAL === 0) {
      if (sfx.stroke && sfx.stroke.isLoaded() && !sfx.stroke.isPlaying()) {
        sfx.stroke.play();
      }
    }
  }
}

// ------------------------------------------------------------
// applyBounce()
// Knockback from an obstacle hit decays over a few frames.
// ------------------------------------------------------------
function applyBounce() {
  if (abs(player.bounceVX) > 0.1 || abs(player.bounceVY) > 0.1) {
    player.x += player.bounceVX;
    player.y += player.bounceVY;
    player.bounceVX *= 0.75;
    player.bounceVY *= 0.75;
    player.x = constrain(player.x, player.r, width - player.r);
    player.y = max(player.y, player.r);
  }
}

// ------------------------------------------------------------
// checkObstacleCollision()
// Circle-vs-AABB collision, same closest-point math as the
// source shooter. On a hit: knockback + invincibility frames.
// Running out of health respawns at the top of THIS level's
// obstacle field with full health — no persistence, no
// game-over state, per the "reset each level" design decision.
// ------------------------------------------------------------
function checkObstacleCollision() {
  if (player.invincible) return;

  for (let i = 0; i < obstacles.length; i++) {
    let o = obstacles[i];
    let closestX = constrain(player.x, o.x - o.size / 2, o.x + o.size / 2);
    let closestY = constrain(player.y, o.y - o.size / 2, o.y + o.size / 2);
    let d = dist(player.x, player.y, closestX, closestY);

    if (d < player.r) {
      player.health--;
      player.invincible = true;
      player.invincibleTimer = INVINCIBLE_FRAMES;

      let dx = player.x - o.x;
      let dy = player.y - o.y;
      let len = dist(0, 0, dx, dy) || 1;
      player.bounceVX = (dx / len) * 6;
      player.bounceVY = (dy / len) * 6 + 1;

      if (sfx.hit && sfx.hit.isLoaded()) sfx.hit.play();

      if (player.health <= 0) {
        player.health = player.maxHealth;
        player.y = 60;
        player.x = width / 2;
        camY = 0;
      }
      break;
    }
  }
}

function updateInvincibility() {
  if (player.invincible) {
    player.invincibleTimer--;
    if (player.invincibleTimer <= 0) player.invincible = false;
  }
}
