let level1;

function initLevel() {
    level1 = new Level(

        [
            new Zombie(300),
            new Zombie(800),
            new Zombie(2000),
            new Crusader(600),
        ],
        [
            new Endboss()
        ],
        [
            new Cloud(0),
            new Cloud(300),
            new Cloud(400),
            new Cloud(800)
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
        // [
        // new CollectableMagic( 200 + Math.random(), 300 + Math.random()),
        //  new CollectableMagic( 300 + Math.random(), 400 + Math.random())
        // ]
    );

    function placeCoins() {
        let coins = [];
        for (let i = 0; i < 10; i++) {
            let x = 400 + Math.random() * 2000; //noch anpassen
            let y = 100 + Math.random() * 200;
            coins.push(new CollectableCoins(x, y));
        }
        // console.log(coins);
        return coins;
    };

    //this.world.level.magicPoints.length
    function placeMagicStaff() {
        let magicPoints = [];
        for (let i = 0; i < 10; i++) {
            let x = 400 + Math.random() * 2000;
            magicPoints.push(new CollectableMagic(x));
        }
        // console.log(magicPoints);

        return magicPoints;
    }

}