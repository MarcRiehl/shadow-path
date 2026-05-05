class ThrowableObject extends MovableObject {
    IMAGES_THROW = [

    ];
    constructor(x, y, otherDirection) {
        super().loadImage('./img/6_magic/magicball/magicball-01.png');
        this.x = x;
        this.y = y;
        this.width = 30;
        this.height = 30;
        this.throw(otherDirection);
    }

    throw(otherDirection) {
        this.speedY = 20;
        this.applyGravity();
        setInterval(() => {
            if (otherDirection) {
                this.x -= 10;
            } else {
                this.x += 10;
            }
        }, 25);
    }
}