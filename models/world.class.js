class World {
    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken()
    ];
    clouds = [
        new Cloud()
    ]
    backgroundObjects = [
        new BackgroundObject('../img/5_background/layers/1_first_layer/1.png', 0, 80)
    ];
    canvas;
    ctx;

    constructor(canvas) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height) // Welt löschen
        this.addToMap(this.character);
        // for (let index = 0; index < this.enemies.length; index++) {
        //  this.ctx.drawImage(this.enemies[index].img, this.enemies[index].x, this.enemies[index].y, this.enemies[index].width, this.enemies[index].height);

        // }
        // this.enemies.forEach(enemy => { //alte Form
        //     this.addToMap(enemy);
        // });

        this.addObjectsToMap(this.enemies);
        this.addObjectsToMap(this.clouds);
        this.addObjectsToMap(this.backgroundObjects);

        //Draw() wird immer wieder aufgerufen
        let self = this; //wichtig!!!! kennt sonst in der Funktion darunter this nicht mehr
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) { // MovableObject
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    }

}