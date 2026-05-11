class Endboss extends MovableObject {

        height = 536;
        width = 647;
        y = -50;
        energy = 25;
        offset = {
                top: 180,
                bottom: 60,
                left: 200,
                right: 140
        }
        intervalIds = [];

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
        IMAGES_DEAD = [
                './img/4_enemie_boss_troll/dying/troll_02_1_die_000.png',
                './img/4_enemie_boss_troll/dying/troll_02_1_die_001.png',
                './img/4_enemie_boss_troll/dying/troll_02_1_die_002.png',
                './img/4_enemie_boss_troll/dying/troll_02_1_die_003.png',
                './img/4_enemie_boss_troll/dying/troll_02_1_die_004.png',
                './img/4_enemie_boss_troll/dying/troll_02_1_die_005.png',
                './img/4_enemie_boss_troll/dying/troll_02_1_die_006.png',
                './img/4_enemie_boss_troll/dying/troll_02_1_die_007.png',
                './img/4_enemie_boss_troll/dying/troll_02_1_die_008.png',
                './img/4_enemie_boss_troll/dying/troll_02_1_die_009.png',
        ];

        constructor() {
                super().loadImage(this.IMAGES_WALKING[0]); // erstes Standbild laden Array[0]
                this.loadImages(this.IMAGES_WALKING);
                this.loadImages(this.IMAGES_JUMP);
                this.loadImages(this.IMAGES_IDLE);
                this.loadImages(this.IMAGES_DEAD);
                this.x = 4800;
                this.otherDirection = true;
                this.animate();

        }

        animate() {

                let i = 0;
                let j = 0;
                this.intervalIds.forEach(id => clearInterval(id));
                this.intervalIds = [];

                this.intervalIds.push(setInterval(() => {
                        if (this.isDead()) {
                                return;
                        }
                        if (i < 10 && this.firstContact) {
                                this.playAnimation(this.IMAGES_JUMP);
                                this.x = world.character.x - 20;
                                this.speed = 0.5;
                        } else if (this.firstContact) {
                                this.playAnimation(this.IMAGES_WALKING);
                                this.x = world.character.x - Math.random() * 250;
                                this.speed = 0.15 + Math.random() * 0.1;
                                AudioHub.playOne(AudioHub.BOSS_FIGHT);
                        }
                        if (this.x < 4400) {
                                this.playAnimation(this.IMAGES_WALKING);
                                this.x = world.character.x - Math.random() * 150;
                                this.speed = 0.1 + Math.random() * 0.1;
                                AudioHub.stopOne(AudioHub.BOSS_FIGHT);
                        }
                        i++;
                        if (world.character.x > 4400 && world.character.isDead()) {
                                this.playAnimation(this.IMAGES_IDLE);
                                this.speed = 0;
                                this.x = world.character.x + 120;
                        }
                        if (world.character.x > 4600 && !this.firstContact) {
                                i = 0;
                                this.firstContact = true;
                                AudioHub.playOne(AudioHub.BOSS_FIGHT);
                        }

                }, 200));

                this.intervalIds.push(setInterval(() => {
                        if (this.isDead()) {   
                                if (j < this.IMAGES_DEAD.length - 1) {
                                        this.img = this.imageCache[this.IMAGES_DEAD[j]];
                                        this.y = -20;
                                         j++;
                                } else {
                                        this.loadImage('./img/4_enemie_boss_troll/dying/troll_02_1_die_009.png');
                                        this.intervalIds.forEach(id => clearInterval(id));
                                        this.intervalIds = [];
                                }
                        }

                }, 40));
        }
} 