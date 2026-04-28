class CollectableMagic extends MovableObject {
    y = 325;
    offset = {
        top: 30,
        bottom: 30,
        left: 5,
        right: 10
    }
    IMAGES_STAFF = [
        './img/6_magic/staff/staff-001.png',
        './img/6_magic/staff/staff-002.png',
        './img/6_magic/staff/staff-003.png',
        './img/6_magic/staff/staff-004.png'

    ];
    constructor(x) {
        super().loadImage('./img/6_magic/staff/staff-001.png');
        this.loadImages(this.IMAGES_STAFF);
        this.x = x;
        this.width = 100;
        this.height = 100;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_STAFF);
        }, 500);
    }
}