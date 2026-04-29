class Coinbar extends DrawableObject {

    collectedCoins = 0;

    IMAGES_COIN_BAR = [
        './img/7_statusbars/1_statusbar/03_coinbar/coinbar-00.png',
        './img/7_statusbars/1_statusbar/03_coinbar/coinbar-01.png',
        './img/7_statusbars/1_statusbar/03_coinbar/coinbar-02.png',
        './img/7_statusbars/1_statusbar/03_coinbar/coinbar-03.png',
        './img/7_statusbars/1_statusbar/03_coinbar/coinbar-04.png',
        './img/7_statusbars/1_statusbar/03_coinbar/coinbar-05.png',
        './img/7_statusbars/1_statusbar/03_coinbar/coinbar-06.png',
        './img/7_statusbars/1_statusbar/03_coinbar/coinbar-07.png',
        './img/7_statusbars/1_statusbar/03_coinbar/coinbar-08.png',
        './img/7_statusbars/1_statusbar/03_coinbar/coinbar-09.png',
        './img/7_statusbars/1_statusbar/03_coinbar/coinbar-10.png'
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES_COIN_BAR);
        this.setNumberOfCoins(0);
        this.x = 20;
        this.y = 100;
        this.width = 170;
        this.height = 30;
    }

    setNumberOfCoins(collectedCoins) {
        this.collectedCoins = collectedCoins;
        let path = this.IMAGES_COIN_BAR[this.coinIndex()];
        this.img = this.imageCache[path];
    }

    coinIndex() {
        return this.collectedCoins;
    }
}