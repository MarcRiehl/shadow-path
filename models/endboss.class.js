class Endboss extends MovableObject {

        height = 536;
        width = 647;
        y = -55;
        offset = {
                top: 180,
                bottom: 60,
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
        IMAGES_IDLE = [
                './img/4_enemie_boss_troll/idle/troll_02_1_idle_000.png',
                './img/4_enemie_boss_troll/idle/troll_02_1_idle_001.png',
                './img/4_enemie_boss_troll/idle/troll_02_1_idle_002.png',
                './img/4_enemie_boss_troll/idle/troll_02_1_idle_003.png',
                './img/4_enemie_boss_troll/idle/troll_02_1_idle_004.png',
                './img/4_enemie_boss_troll/idle/troll_02_1_idle_005.png',
                './img/4_enemie_boss_troll/idle/troll_02_1_idle_006.png',
                './img/4_enemie_boss_troll/idle/troll_02_1_idle_007.png',
                './img/4_enemie_boss_troll/idle/troll_02_1_idle_008.png',
                './img/4_enemie_boss_troll/idle/troll_02_1_idle_009.png'
        ];

        constructor() {
                super().loadImage(this.IMAGES_WALKING[0]); // erstes Standbild laden Array[0]
                this.loadImages(this.IMAGES_WALKING);
                this.loadImages(this.IMAGES_JUMP);
                this.loadImages(this.IMAGES_IDLE);
                this.x = 3250;
                this.otherDirection = true;
                this.animate();

        }

        animate() {
                let i = 0;
                let currentX = 0;
                setInterval(() => {
                        if (i < 10 && this.firstContact) {
                                this.playAnimation(this.IMAGES_JUMP);
                                this.x = world.character.x - 20;
                                this.speed = 0.5;
                        } else if (this.firstContact) {
                                this.playAnimation(this.IMAGES_WALKING);
                                this.x = world.character.x - Math.random() * 100;
                                this.speed = 0.15 + Math.random() * 0.1;
                        }
                        if (this.x < 2600) {
                                // currentX = this.x;                              
                                this.playAnimation(this.IMAGES_WALKING);
                                // this.x = world.character.x;
                                // currentX = 3200 + Math.random() * 50;
                                this.x += 300; // noch verbessern
                                this.speed = 0.1 + Math.random() * 0.1;
                        }
                        i++;
                        if (world.character.x > 2600 && world.character.isDead()) {
                                this.playAnimation(this.IMAGES_IDLE);
                                this.speed = 0;
                                this.x = world.character.x + 120;
                        }
                        if (world.character.x > 3000 && !this.firstContact) {
                                i = 0;
                                this.firstContact = true;

                        }
                }, 200);
        }
} 