class Crusader extends MovableObject {
    y = 290;
    height = 140;
    width = 105;
    energy = 10;
    offset = {
        top: 40,
        bottom: 30,
        left: 30,
        right: 30
    }
    IMAGES_WALKING = [
        './img/3_enemies/skeleton_crusader_3/walking/0_skeleton_crusader_walking_000.png',
        './img/3_enemies/skeleton_crusader_3/walking/0_skeleton_crusader_walking_002.png',
        './img/3_enemies/skeleton_crusader_3/walking/0_skeleton_crusader_walking_004.png',
        './img/3_enemies/skeleton_crusader_3/walking/0_skeleton_crusader_walking_006.png',
        './img/3_enemies/skeleton_crusader_3/walking/0_skeleton_crusader_walking_008.png',
        './img/3_enemies/skeleton_crusader_3/walking/0_skeleton_crusader_walking_010.png',
        './img/3_enemies/skeleton_crusader_3/walking/0_skeleton_crusader_walking_012.png',
        './img/3_enemies/skeleton_crusader_3/walking/0_skeleton_crusader_walking_013.png',
        './img/3_enemies/skeleton_crusader_3/walking/0_skeleton_crusader_walking_014.png',
        './img/3_enemies/skeleton_crusader_3/walking/0_skeleton_crusader_walking_016.png',
        './img/3_enemies/skeleton_crusader_3/walking/0_skeleton_crusader_walking_018.png',
        './img/3_enemies/skeleton_crusader_3/walking/0_skeleton_crusader_walking_020.png',
        './img/3_enemies/skeleton_crusader_3/walking/0_skeleton_crusader_walking_022.png'

    ];


    constructor(x) {
        super().loadImage('./img/3_enemies/skeleton_crusader_3/walking/0_skeleton_crusader_walking_000.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = x + Math.random() * 200; // x = new Zombie(x) + Math
        this.speed = 0.15 + Math.random() * 0.5;
        this.otherDirection = true;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);


        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 300);
    }

}