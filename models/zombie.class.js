class Zombie extends MovableObject {
    y = 255;
    height = 180;
    width = 127;
    energy = 10;
        offset = {
        top: 40,
        bottom: 30,
        left: 30,
        right: 30
    }
    IMAGES_WALKING = [
        './img/3_enemies/zombie_villager_1/walking/0_Zombie_Villager_Walking_000.png',
        './img/3_enemies/zombie_villager_1/walking/0_Zombie_Villager_Walking_001.png',
        './img/3_enemies/zombie_villager_1/walking/0_Zombie_Villager_Walking_002.png',
        './img/3_enemies/zombie_villager_1/walking/0_Zombie_Villager_Walking_003.png',
    ];


    constructor(x) {
        super().loadImage('./img/3_enemies/zombie_villager_1/walking/0_Zombie_Villager_Walking_000.png');
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