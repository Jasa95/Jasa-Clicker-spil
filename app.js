"use strict";
window.addEventListener("load", initApp);

let points = 0;
let lives = 0;

function initApp() {
  console.log("JS er i gang");
  document.querySelector("#btn_start").addEventListener("click", gameStart);
}

function gameStart() {
  points = 0;
  lives = 3;

  document.querySelector("#start").classList.add("hidden");

  document.querySelector("#sound-background").play();

  startEveryAnimations();

  function startEveryAnimations() {
    document.querySelector("#enemy1_container").classList.add("running");
    document.querySelector("#enemy2_container").classList.add("running");
    document.querySelector("#enemy3_container").classList.add("running");
    document.querySelector("#enemy4_container").classList.add("running");
    document.querySelector("#friend1_container").classList.add("running");
    document.querySelector("#friend2_container").classList.add("running");
    document.querySelector("#friend3_container").classList.add("running");
    document.querySelector("#friend4_container").classList.add("running");
  }
  document
    .querySelector("#enemy1_container")
    .addEventListener("mousedown", enemyClicked);
  document
    .querySelector("#enemy2_container")
    .addEventListener("mousedown", enemyClicked);
  document
    .querySelector("#enemy3_container")
    .addEventListener("mousedown", enemyClicked);
  document
    .querySelector("#enemy4_container")
    .addEventListener("mousedown", enemyClicked);
  document
    .querySelector("#friend1_container")
    .addEventListener("mousedown", friendClicked);
  document
    .querySelector("#friend2_container")
    .addEventListener("mousedown", friendClicked);
  document
    .querySelector("#friend3_container")
    .addEventListener("mousedown", friendClicked);
  document
    .querySelector("#friend4_container")
    .addEventListener("mousedown", friendClicked);

  startPositions();
}

function startPositions() {
  document.querySelector("#enemy1_container").classList.add("position1");
  document.querySelector("#enemy2_container").classList.add("position2");
  document.querySelector("#enemy3_container").classList.add("position3");
  document.querySelector("#enemy4_container").classList.add("position4");
  document.querySelector("#friend1_container").classList.add("position5");
  document.querySelector("#friend2_container").classList.add("position6");
  document.querySelector("#friend3_container").classList.add("position7");
  document.querySelector("#friend4_container").classList.add("position8");
}

// Enemies

function enemyClicked() {
  let enemy = this;
  console.log(enemy.querySelector("img"));
  enemy.removeEventListener("mousedown", enemyClicked);

  enemy.classList.add("paused");

  enemy.querySelector("img").classList.add("zoom_out");

  enemy.addEventListener("animationend", enemyGone);

  document.querySelector("#sound-enemy-dead").play();
  givePoint();
}

// Enemies væk
function enemyGone() {
  let enemy = this;
  enemy.removeEventListener("animationend", enemyGone);
  enemy.querySelector("img").classList.remove("zoom_out");
  enemy.classList.remove("paused");

  enemy.classList.remove("running");
  enemy.offsetWidth;
  enemy.classList.add("running");

  enemy.addEventListener("mousedown", enemyClicked);
  enemySpawn.call(this);
}

function enemySpawn() {
  let enemy = this;
  enemy.removeEventListener("animationend", enemySpawn);
  enemy.classList.remove("running");
  enemy.offsetWidth;
  let number = Math.floor(Math.random() * 4) + 1;
  enemy.classList.add("running" + number);
  enemy.classList.remove(
    "position1",
    "position2",
    "position3",
    "position4",
    "position5",
    "position6",
    "position7",
    "position8"
  );

  let pos = Math.floor(Math.random() * 8) + 1;
  enemy.classList.add("position" + pos);
  enemy.addEventListener("animationend", enemySpawn);
}

/* Friendly */

