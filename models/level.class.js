/**
 * Represents a game level with all objects and enemies.
 */
class Level {

    /** @type {Array} List of enemies */
    enemies;

    /** @type {Endboss} Level endboss */
    endboss;

    /** @type {Array} Background clouds */
    clouds;

    /** @type {Array} Background objects */
    backgroundObjects;

    /** @type {Array} Collectable coins */
    coins;

    /** @type {Array} Collectable magic items */
    magicPoints;

    /** @type {number} End position of the level */
    level_end_x = 5040;

    /**
     * Creates a new game level.
     * 
     * @param {Array} enemies List of enemies
     * @param {Endboss} endboss Level endboss
     * @param {Array} clouds Background clouds
     * @param {Array} backgroundObjects Background objects
     * @param {Array} coins Collectable coins
     * @param {Array} magicPoints Collectable magic items
     */
    constructor(enemies, endboss, clouds, backgroundObjects, coins, magicPoints) {

        this.enemies = enemies;
        this.endboss = endboss;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.magicPoints = magicPoints;
    }
}