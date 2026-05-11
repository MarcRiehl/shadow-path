/**
 * Enemy zombie with walking animation.
 * @extends MovableObject
 */
class Zombie extends MovableObject {

    /** @type {number} Vertical position */
    y = 265;

    /** @type {number} Zombie height */
    height = 180;

    /** @type {number} Zombie width */
    width = 127;

    /** @type {number} Health points */
    energy = 5;

    /** @type {{top:number,bottom:number,left:number,right:number}} Collision offsets */
    offset = {
        top: 45,
        bottom: 30,
        left: 40,
        right: 40
    };

    /** @type {string[]} Walking animation image paths */
    IMAGES_WALKING = [
        './img/3_enemies/zombie_villager_1/walking/0_Zombie_Villager_Walking_000.png',
        './img/3_enemies/zombie_villager_1/walking/0_Zombie_Villager_Walking_002.png',
        './img/3_enemies/zombie_villager_1/walking/0_Zombie_Villager_Walking_004.png',
        './img/3_enemies/zombie_villager_1/walking/0_Zombie_Villager_Walking_006.png',
        './img/3_enemies/zombie_villager_1/walking/0_Zombie_Villager_Walking_008.png',
        './img/3_enemies/zombie_villager_1/walking/0_Zombie_Villager_Walking_010.png',
        './img/3_enemies/zombie_villager_1/walking/0_Zombie_Villager_Walking_012.png',
        './img/3_enemies/zombie_villager_1/walking/0_Zombie_Villager_Walking_014.png',
        './img/3_enemies/zombie_villager_1/walking/0_Zombie_Villager_Walking_016.png',
        './img/3_enemies/zombie_villager_1/walking/0_Zombie_Villager_Walking_018.png',
        './img/3_enemies/zombie_villager_1/walking/0_Zombie_Villager_Walking_020.png',
        './img/3_enemies/zombie_villager_1/walking/0_Zombie_Villager_Walking_022.png'
    ];

    /** @type {string[]} Death animation image paths */
    IMAGES_DEAD = [
        './img/3_enemies/zombie_villager_1/dying/0_Zombie_Villager_Dying_000.png',
        './img/3_enemies/zombie_villager_1/dying/0_Zombie_Villager_Dying_001.png',
        './img/3_enemies/zombie_villager_1/dying/0_Zombie_Villager_Dying_002.png',
        './img/3_enemies/zombie_villager_1/dying/0_Zombie_Villager_Dying_003.png',
        './img/3_enemies/zombie_villager_1/dying/0_Zombie_Villager_Dying_004.png',
        './img/3_enemies/zombie_villager_1/dying/0_Zombie_Villager_Dying_005.png',
        './img/3_enemies/zombie_villager_1/dying/0_Zombie_Villager_Dying_006.png',
        './img/3_enemies/zombie_villager_1/dying/0_Zombie_Villager_Dying_007.png',
        './img/3_enemies/zombie_villager_1/dying/0_Zombie_Villager_Dying_008.png',
        './img/3_enemies/zombie_villager_1/dying/0_Zombie_Villager_Dying_009.png',
        './img/3_enemies/zombie_villager_1/dying/0_Zombie_Villager_Dying_010.png',
        './img/3_enemies/zombie_villager_1/dying/0_Zombie_Villager_Dying_011.png',
        './img/3_enemies/zombie_villager_1/dying/0_Zombie_Villager_Dying_012.png',
        './img/3_enemies/zombie_villager_1/dying/0_Zombie_Villager_Dying_013.png',
        './img/3_enemies/zombie_villager_1/dying/0_Zombie_Villager_Dying_014.png'
    ];

    /**
     * Creates a zombie enemy with random position and speed.
     * @param {number} x Horizontal start position
     */
    constructor(x) {
        super().loadImage('./img/3_enemies/zombie_villager_1/walking/0_Zombie_Villager_Walking_000.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = x + Math.random() * 200;
        this.speed = 0.15 + Math.random() * 0.5;
        this.otherDirection = true;
        this.animate();
    }

    /**
     * Starts movement and walking animation.
     */
    animate() {
        // Move zombie left
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        // Play walking animation
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 300);
    }
}