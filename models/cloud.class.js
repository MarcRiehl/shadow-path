class Cloud extends MovableObject {
    y = 20;
    width = 200;
    height = 100;

    IMAGES_CLOUD = [
        './img/5_background_shadow_path/layer_clouds/cloud_shape2_1.png',
        './img/5_background_shadow_path/layer_clouds/cloud_shape2_2.png'
    ];

    constructor(x) {
        super().loadImage('./img/5_background_shadow_path/layer_clouds/cloud_shape2_1.png');
        this.loadImages(this.IMAGES_CLOUD);
        this.x =  x +  Math.random() * 500;
        this.y = Math.random() * 100;
        this.width = 200 + Math.random() * 200;
        this.speed = 0.15 + Math.random() * 0.05;
        this.animate();

    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);


    }


}