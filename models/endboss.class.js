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

    /**
     * Creates the endboss and loads all animations.
     */
    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);

        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMP);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_DEAD);

        this.x = 4800;
        this.otherDirection = true;

        this.animate();
    }

    /**
     * Starts boss behavior and animation loops.
     */
    animate() {

        let i = 0;
        let j = 0;

        // Clear existing intervals
        this.intervalIds.forEach(id => clearInterval(id));
        this.intervalIds = [];

        /**
         * Main boss AI loop.
         */
        this.intervalIds.push(setInterval(() => {
            if (this.isDead()) {
                return;
            }
            if (i < 10 && this.firstContact && world.character.x > 4600) {
                this.jumpFirstContact(i);
            } else if (this.firstContact) {
                this.animationFirstContact();
            }
            if (this.x < 4400) {
                this.animationAttack();
            }
            i++;
            if (world.character.x > 4200 && world.character.isDead()) {
                this.animationCharacterDeadIdle();
            }

            if (world.character.x > 4600 && !this.firstContact) {
                i = 0;
                this.firstContact = true;
            }
            if (world.character.x > 4000) {
                AudioHub.playOne(AudioHub.BOSS_FIGHT);
            }
        }, 200));

        /**
         * Death animation loop.
         */
        this.intervalIds.push(setInterval(() => {
            if (this.isDead()) {
                if (j < this.IMAGES_DEAD.length - 1) {
                    this.img = this.imageCache[this.IMAGES_DEAD[j]];
                    this.y = -20;
                    j++;

                } else {
                    this.loadImage('./img/4_enemie_boss_troll/dying/troll_02_1_die_009.png');
                    this.intervalIds.forEach(id => clearInterval(id));
                    this.intervalIds = [];
                }
            }
        }, 40));
    }

    /**
     * Plays jump animation during first contact.
     * @param {number} i Animation counter
     */
    jumpFirstContact(i) {
        this.playAnimation(this.IMAGES_JUMP);
        this.x = world.character.x - 20;
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
        this.playAnimation(this.IMAGES_WALKING);
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
}