class Magicbar extends DrawableObject {

    collectedMagicPoints = 0;

    IMAGES_MAGIC_BAR = [
        './img/7_statusbars/1_statusbar/02_magicbar/magicbar-00.png',
        './img/7_statusbars/1_statusbar/02_magicbar/magicbar-01.png',
        './img/7_statusbars/1_statusbar/02_magicbar/magicbar-02.png',
        './img/7_statusbars/1_statusbar/02_magicbar/magicbar-03.png',
        './img/7_statusbars/1_statusbar/02_magicbar/magicbar-04.png',
        './img/7_statusbars/1_statusbar/02_magicbar/magicbar-05.png',
        './img/7_statusbars/1_statusbar/02_magicbar/magicbar-06.png',
        './img/7_statusbars/1_statusbar/02_magicbar/magicbar-07.png',
        './img/7_statusbars/1_statusbar/02_magicbar/magicbar-08.png',
        './img/7_statusbars/1_statusbar/02_magicbar/magicbar-09.png',
        './img/7_statusbars/1_statusbar/02_magicbar/magicbar-10.png'
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES_MAGIC_BAR);
        this.setNumberOfMagic(0);
        this.x = 20;
        this.y = 60;
        this.width = 170;
        this.height = 30;
    }

    setNumberOfMagic(collectedMagicPoints) {
        this.collectedMagicPoints = collectedMagicPoints;
        let path = this.IMAGES_MAGIC_BAR[this.magicIndex()];
        this.img = this.imageCache[path];
    }

    magicIndex() {
        return this.collectedMagicPoints;
    }
}