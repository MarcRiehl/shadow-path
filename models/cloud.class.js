/**
 * Decorative cloud object moving in the background.
 * @extends MovableObject
 */
class Cloud extends MovableObject {
    /** @type {number} Vertical position */
    y = 20;
    /** @type {number} Cloud width */
    width = 200;
    /** @type {number} Cloud height */
    height = 100;

    /** @type {string[]} Cloud image paths */
    IMAGES_CLOUD = [
        './img/5_background_shadow_path/layer_clouds/cloud_shape2_1.png',
        './img/5_background_shadow_path/layer_clouds/cloud_shape2_2.png'
    ];

    /**
     * Creates a cloud with random position, size, and speed.
     * @param {number} x Horizontal start position
     */
    constructor(x) {
        super().loadImage('./img/5_background_shadow_path/layer_clouds/cloud_shape2_1.png');
        this.loadImages(this.IMAGES_CLOUD);
        this.x = x + Math.random() * 500;
        this.y = Math.random() * 100;
        this.width = 200 + Math.random() * 200;
        this.speed = 0.15 + Math.random() * 0.05;
        this.animate();

    }

    /**
    * Starts cloud movement animation.
    */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }
}