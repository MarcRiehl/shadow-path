/**
 * Base class for all drawable game objects.
 */
class DrawableObject {

    /** @type {number} Horizontal position */
    x = 120;

    /** @type {number} Vertical position */
    y = 280;

    /** @type {number} Object height */
    height = 150;

    /** @type {number} Object width */
    width = 100;

    /** @type {HTMLImageElement} Current image */
    img;

    /** @type {number} Current animation frame index */
    currentImage = 0;

    /** @type {Object.<string, HTMLImageElement>} Cached images */
    imageCache = [];

    /**
     * Loads a single image.
     * @param {string} path Image path
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Draws the object on the canvas.
     * @param {CanvasRenderingContext2D} ctx Canvas context
     */
    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);

        } catch (e) {
            console.warn('Error loading image', e);
            console.log('Could not load image:', this.img.src);
        }
    }

    /**
     * Loads multiple images into cache.
     * @param {string[]} arr Array of image paths
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Draws collision frame helper for debugging.
     * @param {CanvasRenderingContext2D} ctx Canvas context
     */
    showFrameHelper(ctx) {
        if (this instanceof Character
            || this instanceof Zombie
            || this instanceof Endboss
            || this instanceof Crusader) {

            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'blue';

            ctx.rect(
                this.x + this.offset.left,
                this.y + this.offset.top,
                this.width - this.offset.left - this.offset.right,
                this.height - this.offset.top - this.offset.bottom
            );
            ctx.stroke();
        }
    }
}