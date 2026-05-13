/**
 * Main endboss enemy with multiple attack and animation states.
 * @extends MovableObject
 */
class Endboss extends MovableObject {

    /** @type {number} Boss height */
    height = 536;

    /** @type {number} Boss width */
    width = 647;

    /** @type {number} Vertical position */
    y = -50;

    /** @type {number} Health points */
    energy = 25;

    /** @type {number[]} Current index of the death animation frame.*/
    deadImageIndex = 0;

    /** @type {{top:number,bottom:number,left:number,right:number}} Collision offsets */
    offset = {
        top: 180,
        bottom: 60,
        left: 200,
        right: 140
    };

    /** @type {number[]} Active interval IDs */
    intervalIds = [];

    /** @type {string[]} Walking animation image paths */
    IMAGES_WALKING = [
        './img/4_enemie_boss_troll/walk/troll_02_1_walk_000.png',
        './img/4_enemie_boss_troll/walk/troll_02_1_walk_001.png',
        './img/4_enemie_boss_troll/walk/troll_02_1_walk_002.png',
        './img/4_enemie_boss_troll/walk/troll_02_1_walk_003.png',
        './img/4_enemie_boss_troll/walk/troll_02_1_walk_004.png',
        './img/4_enemie_boss_troll/walk/troll_02_1_walk_005.png',
        './img/4_enemie_boss_troll/walk/troll_02_1_walk_006.png',
        './img/4_enemie_boss_troll/walk/troll_02_1_walk_007.png',
        './img/4_enemie_boss_troll/walk/troll_02_1_walk_008.png',
        './img/4_enemie_boss_troll/walk/troll_02_1_walk_009.png'
    ];

    /** @type {string[]} Jump animation image paths */
    IMAGES_JUMP = [
        './img/4_enemie_boss_troll/jump/troll_02_1_jump_000.png',
        './img/4_enemie_boss_troll/jump/troll_02_1_jump_001.png',
        './img/4_enemie_boss_troll/jump/troll_02_1_jump_002.png',
        './img/4_enemie_boss_troll/jump/troll_02_1_jump_003.png',
        './img/4_enemie_boss_troll/jump/troll_02_1_jump_004.png',
        './img/4_enemie_boss_troll/jump/troll_02_1_jump_005.png',
        './img/4_enemie_boss_troll/jump/troll_02_1_jump_006.png',
        './img/4_enemie_boss_troll/jump/troll_02_1_jump_007.png',
        './img/4_enemie_boss_troll/jump/troll_02_1_jump_008.png',
        './img/4_enemie_boss_troll/jump/troll_02_1_jump_009.png'
    ];

    /** @type {string[]} Idle animation image paths */
    IMAGES_IDLE = [
        './img/4_enemie_boss_troll/idle/troll_02_1_idle_000.png',
        './img/4_enemie_boss_troll/idle/troll_02_1_idle_001.png',
        './img/4_enemie_boss_troll/idle/troll_02_1_idle_002.png',
        './img/4_enemie_boss_troll/idle/troll_02_1_idle_003.png',
        './img/4_enemie_boss_troll/idle/troll_02_1_idle_004.png',
        './img/4_enemie_boss_troll/idle/troll_02_1_idle_005.png',
        './img/4_enemie_boss_troll/idle/troll_02_1_idle_006.png',
        './img/4_enemie_boss_troll/idle/troll_02_1_idle_007.png',
        './img/4_enemie_boss_troll/idle/troll_02_1_idle_008.png',
        './img/4_enemie_boss_troll/idle/troll_02_1_idle_009.png'
    ];

    /** @type {string[]} Death animation image paths */
    IMAGES_DEAD = [
        './img/4_enemie_boss_troll/dying/troll_02_1_die_000.png',
        './img/4_enemie_boss_troll/dying/troll_02_1_die_001.png',
        './img/4_enemie_boss_troll/dying/troll_02_1_die_002.png',
        './img/4_enemie_boss_troll/dying/troll_02_1_die_003.png',
        './img/4_enemie_boss_troll/dying/troll_02_1_die_004.png',
        './img/4_enemie_boss_troll/dying/troll_02_1_die_005.png',
        './img/4_enemie_boss_troll/dying/troll_02_1_die_006.png',
        './img/4_enemie_boss_troll/dying/troll_02_1_die_007.png',
        './img/4_enemie_boss_troll/dying/troll_02_1_die_008.png',
        './img/4_enemie_boss_troll/dying/troll_02_1_die_009.png'
    ];

