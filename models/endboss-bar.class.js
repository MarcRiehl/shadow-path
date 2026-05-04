class EndbossBar extends DrawableObject {

    percentage = 100;

    IMAGES_HEALTH_BAR = [
        './img/7_statusbars/2_statusbar_endboss_troll/hitbar-troll-00.png',
        './img/7_statusbars/2_statusbar_endboss_troll/hitbar-troll-01.png',
        './img/7_statusbars/2_statusbar_endboss_troll/hitbar-troll-02.png',
        './img/7_statusbars/2_statusbar_endboss_troll/hitbar-troll-03.png',
        './img/7_statusbars/2_statusbar_endboss_troll/hitbar-troll-04.png',
        './img/7_statusbars/2_statusbar_endboss_troll/hitbar-troll-05.png',
        './img/7_statusbars/2_statusbar_endboss_troll/hitbar-troll-06.png',
        './img/7_statusbars/2_statusbar_endboss_troll/hitbar-troll-07.png',
        './img/7_statusbars/2_statusbar_endboss_troll/hitbar-troll-08.png',
        './img/7_statusbars/2_statusbar_endboss_troll/hitbar-troll-09.png',
        './img/7_statusbars/2_statusbar_endboss_troll/hitbar-troll-10.png'

    ];

    constructor() {
        super(); // muss immer rein um auf das Übergeordnete Objekt zugreifen zu können
        this.loadImages(this.IMAGES_HEALTH_BAR);
        this.setPercentage(100);
        this.x = 120;
        this.y = 120;
        this.width = 170;
        this.height = 30;
    }

    //setPercentage(50) z.B. gesetzt
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_HEALTH_BAR[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.percentage == 100) {
            return 10;
        } else if (this.percentage > 90) {
            return 9;
        } else if (this.percentage > 80) {
            return 8;
        } else if (this.percentage > 70) {
            return 7;
        } else if (this.percentage > 60) {
            return 6;
        } else if (this.percentage > 50) {
            return 5;
        } else if (this.percentage > 40) {
            return 4;
        } else if (this.percentage > 30) {
            return 3;
        } else if (this.percentage > 20) {
            return 2;
        } else if (this.percentage > 10) {
            return 1;
        }
        else {
            return 0;
        }

    }
}