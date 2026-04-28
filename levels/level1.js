let level1;

// function initLevel(){
level1 = new Level(

    [
        new Zombie(300),
        new Zombie(800),
        new Zombie(2000),
        new Crusader(600),
        new Endboss()
    ],
    [
        new Cloud(0),
        new Cloud(300),
        new Cloud(400),
        new Cloud(800)
    ],
    [
        new BackgroundObject('./img/5_background_shadow_path/armory_street/layer_00.png', -720),
        new BackgroundObject('./img/5_background_shadow_path/armory_street/layer_01.png', -720),
        new BackgroundObject('./img/5_background_shadow_path/armory_street/layer_02.png', -720),
        new BackgroundObject('./img/5_background_shadow_path/armory_street/layer_00.png', 0),
        new BackgroundObject('./img/5_background_shadow_path/armory_street/layer_01.png', 0),
        new BackgroundObject('./img/5_background_shadow_path/armory_street/layer_02.png', 0),
        new BackgroundObject('./img/5_background_shadow_path/armory_street/layer_00.png', 720),
        new BackgroundObject('./img/5_background_shadow_path/armory_street/layer_01.png', 720),
        new BackgroundObject('./img/5_background_shadow_path/armory_street/layer_02.png', 720),
        new BackgroundObject('./img/5_background_shadow_path/armory_street/layer_00.png', 720 * 2),
        new BackgroundObject('./img/5_background_shadow_path/armory_street/layer_01.png', 720 * 2),
        new BackgroundObject('./img/5_background_shadow_path/armory_street/layer_02.png', 720 * 2),
        new BackgroundObject('./img/5_background_shadow_path/armory_street/layer_00.png', 720 * 3),
        new BackgroundObject('./img/5_background_shadow_path/armory_street/layer_01.png', 720 * 3),
        new BackgroundObject('./img/5_background_shadow_path/armory_street/layer_02.png', 720 * 3),
        new BackgroundObject('./img/5_background_shadow_path/armory_street/layer_00.png', 720 * 4),
        new BackgroundObject('./img/5_background_shadow_path/armory_street/layer_01.png', 720 * 4),
        new BackgroundObject('./img/5_background_shadow_path/armory_street/layer_02.png', 720 * 4),
        new BackgroundObject('./img/5_background_shadow_path/armory_street/layer_00.png', 720 * 5),
        new BackgroundObject('./img/5_background_shadow_path/armory_street/layer_01.png', 720 * 5),
        new BackgroundObject('./img/5_background_shadow_path/armory_street/layer_02.png', 720 * 5)
    ],
    [
        ...placeMagicStaff(),
        ...placeCoins()
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
    return coins;
};
//this.world.level.magicPoints.length
function placeMagicStaff() {
    let magicPoints = [];
    for (let i = 0; i < 10; i++) {
        let x = 400 + Math.random() * 2000;
        magicPoints.push(new CollectableMagic(x));
    }
    console.log(magicPoints);

    return magicPoints;
}

// }