    /** @type {string[]} Attack animation image paths */
    IMAGES_ATTACK = [
        './img/4_enemie_boss_troll/attack/troll_02_1_attack_000.png',
        './img/4_enemie_boss_troll/attack/troll_02_1_attack_001.png',
        './img/4_enemie_boss_troll/attack/troll_02_1_attack_002.png',
        './img/4_enemie_boss_troll/attack/troll_02_1_attack_003.png',
        './img/4_enemie_boss_troll/attack/troll_02_1_attack_004.png',
        './img/4_enemie_boss_troll/attack/troll_02_1_attack_005.png',
        './img/4_enemie_boss_troll/attack/troll_02_1_attack_006.png',
        './img/4_enemie_boss_troll/attack/troll_02_1_attack_007.png',
        './img/4_enemie_boss_troll/attack/troll_02_1_attack_008.png',
        './img/4_enemie_boss_troll/attack/troll_02_1_attack_009.png'
    ];

    /**
     * Creates the endboss and loads all animations.
     */
    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMP);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_ATTACK);
        this.x = 5000;
        this.otherDirection = true;
        this.animate();
    }

    /**
    * Starts boss behavior and animation loops.
    */
    /**
    * Starts the endboss animation and AI behavior loop.
    * 
    * Variables:
    * @param {number} i Counter for first-contact jump animation timing.
    */
    animate() {
        let i = 0;
        this.intervalIds.forEach(id => clearInterval(id));
        this.intervalIds = [];
        this.intervalIds.push(setInterval(() => {
            if (this.isDead()) {
                return;
            }
            this.contactCharacterEndboss(i);
            this.playBossFightSound();
            i++;
            this.endbossIdle();
        }, 200));
        this.intervalIds.push(setInterval(() => {
            this.deadAnimationLoop();
        }, 40));
    }

    /**
     * Plays the boss fight music when the character
     * reaches the boss area.
     * 
     * The sound starts once the character's x-position
     * is greater than 4400.
     */
    playBossFightSound() {
        if (world.character.x > 4400) {
            AudioHub.playOne(AudioHub.BOSS_FIGHT);
        }
    }

    /**
    * Handles the endboss behavior after the character
    * enters the boss area.
    * 
    * @param {number} i Counter used for timing the
    * first-contact jump animation.
    */
    contactCharacterEndboss(i) {
        if (i < 16 && this.firstContact && world.character.x > 4400) {
            this.jumpFirstContact(i);
        } else if (this.firstContact) {
            this.animationAttack();
        }
        if (world.character.x > this.x + 100) {
            this.playAnimation(this.IMAGES_WALKING);
        }
        if (world.character.x > 4600 && !this.firstContact) {
            i = 0;
            this.firstContact = true;
        }
    }

    /**
    * Plays the endboss idle animation when
    * the character is dead and inside the boss area.
    */
    endbossIdle() {
        if (world.character.x > 4400 && world.character.isDead()) {
            this.animationCharacterDeadIdle();
        }
    }
    /**
     * Plays jump animation during first contact.
     * @param {number} i Animation counter
     */
    jumpFirstContact(i) {
        this.playAnimation(this.IMAGES_JUMP);
        this.x = this.x - 20;
        this.speed = 0.5;
    }

    /**
     * Plays movement animation after first contact.
     */
    animationFirstContact() {
        this.playAnimation(this.IMAGES_WALKING);
        this.x = world.character.x - Math.random() * 250;
        this.speed = 0.15 + Math.random() * 0.1;
    }

    /**
     * Plays aggressive attack movement animation.
     */
    animationAttack() {
        this.playAnimation(this.IMAGES_ATTACK);
        this.x = world.character.x - Math.random() * 150;
        this.speed = 0.1 + Math.random() * 0.1;
    }

    /**
     * Plays idle animation after player death.
     */
    animationCharacterDeadIdle() {
        this.playAnimation(this.IMAGES_IDLE);
        this.speed = 0;
        this.x = world.character.x + 120;
    }

    /**
     * Handles the endboss death animation sequence.
     * 
     * @param {number} deadImageIndex Current index of the
     * death animation frame.
     */
    deadAnimationLoop() {
        if (this.isDead()) {
            if (this.deadImageIndex < this.IMAGES_DEAD.length - 1) {
                this.img = this.imageCache[this.IMAGES_DEAD[this.deadImageIndex]];
                this.y = -20;
                this.deadImageIndex++;
            } else {
                this.loadImage('./img/4_enemie_boss_troll/dying/troll_02_1_die_009.png');
                this.intervalIds.forEach(id => clearInterval(id));
                this.intervalIds = [];
            }
        }
    }
}