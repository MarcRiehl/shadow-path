class Level {
    enemies;
    clouds;
    backgroundObjects;
    coins;
    magicPoints;
    level_end_x = 3250;

    constructor(enemies, clouds, backgroundObjects, coins, magicPoints){
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.magicPoints = magicPoints;

    }
}