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
    ]
);

// }