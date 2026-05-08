let canvas;
let ctx;
let world;
let keyboard = new Keyboard();
let mobilControl = new MobilControl();
let playSound = true;
let gameWin = false;

function init() {
  canvas = document.getElementById('canvas');
  world = new World(canvas, keyboard);
}

function loadGame() {
  let startScreen = document.getElementById(`start-screen`);
  let soundControl = document.getElementById(`sound-control`);
  let startMenu = document.getElementById(`bottom-menu`);
  startScreen.innerHTML = getHTMLForStartScreen();
  soundControl.innerHTML = getHTMLForSoundButton();
  startMenu.innerHTML = getHTMLForMenu();
  document.getElementById("end-screen").classList.add("d-none");
  document.getElementById("win-screen").classList.add("d-none");
  document.getElementById("start-screen").classList.remove("d-none");
    document.getElementById("impressum").classList.remove("d-none");
  document.getElementById("instructions").classList.remove("d-none");
   AudioHub.stopAllStart();
}

function startGame() {
  AudioHub.playOne(AudioHub.TITEL_MUSIC);
  initLevel();
  init();
  setTimeout(() => {
    AudioHub.stopOne(AudioHub.TITEL_MUSIC);
  }, 10000);

  document.getElementById("start-screen").classList.add("d-none");
  document.getElementById("impressum").classList.add("d-none");
  document.getElementById("instructions").classList.add("d-none");
  document.getElementById("end-screen").classList.add("d-none");
  document.getElementById("win-screen").classList.add("d-none");

}

function toogleSound() {
  let buttonSoundOn = document.getElementById(`sound-on`);
  let buttonSoundMute = document.getElementById(`sound-mute`);
  if (playSound) {
    buttonSoundOn.classList.add("d-none");
    buttonSoundMute.classList.remove("d-none");
    AudioHub.stopAll();
  } else {
    AudioHub.playAll();
    buttonSoundOn.classList.remove("d-none");
    buttonSoundMute.classList.add("d-none");
  }

}

function endScreenLost() {
  AudioHub.stopAll();
  let endScreen = document.getElementById("end-screen");
  endScreen.classList.remove("d-none");
  endScreen.innerHTML = getHTMLForScreenLost();
  AudioHub.playAll();
  AudioHub.playOne(AudioHub.GAME_OVER);

}

function endScreenWin() {
   AudioHub.stopAll()
  let winScreen = document.getElementById("win-screen");
  winScreen.innerHTML = getHTMLForScreenWin();
  winScreen.classList.remove("d-none");
   AudioHub.playAll();
   AudioHub.playOne(AudioHub.OUTRO);
}

window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowRight':
      keyboard.RIGHT = true;
      break;
    case 'ArrowLeft':
      keyboard.LEFT = true;
      break;
    case 'ArrowUp':
      keyboard.UP = true;
      break;
    case 'ArrowDown':
      keyboard.DOWN = true;
      break;
    case 'd':
    case 'D':
      keyboard.KEY_D = true;
      break;
    case ' ':
    case 'Spacebar':
    case 'Space':
      keyboard.SPACE = true;
      break;
  }
});

window.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'ArrowRight':
      keyboard.RIGHT = false;
      break;
    case 'ArrowLeft':
      keyboard.LEFT = false;
      break;
    case 'ArrowUp':
      keyboard.UP = false;
      break;
    case 'ArrowDown':
      keyboard.DOWN = false;
      break;
    case 'd':
    case 'D':
      keyboard.KEY_D = false;
      break;
    case ' ':
    case 'Spacebar':
    case 'Space':
      keyboard.SPACE = false;
      break;
  }
});

function setupMobileControls() {
    function bindButton(id, keyName) {
        const btn = document.getElementById(id);
        btn.addEventListener("touchstart", (e) => {
            e.preventDefault();
            keys[keyName] = true;
        });
        btn.addEventListener("touchend", (e) => {
            e.preventDefault();
            keys[keyName] = false;
        });
    }
    bindButton("leftBtn", "LEFT");
    bindButton("rightBtn", "RIGHT");
    bindButton("upBtn", "UP");
    bindButton("downBtn", "DOWN");
    bindButton("spaceBtn", "SPACE");
    bindButton("dBtn", "KEY_D");
}
