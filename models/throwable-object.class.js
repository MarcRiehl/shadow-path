class ThrowableObject extends MovableObject {
    IMAGES_THROW_BALL = [
        './img/6_magic/magicball/magicball-01.png',
        './img/6_magic/magicball/magicball-02.png',
        './img/6_magic/magicball/magicball-03.png',
        './img/6_magic/magicball/magicball-04.png'

    ];

     IMAGES_EXPLODE_BALL = [
        './img/6_magic/magicball/magicball-05.png',
        './img/6_magic/magicball/magicball-06.png',
        './img/6_magic/magicball/magicball-07.png',
        './img/6_magic/magicball/magicball-08.png',
        './img/6_magic/magicball/magicball-09.png',

    ];
    constructor(x, y, otherDirection) {
        super().loadImage('./img/6_magic/magicball/magicball-01.png');
        this.x = x;
        this.y = y;
        this.width = 30;
        this.height = 30;
        this.loadImages(this.IMAGES_THROW_BALL);
        this.loadImages(this.IMAGES_EXPLODE_BALL);
        this.throw(otherDirection);
    }

    throw(otherDirection) {
        this.speedY = 20;
        this.applyGravity();
        this.throwInterval =  setInterval(() => {
            if (otherDirection) {
                this.x -= 10;
            } else {
                this.x += 10;
            }
        }, 25);
    }

}
