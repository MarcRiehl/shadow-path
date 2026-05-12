/** @type {HTMLCanvasElement} */
let canvas;

/** @type {CanvasRenderingContext2D} */
let ctx;

/** @type {World} */
let world;

/** @type {Keyboard} */
let keyboard = new Keyboard();

/** @type {MobilControl} */
let mobilControl = new MobilControl();

/**
 * Saved sound setting from local storage.
 * 
 * @type {string}
 */
let playSound = localStorage.getItem("playSound") || "true";

/** @type {boolean} */
let gameWin = false;

/**
 * Initializes the game world.
 * 
 * @returns {void}
 */
function init() {
  canvas = document.getElementById('canvas');
  world = new World(canvas, keyboard, mobilControl);
}

/**
 * Loads the start screen.
 * 
 * @returns {void}
 */
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
  document.getElementById("bottom-menu").classList.remove("d-none");
  document.getElementById("mobil-control").classList.remove("d-none");
  AudioHub.stopOne(AudioHub.OUTRO);
  this.loadSoundState();
}

/**
 * Starts the game.
 * 
 * @returns {void}
 */
function startGame() {
  AudioHub.stopOne(AudioHub.OUTRO);
  AudioHub.playOne(AudioHub.TITEL_MUSIC);
  initLevel();
  init();
  world.endbossDead = false;
  setTimeout(() => {
    AudioHub.stopOne(AudioHub.TITEL_MUSIC);
  }, 10000);
  document.getElementById("bottom-menu").classList.add("d-none");
  document.getElementById("start-screen").classList.add("d-none");
  document.getElementById("end-screen").classList.add("d-none");
  document.getElementById("win-screen").classList.add("d-none");
  showMobileControls();
}

/**
 * Shows mobile controls on small screens.
 * 
 * @returns {void}
 */
function showMobileControls() {
  if (window.innerWidth <= 1366) {
    document.getElementById('mobil-control').style.display = 'block';
    document.getElementById("mobil-control").classList.remove("d-none");
  }
}

/**
 * Toggles game sound on and off.
 * 
 * @local
 * @type {HTMLElement}
 * buttonSoundOn - Sound enabled button.
 * 
 * @local
 * @type {HTMLElement}
 * buttonSoundMute - Sound muted button.
 */
function toggleSound() {
    let buttonSoundOn = document.getElementById("sound-on");
    let buttonSoundMute = document.getElementById("sound-mute");
    if (playSound === "true") {
        playSound = "false";
        localStorage.setItem("playSound", playSound);
        buttonSoundOn.classList.add("d-none");
        buttonSoundMute.classList.remove("d-none");
        AudioHub.stopAll();
    } else {
        playSound = "true";
        localStorage.setItem("playSound", playSound);
        buttonSoundOn.classList.remove("d-none");
        buttonSoundMute.classList.add("d-none");
        AudioHub.playAll();
    }
}

/**
 * Loads the saved sound state
 * and updates the sound buttons.
 * 
 * @local
 * @type {HTMLElement}
 * buttonSoundOn - Sound enabled button.
 * 
 * @local
 * @type {HTMLElement}
 * buttonSoundMute - Sound muted button.
 */
function loadSoundState() {
    let buttonSoundOn = document.getElementById("sound-on");
    let buttonSoundMute = document.getElementById("sound-mute");
    if (playSound === "false") {
        buttonSoundOn.classList.add("d-none");
        buttonSoundMute.classList.remove("d-none");
    } else {
        buttonSoundOn.classList.remove("d-none");
        buttonSoundMute.classList.add("d-none");
    }
}

/**
 * Shows the lose screen.
 * 
 * @returns {void}
 */
function endScreenLost() {
  let endScreen = document.getElementById("end-screen");
  endScreen.classList.remove("d-none");
  endScreen.innerHTML = getHTMLForScreenLost();
  AudioHub.playOne(AudioHub.GAME_OVER);
  document.getElementById("mobil-control").classList.add("d-none");
}

/**
 * Shows the win screen.
 * 
 * @returns {void}
 */
function endScreenWin() {
  let winScreen = document.getElementById("win-screen");
  winScreen.innerHTML = getHTMLForScreenWin();
  winScreen.classList.remove("d-none");
  AudioHub.playOne(AudioHub.OUTRO);
  document.getElementById("mobil-control").classList.add("d-none");
}

/**
 * Opens the impressum modal.
 * 
 * @returns {void}
 */
function openModalImpressum() {
  let impressum = document.getElementById("impressum");
  impressum.innerHTML = getHTMLForImpressum();
  impressum.classList.remove('d-none');
}


/**
 * Closes the impressum modal.
 * 
 * @returns {void}
 */
function closeModalImpressum() {
  document.getElementById('impressum').classList.add('d-none');
}

/**
 * Opens the instructions modal.
 * 
 * @returns {void}
 */
function openModalInstructions() {
  let instructions = document.getElementById("instructions");
  instructions.innerHTML = getHTMLForInstructions();
  instructions.classList.remove('d-none');
}

/**
 * Closes the instructions modal.
 * 
 * @returns {void}
 */
function closeModalInstructions() {
  document.getElementById('instructions').classList.add('d-none');
}

/**
 * Handles keyboard key press events.
 */
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

/**
 * Handles keyboard key release events.
 */
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

/**
 * Initializes mobile touch controls after page load.
 */
window.addEventListener('load', () => {
  document.getElementById("leftBtn").addEventListener("touchstart", (e) => {
    e.preventDefault();
    mobilControl.LEFT = true;
  });

  document.getElementById("leftBtn").addEventListener("touchend", (e) => {
    e.preventDefault();
    mobilControl.LEFT = false;
  });

  document.getElementById("rightBtn").addEventListener("touchstart", (e) => {
    e.preventDefault();
    mobilControl.RIGHT = true;
  });

  document.getElementById("rightBtn").addEventListener("touchend", (e) => {
    e.preventDefault();
    mobilControl.RIGHT = false;
  });

  document.getElementById("spaceBtn").addEventListener("touchstart", (e) => {
    e.preventDefault();
    mobilControl.SPACE = true;
  });

  document.getElementById("spaceBtn").addEventListener("touchend", (e) => {
    e.preventDefault();
    mobilControl.SPACE = false;
  });

  document.getElementById("dBtn").addEventListener("touchstart", (e) => {
    e.preventDefault();
    mobilControl.KEY_D = true;
  });

  document.getElementById("dBtn").addEventListener("touchend", (e) => {
    e.preventDefault();
    mobilControl.KEY_D = false;
  });
});