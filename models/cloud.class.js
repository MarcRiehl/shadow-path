class Cloud extends MovableObject {
    y = 20;
    width = 500;
    height = 300;

    constructor() {
        super().loadImage('../img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 500; // Zahl zwische 200 und 700 x
        this.y = 20;
        this.width = 500;
        this.height = 300;
    }

}