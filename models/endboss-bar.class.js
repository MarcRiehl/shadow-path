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
        super();
        this.loadImages(this.IMAGES_HEALTH_BAR);
        this.setPercentage(100);
        this.x = 440;
        this.y = 20;
        this.width = 170;
        this.height = 30;
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_HEALTH_BAR[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.percentage == 100) {
            return 10;
        } else if (this.percentage > 20) {
            return 9;
        } else if (this.percentage > 15) {
            return 7;
        } else if (this.percentage > 10) {
            return 5;
        } else if (this.percentage > 5) {
            return 3;
        } 
        else {
            return 0;
        }

    }
}