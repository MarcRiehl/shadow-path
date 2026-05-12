/**
 * Enemy skeleton crusader with walking animation.
 * @extends MovableObject
 */
class Crusader extends MovableObject {

    /** @type {number} Vertical position */
    y = 300;

    /** @type {number} Enemy height */
    height = 140;

    /** @type {number} Enemy width */
    width = 105;

    /** @type {number} Health points */
    energy = 5;

    /** @type {{top:number,bottom:number,left:number,right:number}} Collision offsets */
    offset = {
        top: 40,
        bottom: 30,
        left: 25,
        right: 25
    };

    /** @type {string[]} Walking animation image paths */
    IMAGES_WALKING = [
        './img/3_enemies/skeleton_crusader_3/walking/0_skeleton_crusader_walking_000.png',
        './img/3_enemies/skeleton_crusader_3/walking/0_skeleton_crusader_walking_002.png',
        './img/3_enemies/skeleton_crusader_3/walking/0_skeleton_crusader_walking_004.png',
        './img/3_enemies/skeleton_crusader_3/walking/0_skeleton_crusader_walking_006.png',
        './img/3_enemies/skeleton_crusader_3/walking/0_skeleton_crusader_walking_008.png',
        './img/3_enemies/skeleton_crusader_3/walking/0_skeleton_crusader_walking_010.png',
        './img/3_enemies/skeleton_crusader_3/walking/0_skeleton_crusader_walking_012.png',
        './img/3_enemies/skeleton_crusader_3/walking/0_skeleton_crusader_walking_013.png',
        './img/3_enemies/skeleton_crusader_3/walking/0_skeleton_crusader_walking_014.png',
        './img/3_enemies/skeleton_crusader_3/walking/0_skeleton_crusader_walking_016.png',
        './img/3_enemies/skeleton_crusader_3/walking/0_skeleton_crusader_walking_018.png',
        './img/3_enemies/skeleton_crusader_3/walking/0_skeleton_crusader_walking_020.png',
        './img/3_enemies/skeleton_crusader_3/walking/0_skeleton_crusader_walking_022.png'
    ];

    /** @type {string[]} Death animation image paths */
    IMAGES_DEAD = [
        './img/3_enemies/skeleton_crusader_3/dying/0_skeleton_crusader_dying_000.png',
        './img/3_enemies/skeleton_crusader_3/dying/0_skeleton_crusader_dying_001.png',
        './img/3_enemies/skeleton_crusader_3/dying/0_skeleton_crusader_dying_002.png',
        './img/3_enemies/skeleton_crusader_3/dying/0_skeleton_crusader_dying_003.png',
        './img/3_enemies/skeleton_crusader_3/dying/0_skeleton_crusader_dying_004.png',
        './img/3_enemies/skeleton_crusader_3/dying/0_skeleton_crusader_dying_005.png',
        './img/3_enemies/skeleton_crusader_3/dying/0_skeleton_crusader_dying_006.png',
        './img/3_enemies/skeleton_crusader_3/dying/0_skeleton_crusader_dying_007.png',
        './img/3_enemies/skeleton_crusader_3/dying/0_skeleton_crusader_dying_008.png',
        './img/3_enemies/skeleton_crusader_3/dying/0_skeleton_crusader_dying_009.png',
        './img/3_enemies/skeleton_crusader_3/dying/0_skeleton_crusader_dying_010.png',
        './img/3_enemies/skeleton_crusader_3/dying/0_skeleton_crusader_dying_011.png',
        './img/3_enemies/skeleton_crusader_3/dying/0_skeleton_crusader_dying_012.png',
        './img/3_enemies/skeleton_crusader_3/dying/0_skeleton_crusader_dying_013.png',
        './img/3_enemies/skeleton_crusader_3/dying/0_skeleton_crusader_dying_014.png'
    ];

    /**
     * Creates a crusader enemy with random position and speed.
     * @param {number} x Horizontal start position
     */
    constructor(x) {
        super().loadImage('./img/3_enemies/skeleton_crusader_3/walking/0_skeleton_crusader_walking_000.png');
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
        // Move enemy left
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        // Play walking animation
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 300);
    }
}