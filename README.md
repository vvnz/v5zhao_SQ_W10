# Getting Under It — Currents

A remix that fuses two earlier Side Quests into one game: **Getting Under It** (a branching visual novel where a scuba diver makes binary story choices, ending in one of 8 outcomes) and **Papers Please — Border Checkpoint** (a top-down scroller with camera-follow, JSON-driven obstacles, collision/knockback, and a health HUD). A real-time "swim down and dodge obstacles" segment now plays in front of every choice screen: read the narration, dodge obstacles on the way down, then make your choice once you reach the bottom.

## Setup and Interaction Instructions

To run the sketch locally, open `index.html` in Google Chrome using Live Server (or any local static server — `loadJSON`/`loadImage` require `http://`, not `file://`).

Controls (swim levels):

* Strafe sideways to dodge obstacles: **A/D** or **◀ ▶**
* Briefly resist the current (slow your descent): **W** or **▲**
* Drop faster: **S** or **▼**

The current always pulls you down — you don't need to hold anything to descend.

Choice screens: click one of the two buttons to pick your path.

Endings: click **Try Again** to restart from the opening.

## Assets

| File | Description | Source |
|------|-------------|-------|
| `assets/images/surface.png` | Opening / surface descent background | Original — procedurally generated pixel art |
| `assets/images/dive_fast.png` | Fast-current level background | Original — procedurally generated pixel art |
| `assets/images/dive_slow.png` | Gentle-drift level background | Original — procedurally generated pixel art |
| `assets/images/cave_entrance.png` | Cave level background | Original — procedurally generated pixel art |
| `assets/images/current.png` | Open-water level background | Original — procedurally generated pixel art |
| `assets/images/shipwreck.png` | Shipwreck level background | Original — procedurally generated pixel art |
| `assets/images/kelp_forest.png` | Kelp forest level background | Original — procedurally generated pixel art |
| `assets/images/abyss.png` | Ending: The Abyss | Original — procedurally generated pixel art |
| `assets/images/surface_fail.png` | Endings: Back to the Surface / Wrong Way | Original — procedurally generated pixel art |
| `assets/images/whale.png` | Ending: The Whale | Original — procedurally generated pixel art |
| `assets/images/trench.png` | Ending: The Trench | Original — procedurally generated pixel art |
| `assets/images/shipwreck_interior.png` | Ending: Lost in the Ship | Original — procedurally generated pixel art |
| `assets/images/ocean_floor.png` | Ending: Found the Floor | Original — procedurally generated pixel art |
| `assets/sounds/underwater.mp3` | Ambient background loop | ShadowsAndEchoes — "Fear the Deep Dark Ambient Horror" (Pixabay) |
| `assets/sounds/hit.mp3` | Obstacle-collision sound | Pixabay — "Retro Hurt 2" |

## References

1. ShadowsAndEchoes. 2023. *Fear the Deep Dark Ambient Horror.* Pixabay. Retrieved July 22, 2026 from https://pixabay.com/music/mystery-fear-the-deep-dark-ambient-horror-394143/
2. Pixabay. n.d. *Retro Hurt 2.* Pixabay Sound Effects. Retrieved July 22, 2026 from https://pixabay.com/sound-effects/film-special-effects-retro-hurt-2-236675/
