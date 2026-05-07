class AudioHub {
    static CHARACTER_WALKING = new Audio('./assets/audio/character/walk/stone-chain-walk-4.ogg');
    static CHARACTER_IDLE = new Audio('./assets/audio/character/idle/idle-blinking.mp3');
    static CHARACTER_JUMPING = new Audio('./assets/audio/character/jump/stone-jump.ogg');
    static COLLECT_COIN = new Audio('./assets/audio/coin/coin.wav');
    static PICK_UP_STAFF = new Audio('./assets/audio/staff/pick-up-staff.wav');
    static GAME_OVER = new Audio('./assets/audio/game/game-over.ogg');
    static GET_READY = new Audio('./assets/audio/game/get-ready.ogg');
    static TITEL_MUSIC = new Audio('./assets/audio/startscreen/after-theme2.mp3');


    static allSounds = [
        AudioHub.CHARACTER_WALKING,
        AudioHub.CHARACTER_IDLE,
        AudioHub.CHARACTER_JUMPING,
        AudioHub.COLLECT_COIN,
        AudioHub.PICK_UP_STAFF,
        AudioHub.GAME_OVER,
        AudioHub.GET_READY,
        AudioHub.TITEL_MUSIC
    ];


    static playOne(sound) {
        if (sound.readyState == 4) {
            if(playSound == true){
            sound.volume = 0.6;
            sound.play();
            }
        }
    }

    static playIdle(sound) {
        if (sound.readyState == 4) {
            sound.volume = 0.1;
            sound.playbackRate = 0.58;
            sound.play();
        }
    }

    static pauseOne(sound) {
        sound.pause();
    }

    static stopOne(sound) {
        sound.pause();
        sound.currentTime = 0;
    }

    static stopAll() {
        playSound = false;
        AudioHub.allSounds.forEach(sound => {
            // sound.pause();
            sound.volume = 0;
        });
    }

    static playAll() {
        playSound = true;
        AudioHub.allSounds.forEach(sound => {
            sound.volume = 0.6;
        });
    }
}
