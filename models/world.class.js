class World {

    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new Statusbar();
    coinBar = new Coinbar();
    magicBar = new Magicbar();
    endbossBar = new EndbossBar();
    throwableObjects = [];
    collectedCoins = 0;
    collectedMagicPoints = 0;
    lastThrowTime = 0;
    lastEndbossHit = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.runCollisions();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.collectCoins();
            this.collectMagicPoints();
            this.checkMagicCollisions();
            this.checkJumpingOnEnemy();

        }, 1000 / 60);
    }

    runCollisions() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkMagicCollisionsEndboss();
        }, 200);
    }

    checkThrowObjects() {
        let now = Date.now();
        if (now - this.lastThrowTime < 1000) {
            return;
        }
        if (this.keyboard.KEY_D && this.collectedMagicPoints > 0) {
            this.lastThrowTime = now;
            if(this.character.otherDirection == false){
            let magicBall = new ThrowableObject(this.character.x + 120, this.character.y + 100, this.character.otherDirection); //Start Zauber
            this.throwableObjects.push(magicBall);
            }else if(this.character.otherDirection == true){
            let magicBall = new ThrowableObject(this.character.x - 0, this.character.y + 100, this.character.otherDirection); //Start Zauber
            this.throwableObjects.push(magicBall);
            }
            this.collectedMagicPoints--;
            
            this.character.playAnimation(this.character.IMAGES_THROW_MAGIC);
            this.magicBar.setNumberOfMagic(this.collectedMagicPoints);
        }
    }

    checkCollisions() {
        //Check collision
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !enemy.isDead() && !this.character.isAboveGround()) {
                // console.log('Collision with Character', enemy);
                this.character.hit();
                this.character.isHurt();
                // console.log(this.character.energy);
                this.statusBar.setPercentage(this.character.energy); // Statusbar Health
            }
        });
    }

    checkJumpingOnEnemy() {
        this.level.enemies.forEach((enemy, index) => {
            let enemyHeadY = enemy.y + enemy.height - enemy.offset.top;
            let characterFootY = this.character.y + this.character.height - this.character.offset.bottom;
            let isAboveHead = characterFootY < enemyHeadY;
            if (isAboveHead && this.character.isColliding(enemy) && !this.character.hit()) {
                enemy.hit();
                this.character.littleJump();
                if (enemy.isDead()) {
                    this.level.enemies.splice(index, 1);
                    // console.log(enemy.energy);
                }
            }
        });
    }

    checkMagicCollisions() {
        this.throwableObjects.forEach(magic => {
            this.level.enemies.forEach((enemy, index) => {
                if (enemy.isColliding(magic)) {
                    enemy.hit();
                    if (enemy.isDead()) {
                        // console.log(enemy.energy);
                        this.level.enemies.splice(index, 1);
                    }
                }
            });
        });
    }
    
    checkMagicCollisionsEndboss() {
        let now = Date.now();
        this.throwableObjects.forEach(magic => {
            this.level.endboss.forEach((enemy, index) => {
                if (now - this.lastEndbossHit < 1000) {
                    return;
                }
                if (enemy.isColliding(magic)) {
                    this.lastEndbossHit = now;
                    enemy.hit();
                    // if (enemy.isDead()) {
                    console.log(enemy.energy);
                    // }
                }
                if (enemy.energy == 0) {
                    this.level.endboss.splice(index, 1);
                }
            });
        });
    }


    collectCoins() {
        for (let i = this.level.coins.length - 1; i >= 0; i--) {
            const coin = this.level.coins[i];
            if (this.character.isColliding(coin)) {
                this.level.coins.splice(i, 1);
                this.collectedCoins++;
                this.coinBar.setNumberOfCoins(this.collectedCoins);
                // console.log(this.collectedCoins);
            }
        }
    }

    collectMagicPoints() {
        for (let i = this.level.magicPoints.length - 1; i >= 0; i--) {
            const magic = this.level.magicPoints[i];
            if (this.character.isColliding(magic)) {
                this.level.magicPoints.splice(i, 1);
                this.collectedMagicPoints++;
                this.magicBar.setNumberOfMagic(this.collectedMagicPoints);

            }
        }
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Welt löschen
        this.ctx.translate(this.camera_x, 0); //wichtig als zweiten Parameter 0 = y
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);

        this.ctx.translate(-this.camera_x, 0); //camera für Statusbar zurücksetzen
        // Space for fixed objects
        this.addToMap(this.statusBar);
        this.addToMap(this.magicBar);
        this.addToMap(this.coinBar);
        this.ctx.translate(this.camera_x, 0);  //und wieder nach vorne

        // for (let index = 0; index < this.enemies.length; index++) {
        //  this.ctx.drawImage(this.enemies[index].img, this.enemies[index].x, this.enemies[index].y, this.enemies[index].width, this.enemies[index].height);

        // }
        // this.enemies.forEach(enemy => { //alte Form
        //     this.addToMap(enemy);
        // });
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.endboss);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.magicPoints);
        this.addObjectsToMap(this.throwableObjects);

        this.ctx.translate(-this.camera_x, 0);


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
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        mo.showFrameHelper(this.ctx); //Frame Help


        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}