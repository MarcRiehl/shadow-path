/**
 * Collectable coin object with spinning animation.
 * @extends MovableObject
 */
class CollectableCoins extends MovableObject {

    /** @type {string[]} Coin animation image paths */
    IMAGES_COINS = [
        './img/8_coin/coin-000.png',
        './img/8_coin/coin-030.png',
        './img/8_coin/coin-060.png',
        './img/8_coin/coin-090.png',
        './img/8_coin/coin-120.png',
        './img/8_coin/coin-150.png',
        './img/8_coin/coin-180.png',
        './img/8_coin/coin-210.png',
        './img/8_coin/coin-240.png',
        './img/8_coin/coin-270.png',
        './img/8_coin/coin-300.png',
        './img/8_coin/coin-330.png',
        './img/8_coin/coin-360.png'
    ];

    /**
     * Creates a collectable coin.
     * @param {number} x Horizontal position
     * @param {number} y Vertical position
     */
    constructor(x, y) {
        super().loadImage('./img/8_coin/coin-000.png');
        this.loadImages(this.IMAGES_COINS);
        this.x = x;
        this.y = y;
        this.width = 40;
        this.height = 40;
        this.animate();
    }

    /**
     * Starts the coin spinning animation.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COINS);
        }, 300);
    }
}