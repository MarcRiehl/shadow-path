class Character extends MovableObject {
    height = 200;
    width = 150;
    y = 240; //war 155
    speed = 10;
    world;


    offset = {
        top: 40,
        bottom: 35,
        left: 60,
        right: 60
    }

    IMAGES_WALKING = [
        './img/2_character_angel/walking/0_fallen_angels_walking_000.png',
        './img/2_character_angel/walking/0_fallen_angels_walking_001.png',
        './img/2_character_angel/walking/0_fallen_angels_walking_002.png',
        './img/2_character_angel/walking/0_fallen_angels_walking_003.png',
        './img/2_character_angel/walking/0_fallen_angels_walking_004.png',
        './img/2_character_angel/walking/0_fallen_angels_walking_005.png',
        './img/2_character_angel/walking/0_fallen_angels_walking_006.png',
        './img/2_character_angel/walking/0_fallen_angels_walking_007.png',
        './img/2_character_angel/walking/0_fallen_angels_walking_008.png',
        './img/2_character_angel/walking/0_fallen_angels_walking_009.png',
        './img/2_character_angel/walking/0_fallen_angels_walking_010.png',
        './img/2_character_angel/walking/0_fallen_angels_walking_011.png',
        './img/2_character_angel/walking/0_fallen_angels_walking_012.png',
        './img/2_character_angel/walking/0_fallen_angels_walking_013.png',
        './img/2_character_angel/walking/0_fallen_angels_walking_014.png',
        './img/2_character_angel/walking/0_fallen_angels_walking_015.png',
        './img/2_character_angel/walking/0_fallen_angels_walking_016.png',
        './img/2_character_angel/walking/0_fallen_angels_walking_017.png',
        './img/2_character_angel/walking/0_fallen_angels_walking_018.png',
        './img/2_character_angel/walking/0_fallen_angels_walking_019.png',
        './img/2_character_angel/walking/0_fallen_angels_walking_020.png',
        './img/2_character_angel/walking/0_fallen_angels_walking_021.png',
        './img/2_character_angel/walking/0_fallen_angels_walking_022.png',
        './img/2_character_angel/walking/0_fallen_angels_walking_023.png'


    ];

    IMAGES_JUMPING = [
        './img/2_character_angel/jump_loop/0_fallen_angels_jump_loop_000.png',
        './img/2_character_angel/jump_loop/0_fallen_angels_jump_loop_001.png',
        './img/2_character_angel/jump_loop/0_fallen_angels_jump_loop_002.png',
        './img/2_character_angel/jump_loop/0_fallen_angels_jump_loop_003.png',
        './img/2_character_angel/jump_loop/0_fallen_angels_jump_loop_004.png',
        './img/2_character_angel/jump_loop/0_fallen_angels_jump_loop_005.png'
    ];

    IMAGES_DEAD = [
        './img/2_character_angel/dying/0_fallen_angels_dying_000.png',
        './img/2_character_angel/dying/0_fallen_angels_dying_001.png',
        './img/2_character_angel/dying/0_fallen_angels_dying_002.png',
        './img/2_character_angel/dying/0_fallen_angels_dying_003.png',
        './img/2_character_angel/dying/0_fallen_angels_dying_004.png',
        './img/2_character_angel/dying/0_fallen_angels_dying_005.png',
        './img/2_character_angel/dying/0_fallen_angels_dying_006.png',
        './img/2_character_angel/dying/0_fallen_angels_dying_007.png',
        './img/2_character_angel/dying/0_fallen_angels_dying_008.png',
        './img/2_character_angel/dying/0_fallen_angels_dying_009.png',
        './img/2_character_angel/dying/0_fallen_angels_dying_010.png',
        './img/2_character_angel/dying/0_fallen_angels_dying_011.png',
        './img/2_character_angel/dying/0_fallen_angels_dying_012.png',
        './img/2_character_angel/dying/0_fallen_angels_dying_013.png',
        './img/2_character_angel/dying/0_fallen_angels_dying_014.png',


    ];
    IMAGES_HURT = [
        './img/2_character_angel/hurt/0_fallen_angels_hurt_000.png',
        './img/2_character_angel/hurt/0_fallen_angels_hurt_001.png',
        './img/2_character_angel/hurt/0_fallen_angels_hurt_002.png',
        './img/2_character_angel/hurt/0_fallen_angels_hurt_003.png',
        './img/2_character_angel/hurt/0_fallen_angels_hurt_004.png',
        './img/2_character_angel/hurt/0_fallen_angels_hurt_005.png',
        './img/2_character_angel/hurt/0_fallen_angels_hurt_006.png',
        './img/2_character_angel/hurt/0_fallen_angels_hurt_007.png',
        './img/2_character_angel/hurt/0_fallen_angels_hurt_008.png',
        './img/2_character_angel/hurt/0_fallen_angels_hurt_009.png',
        './img/2_character_angel/hurt/0_fallen_angels_hurt_010.png',
        './img/2_character_angel/hurt/0_fallen_angels_hurt_011.png'
    ];
    IMAGES_SHORT_IDLE = [
        './img/2_character_angel/idle/0_fallen_angels_idle_001.png',
        './img/2_character_angel/idle/0_fallen_angels_idle_002.png',
        './img/2_character_angel/idle/0_fallen_angels_idle_003.png',
        './img/2_character_angel/idle/0_fallen_angels_idle_004.png',
        './img/2_character_angel/idle/0_fallen_angels_idle_005.png',
        './img/2_character_angel/idle/0_fallen_angels_idle_006.png',
        './img/2_character_angel/idle/0_fallen_angels_idle_007.png',
        './img/2_character_angel/idle/0_fallen_angels_idle_008.png',
        './img/2_character_angel/idle/0_fallen_angels_idle_009.png',
        './img/2_character_angel/idle/0_fallen_angels_idle_010.png',
        './img/2_character_angel/idle/0_fallen_angels_idle_011.png',
        './img/2_character_angel/idle/0_fallen_angels_idle_012.png',
        './img/2_character_angel/idle/0_fallen_angels_idle_013.png',
        './img/2_character_angel/idle/0_fallen_angels_idle_014.png',
        './img/2_character_angel/idle/0_fallen_angels_idle_015.png',
        './img/2_character_angel/idle/0_fallen_angels_idle_016.png',
        './img/2_character_angel/idle/0_fallen_angels_idle_017.png'
    ];
    IMAGES_LONG_IDLE = [
        './img/2_character_angel/idle_blinking/0_fallen_angels_idle_blinking_000.png',
        './img/2_character_angel/idle_blinking/0_fallen_angels_idle_blinking_001.png',
        './img/2_character_angel/idle_blinking/0_fallen_angels_idle_blinking_002.png',
        './img/2_character_angel/idle_blinking/0_fallen_angels_idle_blinking_003.png',
        './img/2_character_angel/idle_blinking/0_fallen_angels_idle_blinking_004.png',
        './img/2_character_angel/idle_blinking/0_fallen_angels_idle_blinking_005.png',
        './img/2_character_angel/idle_blinking/0_fallen_angels_idle_blinking_006.png',
        './img/2_character_angel/idle_blinking/0_fallen_angels_idle_blinking_007.png',
        './img/2_character_angel/idle_blinking/0_fallen_angels_idle_blinking_008.png',
        './img/2_character_angel/idle_blinking/0_fallen_angels_idle_blinking_009.png',
        './img/2_character_angel/idle_blinking/0_fallen_angels_idle_blinking_010.png',
        './img/2_character_angel/idle_blinking/0_fallen_angels_idle_blinking_011.png',
        './img/2_character_angel/idle_blinking/0_fallen_angels_idle_blinking_012.png',
        './img/2_character_angel/idle_blinking/0_fallen_angels_idle_blinking_013.png',
        './img/2_character_angel/idle_blinking/0_fallen_angels_idle_blinking_014.png',
        './img/2_character_angel/idle_blinking/0_fallen_angels_idle_blinking_015.png',
        './img/2_character_angel/idle_blinking/0_fallen_angels_idle_blinking_016.png',
        './img/2_character_angel/idle_blinking/0_fallen_angels_idle_blinking_017.png'

    ];

    IMAGES_THROW_MAGIC = [
        './img/2_character_angel/slashing/0_fallen_angels_slashing_000.png',
        './img/2_character_angel/slashing/0_fallen_angels_slashing_001.png',
        './img/2_character_angel/slashing/0_fallen_angels_slashing_002.png',
        './img/2_character_angel/slashing/0_fallen_angels_slashing_003.png',
        './img/2_character_angel/slashing/0_fallen_angels_slashing_004.png',
        './img/2_character_angel/slashing/0_fallen_angels_slashing_005.png',
        './img/2_character_angel/slashing/0_fallen_angels_slashing_006.png',
        './img/2_character_angel/slashing/0_fallen_angels_slashing_007.png',
        './img/2_character_angel/slashing/0_fallen_angels_slashing_008.png',
        './img/2_character_angel/slashing/0_fallen_angels_slashing_009.png',
        './img/2_character_angel/slashing/0_fallen_angels_slashing_010.png',
        './img/2_character_angel/slashing/0_fallen_angels_slashing_011.png'
    ];

    constructor() {
        super().loadImage('./img/2_character_angel/walking/0_fallen_angels_walking_000.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_SHORT_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_THROW_MAGIC);
        this.applyGravity();
        this.animate();
    }

    animate() {
        let i = 0;
        clearInterval(this.intervalIds);
        setInterval(() => {

            //  this.character_walking_sound.pause();
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x && !this.isDead()) {
                this.moveRight();
                this.otherDirection = false;
                this.idleTimer = 0;
                if (!this.isAboveGround()) { // noch verbessern
                    AudioHub.playOne(AudioHub.CHARACTER_WALKING);
                }
            }
            if (this.world.keyboard.LEFT && this.x > 0 && !this.isDead()) {
                this.moveLeft();
                this.otherDirection = true;
                this.idleTimer = 0;
                AudioHub.playOne(AudioHub.CHARACTER_WALKING);
            }
            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump();
                this.idleTimer = 0;
                AudioHub.playOne(AudioHub.CHARACTER_JUMPING);
            }

            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        this.intervalIds = setInterval(() => {

            if (this.isDead()) {
                i++;

                if (i >= this.IMAGES_DEAD.length - 1) {
                    this.playAnimation(this.IMAGES_DEAD);
                } else if (i = this.IMAGES_DEAD.length) {
                    this.loadImage('./img/2_character_angel/dying/0_fallen_angels_dying_014.png'); // letztes Bild dauerhaft anzeigen und Intervall stoppen
                    clearInterval(this.intervalIds);
                    this.intervalIds = null;
                }

            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    this.playAnimation(this.IMAGES_WALKING);
                    AudioHub.playOne(AudioHub.CHARACTER_WALKING);
                }
            }

        }, 40);

        setInterval(() => {
             if (this.isDead()){
                this.characterIsDead();
             }
            }, 1000 / 60);



        setInterval(() => {
            if (!this.isAboveGround() && !this.isDead()) {
                this.idleTimer += 100;
                if (this.idleTimer >= 10000) {
                    this.playAnimation(this.IMAGES_LONG_IDLE);
                    setTimeout(() => {
                        // AudioHub.playIdle(AudioHub.CHARACTER_IDLE);
                    }, 1000);



                } else if (this.idleTimer >= 1000) {
                    this.playAnimation(this.IMAGES_SHORT_IDLE);
                }
            }
        }, 100);
    }


    characterIsDead() {
        this.speed = 0;
        this.speedY = 0;
        this.world.keyboard.SPACE = false;
        AudioHub.stopOne(AudioHub.CHARACTER_JUMPING);
    }

    jump() {
        this.speedY = 30;
    }

    littleJump() {
        this.speedY = 20;
        this.y = 240;

    }
}