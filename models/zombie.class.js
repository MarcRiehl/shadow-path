class Zombie extends MovableObject {
    y = 255;
    height = 180;
    width = 127;
    IMAGES_WALKING = [
        './img/3_enemies/zombie_villager_1/walking/0_Zombie_Villager_Walking_000.png',
        './img/3_enemies/zombie_villager_1/walking/0_Zombie_Villager_Walking_001.png',
        './img/3_enemies/zombie_villager_1/walking/0_Zombie_Villager_Walking_002.png',
        './img/3_enemies/zombie_villager_1/walking/0_Zombie_Villager_Walking_003.png',
    ];


    constructor() {
        super().loadImage('./img/3_enemies/zombie_villager_1/walking/0_Zombie_Villager_Walking_000.png');
        this.loadImages(this.IMAGES_WALKING);


        this.x = 200 + Math.random() * 500; // Zahl zwische 200 und 700 x
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