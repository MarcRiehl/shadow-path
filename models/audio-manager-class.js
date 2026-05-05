class AudioHub {

    static CHARACTER_WALKING = new Audio('./assets/audio/character/walk/stone-chain-walk-4.ogg');
    static CHARACTER_IDLE = new Audio('./assets/audio/character/idle/idle-blinking.mp3');
    static CHARACTER_JUMPING = new Audio('./assets/audio/character/jump/stone-jump.ogg');

    static allSounds = [AudioHub.CHARACTER_WALKING, AudioHub.CHARACTER_IDLE, AudioHub.CHARACTER_JUMPING];


    static playOne(sound) {
        if (sound.readyState == 4) {
            sound.volume = 0.8;
            sound.play();
        }
    }

    static playIdle(sound) {
        if (sound.readyState == 4) {
            sound.volume = 0.1; 
            sound.playbackRate = 0.58;
            sound.play();

        }
    }

    static stopOne(sound) {
        sound.pause(); 
    }

    static stopAll() {
        AudioHub.allSounds.forEach(sound => {
            sound.pause();
        });
    }
}