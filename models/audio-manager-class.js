/**
 * Manages all game audio.
 */
class AudioHub {
    static CHARACTER_WALKING = new Audio('./assets/audio/character/walk/stone-chain-walk-4.ogg');
    static CHARACTER_IDLE = new Audio('./assets/audio/character/idle/idle-blinking.mp3');
    static CHARACTER_JUMPING = new Audio('./assets/audio/character/jump/stone-jump.ogg');
    static CHARACTER_LAND = new Audio('./assets/audio/character/jump/stone-land.ogg');
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
        AudioHub.CHARACTER_LAND,
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

    /**
     * Plays a sound.
     * 
     * @param {HTMLAudioElement} sound
     * @returns {void}
     */
    static playOne(sound) {
        if (sound.readyState == 4) {
            if (playSound === "true") {
                sound.volume = 0.6;
                sound.play();
            }
        }
    }

    /**
     * Plays idle sound.
     * 
     * @param {HTMLAudioElement} sound
     * @returns {void}
     */
    static playIdle(sound) {
        if (sound.readyState == 4) {
            if (playSound === "true") {
                sound.volume = 0.1;
                sound.playbackRate = 0.58;
                sound.play();
            }
        }
    }

    /**
     * Stops idle sound.
     * 
     * @param {HTMLAudioElement} sound
     * @returns {void}
     */
    static stopIdle(sound) {
        if (playSound === "true") {
            sound.pause();
            sound.volume = 0;
            sound.currentTime = 0;
        }
    }

    /**
     * Pauses a sound.
     * 
     * @param {HTMLAudioElement} sound
     * @returns {void}
     */
    static pauseOne(sound) {
        sound.pause();
    }

    /**
     * Stops a sound.
     * 
     * @param {HTMLAudioElement} sound
     * @returns {void}
     */
    static stopOne(sound) {
        sound.pause();
        sound.currentTime = 0;
    }

    /**
     * Mutes all sounds.
     * 
     * @returns {void}
     */
    static stopAll() {
        AudioHub.allSounds.forEach(sound => {
            sound.volume = 0;
        });
    }

    /**
     * Stops all sounds.
     * 
     * @returns {void}
     */
    static stopAllStart() {
        if (playSound === "true") {
            AudioHub.allSounds.forEach(sound => {
                sound.pause();
                sound.currentTime = 0;
            });
        }
    }

    /**
     * Enables all sounds.
     * 
     * @returns {void}
     */
    static playAll() {
        AudioHub.allSounds.forEach(sound => {
            sound.volume = 0.6;
        });
    }
}
