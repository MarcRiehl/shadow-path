/**
 * Main playable character class.
 * Handles movement, animations, gravity, combat, and idle states.
 * @extends MovableObject
 */
class Character extends MovableObject {
    /** @type {number} Character height */
    height = 200;

    /** @type {number} Character width */
    width = 150;

    /** @type {number} Vertical position */
    y = 250;

    /** @type {number} Movement speed */
    speed = 10;

    /** @type {World} Reference to the game world */
    world;

    /** @type {number} Time without player input */
    idleTimer = 0;

    /** @type {number[]} Stores active interval IDs */
    intervalIds = [];

    /** @type {number[]} Current index of the death animation frame.*/
    deadImageIndex = 0;

    /** @type {{top:number,bottom:number,left:number,right:number}} Collision offsets */
    offset = {
        top: 40,
        bottom: 35,
        left: 55,
        right: 55
    }

    /** @type {string[]} character walking image paths */
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

    /** @type {string[]} character jumping image paths */
    IMAGES_JUMPING = [
        './img/2_character_angel/jump_loop/0_fallen_angels_jump_loop_000.png',
        './img/2_character_angel/jump_loop/0_fallen_angels_jump_loop_001.png',
        './img/2_character_angel/jump_loop/0_fallen_angels_jump_loop_002.png',
        './img/2_character_angel/jump_loop/0_fallen_angels_jump_loop_003.png',
        './img/2_character_angel/jump_loop/0_fallen_angels_jump_loop_004.png',
        './img/2_character_angel/jump_loop/0_fallen_angels_jump_loop_005.png'
    ];

    /** @type {string[]} character dying image paths */
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

    /** @type {string[]} character hurt image paths */
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

    /** @type {string[]} character idle image paths */
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

    /** @type {string[]} character long idle image paths */
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

    /** @type {string[]} character throw image paths */
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

    /**
     * Creates the character and loads all animations.
     * Also starts gravity and animation loops.
     */
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

    /**
     * Starts the main animation and control loops
     * for the character.
     * 
     * Existing intervals are cleared before
     * starting new animation loops.
     */
    animate() {
        this.intervalIds.forEach(id => clearInterval(id));
        this.intervalIds = [];
        
        /**
         * Main movement and camera update loop.
         * 
         * The interval handles:
         * - Character movement controls
         * - Camera position updates
         * 
         * Runs at 60 frames per second.
         */
        this.intervalIds.push(setInterval(() => {
            this.characterControl();
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60));

        /**
        * Animation loop for the character.
        */
        this.intervalIds.push(setInterval(() => {
            this.characterAnimations();
            this.deadAnimationLoop();
        }, 40));

        /**
         * Continuously checks if the character is dead.
         * Stops movement and actions when dead.
         */
        this.intervalIds.push(setInterval(() => {
            if (this.isDead()) {
                this.characterIsDead();
            }
        }, 1000 / 60));

        /**
         * Plays idle animations and sounds
         * when the character is inactive.
         * 
         * @local
         * @type {number}
         * idleTimer - Time without player movement.
        */
        this.intervalIds.push(setInterval(() => {
            if (!this.isAboveGround() && !this.isDead() && !this.world.characterDead) {
                this.idleTimer += 100;
                if (this.idleTimer >= 10000) {
                    this.playAnimation(this.IMAGES_LONG_IDLE);
                    setTimeout(() => {
                        if (this.checkEntry(this.world, this)) {
                            if (!this.world.characterDead && !this.world.endbossDead) {
                                AudioHub.playIdle(AudioHub.CHARACTER_IDLE);
                            }
                        }
                    }, 1000);
                } else if (this.idleTimer >= 2000) {
                    this.playAnimation(this.IMAGES_SHORT_IDLE);
                }
            }
        }, 100));
    }

    /**
     * Handles character movement and jump controls.
     * 
     */
    characterControl() {
        if ((this.world.keyboard.RIGHT || this.world.mobilControl.RIGHT) && this.x < this.world.level.level_end_x && !this.isDead()) {
            this.characterMoveRight();
        }
        if ((this.world.keyboard.LEFT || this.world.mobilControl.LEFT) && this.x > 0 && !this.isDead()) {
            this.characterMoveLeft();
        }
        if ((this.world.keyboard.SPACE || this.world.mobilControl.SPACE) && !this.isAboveGround()) {
            this.jump();
            this.idleTimer = 0;
            AudioHub.playOne(AudioHub.CHARACTER_JUMPING);
        }
    }

    /**
     * Handles the character animation states.
     * 
     */
    characterAnimations() {
        if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
        } else {
            if ((this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.mobilControl.RIGHT || this.world.mobilControl.LEFT) && !this.isAboveGround()) {
                this.playAnimation(this.IMAGES_WALKING);
                AudioHub.playOne(AudioHub.CHARACTER_WALKING);
            }
        }
    }

    /**
     * Handles the character death animation sequence.
     * 
     * @param {number} deadImageIndex Current index of the
     * death animation frame.
     */
    deadAnimationLoop() {
        if (this.isDead()) {
            if (this.deadImageIndex < this.IMAGES_DEAD.length - 1) {
                this.img = this.imageCache[this.IMAGES_DEAD[this.deadImageIndex]];
                this.deadImageIndex++;
            } else {
                this.loadImage('./img/2_character_angel/dying/0_fallen_angels_dying_014.png');
                this.intervalIds.forEach(id => clearInterval(id));
                this.intervalIds = [];
                setTimeout(() => {
                    this.world.checkCharacterIsDead();
                }, 1500);
            }
        }
    }

    /**
     * Moves the character to the right.
     * Resets idle timer and plays walking sound.
     */
    characterMoveRight() {
        this.moveRight();
        this.otherDirection = false;
        this.idleTimer = 0;
        if (!this.isAboveGround()) {
            AudioHub.playOne(AudioHub.CHARACTER_WALKING);
        }
    }

    /**
     * Moves the character to the left.
     * Resets idle timer and plays walking sound.
     */
    characterMoveLeft() {
        this.moveLeft();
        this.otherDirection = true;
        this.idleTimer = 0;
        AudioHub.playOne(AudioHub.CHARACTER_WALKING);
    }

    /**
     * Stops character movement and sounds after death.
     */
    characterIsDead() {
        this.speed = 0;
        this.speedY = 0;
        this.idleTimer = 0;
        this.world.keyboard.SPACE = false;
        AudioHub.stopOne(AudioHub.CHARACTER_JUMPING);
        AudioHub.stopIdle(AudioHub.CHARACTER_IDLE);
    }

    /**
     * Makes the character jump.
     */
    jump() {
        this.speedY = 30;
    }

    /**
     * Performs a smaller jump animation.
     */
    littleJump() {
        this.speedY = 20;
    }

    /**
    * Checks if the character can enter idle state.
    * 
    * @param {World} world - Current game world.
    * @param {Character} character - Current player character.
    * 
    * @returns {boolean} True if idle state is allowed.
    */
    checkEntry(world, character) {
        return !character.isDead() &&
            !world.characterDead &&
            !world.keyboard.RIGHT &&
            !world.keyboard.LEFT &&
            !world.keyboard.SPACE &&
            !world.mobilControl.RIGHT &&
            !world.mobilControl.LEFT &&
            !world.mobilControl.SPACE &&
            !character.isAboveGround();
    }

    /**
    * Plays landing animation and sound.
    */
    charcterIsLanding() {
        this.playAnimation(this.IMAGES_WALKING);
        AudioHub.playOne(AudioHub.CHARACTER_LAND);
    }

}