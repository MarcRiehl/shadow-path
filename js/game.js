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
  let buttonSound = document.getElementById("sound-button");
  buttonSound.classList.add("d-none");

}

function endScreenWin() {
   let buttonSound = document.getElementById("sound-button");
   buttonSound.classList.add("d-none");
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
