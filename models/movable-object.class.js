/**
 * Base class for all movable game objects.
 * Handles movement, gravity, collisions, and animations.
 * @extends DrawableObject
 */
class MovableObject extends DrawableObject {

    /** @type {number} Horizontal movement speed */
    speed = 0.15;

    /** @type {boolean} Direction flag for sprite flipping */
    otherDirection = false;

    /** @type {number} Vertical movement speed */
    speedY = 0;

    /** @type {number} Gravity acceleration */
    acceleration = 2.5;

    /** @type {number} Health points */
    energy = 100;

    /** @type {number} Timestamp of last hit */
    lastHit = 0;

    /** @type {boolean} Indicates first enemy contact */
    firstContact = false;

    /** @type {number} Idle timer value */
    idleTimer = 0;

    /** @type {number[]} Active interval IDs */
    intervalIds;

    /** @type {{top:number,bottom:number,left:number,right:number}} Collision offsets */
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    };

    /**
     * Applies gravity to the object.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
     * Checks if the object is above ground.
     * @returns {boolean}
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return !this.isExploded;
        } else {
            return this.y < 250;
        }
    }

    /**
     * Reduces health after taking damage.
     * @param {number} damage Damage amount
     */
    hit(damage) {
        this.energy -= damage;
        if (this.energy < 0) {
            this.energy = 0;

        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Checks if the object is dead.
     * @returns {boolean}
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * Checks if the object is currently hurt.
     * @returns {boolean}
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.5;
    }

    /**
     * Checks collision with another movable object.
     * @param {MovableObject} mo Other movable object
     * @returns {boolean}
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    /**
     * Moves the object to the right.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the object to the left.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Plays an animation sequence.
     * @param {string[]} images Animation image paths
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}