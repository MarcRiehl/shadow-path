class Cloud extends MovableObject {
    y = 20;
    width = 200;
    height = 100;

    constructor() {
        super().loadImage('./img/5_background_shadow_path/layer_clouds/cloud_shape2_1.png');
        this.x = Math.random() * 500; // Zahl zwische 200 und 700 x
        this.animate();

    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);


    }


}