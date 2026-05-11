/**
 * Status bar displaying collected magic points.
 * @extends DrawableObject
 */
class Magicbar extends DrawableObject {

    /** @type {number} Amount of collected magic points */
    collectedMagicPoints = 0;

    /** @type {string[]} Magic bar image paths */
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

    /**
     * Creates the magic status bar.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_MAGIC_BAR);
        this.setNumberOfMagic(0);
        this.x = 20;
        this.y = 60;
        this.width = 170;
        this.height = 30;
    }

    /**
     * Updates the displayed magic amount.
     * @param {number} collectedMagicPoints Current magic amount
     */
    setNumberOfMagic(collectedMagicPoints) {
        this.collectedMagicPoints = collectedMagicPoints;
        let path = this.IMAGES_MAGIC_BAR[this.magicIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Returns the current magic bar image index.
     * @returns {number}
     */
    magicIndex() {
        return this.collectedMagicPoints;
    }
}