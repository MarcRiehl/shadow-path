class ThrowableObject extends MovableObject {
    IMAGES_THROW = [

    ];
    constructor(x ,y) {
        super().loadImage('./img/6_magic/magic_01.png');
        this.x = x;
        this.y = y;
        this.width = 30;
        this.height = 30;
        this.throw();
    }

    throw() {
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
           this.x += 10; 
        }, 25);

    }
}