function friendClicked() {
  console.log("CLICK");
  console.log(this);
  let friend = this;
  friend.removeEventListener("mousedown", friendClicked);
  friend.removeEventListener("animationend", friendClicked);

  friend.querySelector("img").classList.remove("zoom_out");
  friend.offsetWidth;
  friend.querySelector("img").classList.add("zoom_out");

  friend.addEventListener("animationend", friendGone);

  document.querySelector("#sound-friendly-fire").play();
  takeLife();
}

function friendGone() {
  let friend = this;

  console.log(friend);

  friend.removeEventListener("animationend", friendGone);
  friend.querySelector("img").classList.remove("zoom-out");

  friend.classList.remove("running");
  friend.offsetWidth;
  friend.classList.add("running");

  friend.addEventListener("mousedown", friendClicked);
}
function friendSpawn() {
  let friend = this;
  friend.removeEventListener("animationend", friendSpawn);
  friend.classList.remove("running");
  friend.offsetWidth;
  let number = Math.floor(Math.random() * 4) + 1;
  friend.classList.add("running" + number);
  friend.classList.remove(
    "position1",
    "position2",
    "position3",
    "position4",
    "position5",
    "position6",
    "position7",
    "position8"
  );

  let pos = Math.floor(Math.random() * 8) + 1;
  friend.classList.add("position" + pos);
  friend.addEventListener("animationend", friendSpawn);
}

function takeLife() {
  if (lives === 1) {
    displayLostLife();
    gameOver();
  } else {
    displayLostLife();
  }
  lives--;
}

function displayLostLife() {
  document.querySelector("#Life" + lives).classList.add("hidden");
  document.querySelector("#lostLife" + lives).classList.remove("hidden");
}

function givePoint() {
  console.log("+1");
  points++;
  console.log(points + "points i alt");
  displayPoints();
}

function displayPoints() {
  console.log("points er her");
  document.querySelector("#coin_count").textContent = points;
}

function gameOver() {
  console.log("Game is over");
  document.querySelector("#game-over").classList.remove("hidden");
  stopGame();
  document.querySelector("#sound-gameover").play();
  document.querySelector("#btn_restart").addEventListener("click", restartGame);
}

function stopGame() {
  document.querySelector("#enemy1_container").classList.remove("running");
  document.querySelector("#enemy2_container").classList.remove("running");
  document.querySelector("#enemy3_container").classList.remove("running");
  document.querySelector("#enemy4_container").classList.remove("running");
  document.querySelector("#friend1_container").classList.remove("running");
  document.querySelector("#friend2_container").classList.remove("running");
  document.querySelector("#friend3_container").classList.remove("running");
  document.querySelector("#friend4_container").classList.remove("running");

  document
    .querySelector("#enemy1_container")
    .removeEventListener("mousedown", enemyClicked);
  document
    .querySelector("#enemy2_container")
    .removeEventListener("mousedown", enemyClicked);
  document
    .querySelector("#enemy3_container")
    .removeEventListener("mousedown", enemyClicked);
  document
    .querySelector("#enemy4_container")
    .removeEventListener("mousedown", enemyClicked);
  document
    .querySelector("#friend1_container")
    .removeEventListener("mousedown", friendClicked);
  document
    .querySelector("#friend2_container")
    .removeEventListener("mousedown", friendClicked);
  document
    .querySelector("#friend3_container")
    .removeEventListener("mousedown", friendClicked);
  document
    .querySelector("#friend4_container")
    .removeEventListener("mousedown", friendClicked);

  document.querySelector("#sound-background").pause();
  document.querySelector("#sound-background").currentTime = 0;
}

function restartGame() {
  document.querySelector("#game-over").classList.add("hidden");
  document.querySelector("#Life1").classList.remove("hidden");
  document.querySelector("#Life2").classList.remove("hidden");
  document.querySelector("#Life3").classList.remove("hidden");
  document.querySelector("#lostLife1").classList.add("hidden");
  document.querySelector("#lostLife2").classList.add("hidden");
  document.querySelector("#lostLife3").classList.add("hidden");
  document.querySelector("#game-over").classList.add("hidden");
  document.querySelector("#coin_count").textContent = points = 0;

  gameStart();
}
