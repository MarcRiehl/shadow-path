/**
 * Collectable magic staff object with animation.
 * @extends MovableObject
 */
class CollectableMagic extends MovableObject {

    /** @type {number} Vertical position */
    y = 325;

    /** @type {{top:number,bottom:number,left:number,right:number}} Collision offsets */
    offset = {
        top: 30,
        bottom: 30,
        left: 5,
        right: 10
    };

    /** @type {string[]} Staff animation image paths */
    IMAGES_STAFF = [
        './img/6_magic/staff/staff-001.png',
        './img/6_magic/staff/staff-002.png',
        './img/6_magic/staff/staff-003.png',
        './img/6_magic/staff/staff-004.png'
    ];

    /**
     * Creates a collectable magic staff.
     * @param {number} x Horizontal position
     */
    constructor(x) {
        super().loadImage('./img/6_magic/staff/staff-001.png');
        this.loadImages(this.IMAGES_STAFF);
        this.x = x;
        this.width = 100;
        this.height = 100;

        this.animate();
    }

    /**
     * Starts the staff animation.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_STAFF);
        }, 500);
    }
}