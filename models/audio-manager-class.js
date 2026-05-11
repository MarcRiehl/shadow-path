class AudioHub {
    static CHARACTER_WALKING = new Audio('./assets/audio/character/walk/stone-chain-walk-4.ogg');
    static CHARACTER_IDLE = new Audio('./assets/audio/character/idle/idle-blinking.mp3');
    static CHARACTER_JUMPING = new Audio('./assets/audio/character/jump/stone-jump.ogg');
    static COLLECT_COIN = new Audio('./assets/audio/coin/coin.wav');
    static PICK_UP_STAFF = new Audio('./assets/audio/staff/pick-up-staff.wav');
    static GAME_OVER = new Audio('./assets/audio/game/game-over.ogg');
    static GET_READY = new Audio('./assets/audio/game/get-ready.ogg');
    static TITEL_MUSIC = new Audio('./assets/audio/startscreen/after-theme2.mp3');
    static HIT_JUMP = new Audio('./assets/audio/enemies/hit-jump.wav');
    static THROW_FIREBALL = new Audio('./assets/audio/character/throw/fireball.ogg');
    static EXPLOSION = new Audio('./assets/audio/enemies/explosion-small.wav');
    static OUTRO = new Audio('./assets/audio/startscreen/outro.mp3');
    static BOSS_FIGHT = new Audio('./assets/audio/boss/boss-fight.mp3');
    static HIT_CHARACTER = new Audio('./assets/audio/character/hit/punch_3.wav');
    static HIT_BOSS = new Audio('./assets/audio/boss/slap.wav');


    static allSounds = [
        AudioHub.CHARACTER_WALKING,
        AudioHub.CHARACTER_IDLE,
        AudioHub.CHARACTER_JUMPING,
        AudioHub.COLLECT_COIN,
        AudioHub.PICK_UP_STAFF,
        AudioHub.GAME_OVER,
        AudioHub.GET_READY,
        AudioHub.TITEL_MUSIC,
        AudioHub.HIT_JUMP,
        AudioHub.THROW_FIREBALL,
        AudioHub.EXPLOSION,
        AudioHub.OUTRO,
        AudioHub.BOSS_FIGHT,
        AudioHub.HIT_CHARACTER,
        AudioHub.HIT_BOSS
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
            if(playSound == true){
            sound.volume = 0.1;
            sound.playbackRate = 0.58;
            sound.play();
            }
        }
    }

    static stopIdle(sound) {
        if(playSound == true){
        sound.pause();
        sound.volume = 0;
        sound.currentTime = 0;
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
            sound.volume = 0;
        });
    }

    static stopAllStart() {
        if(playSound == true){
        AudioHub.allSounds.forEach(sound => {
        sound.pause();
        sound.currentTime = 0;
        });
        }
    }
    static playOneStart(sound){
        if(playSound == true){

        }
    }

    static playAll() {
        playSound = true;
        AudioHub.allSounds.forEach(sound => {
            sound.volume = 0.6;
        });
    }
}
