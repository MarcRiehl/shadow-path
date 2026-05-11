class Level {
    enemies;
    endboss;
    clouds;
    backgroundObjects;
    coins;
    magicPoints;
    level_end_x = 5040;

    constructor(enemies, endboss, clouds, backgroundObjects, coins, magicPoints){
        this.enemies = enemies;
        this.endboss = endboss;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.magicPoints = magicPoints;

    }
}