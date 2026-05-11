/**
 * Represents a background object.
 * 
 * @extends MovableObject
 */
class BackgroundObject extends MovableObject {
    /** @type {number} */
    width = 720;
    /** @type {number} */
    height = 480;

    /**
     * Creates a background object.
     * 
     * @param {string} imagePath
     * @param {number} x
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height; //480 - 400px
    }

}