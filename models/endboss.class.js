class Endboss extends MovableObject {

        height = 536;
        width = 647;
        y = -55  ;

        offset = {
                top: 120,
                bottom: 30,
                left: 100,
                right: 100
        }

        IMAGES_WALKING = [
                './img/4_enemie_boss_troll/idle/troll_02_1_idle_001.png',
                './img/4_enemie_boss_troll/idle/troll_02_1_idle_002.png',
                './img/4_enemie_boss_troll/idle/troll_02_1_idle_003.png',
                './img/4_enemie_boss_troll/idle/troll_02_1_idle_004.png',
                './img/4_enemie_boss_troll/idle/troll_02_1_idle_005.png',
                './img/4_enemie_boss_troll/idle/troll_02_1_idle_006.png',
                './img/4_enemie_boss_troll/idle/troll_02_1_idle_007.png',
                './img/4_enemie_boss_troll/idle/troll_02_1_idle_008.png',
                './img/4_enemie_boss_troll/idle/troll_02_1_idle_009.png',
        ];

        constructor() {
                super().loadImage(this.IMAGES_WALKING[0]); // erstes Standbild laden Array[0]
                this.loadImages(this.IMAGES_WALKING);
                this.x = 2250;
                this.otherDirection = true;
                this.animate();

        }

        animate() {
                setInterval(() => {
                        this.playAnimation(this.IMAGES_WALKING);
                }, 300);
        }
} 