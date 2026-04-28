class CollectableMagic extends MovableObject {
    IMAGES_MAGIC = [

    ];
    constructor(x ,y) {
        super().loadImage('./img/6_magic/magic_01.png');
        this.x = x;
        this.y = y;
        this.width = 130;
        this.height = 130;
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_MAGIC);
        }, 300);
    }
}