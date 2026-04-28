class Endboss extends MovableObject {

        height = 536;
        width = 647;
        y = -55;
        offset = {
                top: 180,
                bottom: 60 ,
                left: 200,
                right: 140 
        }

        IMAGES_WALKING = [
                './img/4_enemie_boss_troll/walk/troll_02_1_walk_000.png',
                './img/4_enemie_boss_troll/walk/troll_02_1_walk_001.png',
                './img/4_enemie_boss_troll/walk/troll_02_1_walk_002.png',
                './img/4_enemie_boss_troll/walk/troll_02_1_walk_003.png',
                './img/4_enemie_boss_troll/walk/troll_02_1_walk_004.png',
                './img/4_enemie_boss_troll/walk/troll_02_1_walk_005.png',
                './img/4_enemie_boss_troll/walk/troll_02_1_walk_006.png',
                './img/4_enemie_boss_troll/walk/troll_02_1_walk_007.png',
                './img/4_enemie_boss_troll/walk/troll_02_1_walk_008.png',
                './img/4_enemie_boss_troll/walk/troll_02_1_walk_009.png'
        ];

        IMAGES_JUMP = [
                './img/4_enemie_boss_troll/jump/troll_02_1_jump_000.png',
                './img/4_enemie_boss_troll/jump/troll_02_1_jump_001.png',
                './img/4_enemie_boss_troll/jump/troll_02_1_jump_002.png',
                './img/4_enemie_boss_troll/jump/troll_02_1_jump_003.png',
                './img/4_enemie_boss_troll/jump/troll_02_1_jump_004.png',
                './img/4_enemie_boss_troll/jump/troll_02_1_jump_005.png',
                './img/4_enemie_boss_troll/jump/troll_02_1_jump_006.png',
                './img/4_enemie_boss_troll/jump/troll_02_1_jump_007.png',
                './img/4_enemie_boss_troll/jump/troll_02_1_jump_008.png',
                './img/4_enemie_boss_troll/jump/troll_02_1_jump_009.png'

        ];

        constructor() {
                super().loadImage(this.IMAGES_WALKING[0]); // erstes Standbild laden Array[0]
                this.loadImages(this.IMAGES_WALKING);
                this.loadImages(this.IMAGES_JUMP);
                this.x = 2250;
                this.otherDirection = true;
                this.animate();

        }

        animate() {
                let i = 0;
                setInterval(() => {
                        if (i < 10 && this.firstContact) {
                                this.playAnimation(this.IMAGES_JUMP);
                        } else {
                                this.playAnimation(this.IMAGES_WALKING);
                                // this.x = world.character.x;

                        }
                        i++;
                        if (world.character.x > 2000 && !this.firstContact) {
                                i = 0;
                                this.firstContact = true;

                        }
                }, 150);
        }
} 