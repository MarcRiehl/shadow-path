/** @type {Level} */
let level1;

/**
 * Initializes level 1.
 * 
 * @returns {void}
 */
function initLevel() {
    level1 = new Level(

        [
            new Zombie(300),
            new Zombie(800),
            new Zombie(2000),
            new Zombie(2400),
            new Zombie(3000),
            new Zombie(3600),
            new Crusader(3400),
            new Crusader(600),
            new Crusader(900),
            new Crusader(1300),
            new Crusader(1800),
            new Crusader(2400),
            new Crusader(2400),
            new Crusader(3200)
        ],
        [
            new Endboss()
        ],
        [
            new Cloud(0),
            new Cloud(300),
            new Cloud(400),
            new Cloud(800),
            new Cloud(1400),
            new Cloud(1600)
        ],
        [
            new BackgroundObject('./img/5_background_shadow_path/layers/s-0-c.png', -720),
            new BackgroundObject('./img/5_background_shadow_path/layers/s-1-b.png', -720),
            new BackgroundObject('./img/5_background_shadow_path/layers/s-0-a.png', -720),
            new BackgroundObject('./img/5_background_shadow_path/layers/s-1-c.png', 0),
            new BackgroundObject('./img/5_background_shadow_path/layers/s-1-b.png', 0),
            new BackgroundObject('./img/5_background_shadow_path/layers/s-1-a.png', 0),
            new BackgroundObject('./img/5_background_shadow_path/layers/s-1-c.png', 720),
            new BackgroundObject('./img/5_background_shadow_path/layers/s-1-b.png', 720),
            new BackgroundObject('./img/5_background_shadow_path/layers/s-2-a.png', 720),
            new BackgroundObject('./img/5_background_shadow_path/layers/s-1-c.png', 720 * 2),
            new BackgroundObject('./img/5_background_shadow_path/layers/s-3-b.png', 720 * 2),
            new BackgroundObject('./img/5_background_shadow_path/layers/s-3-a.png', 720 * 2),
            new BackgroundObject('./img/5_background_shadow_path/layers/s-1-c.png', 720 * 3),
            new BackgroundObject('./img/5_background_shadow_path/layers/s-4-b.png', 720 * 3),
            new BackgroundObject('./img/5_background_shadow_path/layers/s-4-a.png', 720 * 3),
            new BackgroundObject('./img/5_background_shadow_path/layers/s-1-c.png', 720 * 4),
            new BackgroundObject('./img/5_background_shadow_path/layers/s-1-b.png', 720 * 4),
            new BackgroundObject('./img/5_background_shadow_path/layers/s-5-a.png', 720 * 4),
            new BackgroundObject('./img/5_background_shadow_path/layers/s-1-c.png', 720 * 5),
            new BackgroundObject('./img/5_background_shadow_path/layers/s-1-b.png', 720 * 5),
            new BackgroundObject('./img/5_background_shadow_path/layers/s-6-a.png', 720 * 5),
            new BackgroundObject('./img/5_background_shadow_path/layers/s-7-c.png', 720 * 6),
            new BackgroundObject('./img/5_background_shadow_path/layers/s-7-b.png', 720 * 6),
            new BackgroundObject('./img/5_background_shadow_path/layers/s-7-a.png', 720 * 6),
            new BackgroundObject('./img/5_background_shadow_path/layers/s-8-c.png', 720 * 7),
            new BackgroundObject('./img/5_background_shadow_path/layers/s-8-b.png', 720 * 7),
            new BackgroundObject('./img/5_background_shadow_path/layers/s-8-a.png', 720 * 7)
        ],
        [
            ...placeCoins()

        ],
        [
            ...placeMagicStaff()
        ]
    );

/**
 * Creates and returns coin objects.
 * 
 * @returns {CollectableCoins[]}
 */
    function placeCoins() {
        let coins = [];
        for (let i = 0; i < 10; i++) {
            let x = 400 + Math.random() * 4000;
            let y = 100 + Math.random() * 200;
            coins.push(new CollectableCoins(x, y));
        }
        return coins;
    };

/**
 * Creates and returns magic staff objects.
 * 
 * @returns {CollectableMagic[]}
 */
    function placeMagicStaff() {
        let magicPoints = [];
        for (let i = 0; i < 10; i++) {
            let x = 400 + Math.random() * 3600;
            magicPoints.push(new CollectableMagic(x));
        }
        return magicPoints;
    }
}