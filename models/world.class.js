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
    endbossBarVisible = false;
    dead = false;

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
            this.checkEndbossIsNear();
        }, 1000 / 60);
    }

    runCollisions() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkMagicCollisionsEndboss();
            this.checkCollisionsEndboss();
        }, 200);
    }

    checkThrowObjects() {
        let now = Date.now();
        if (now - this.lastThrowTime < 1000) {
            return;
        }
        if (this.keyboard.KEY_D && this.collectedMagicPoints > 0) {
            this.lastThrowTime = now;
            if (this.character.otherDirection == false) {
                let magicBall = new ThrowableObject(this.character.x + 120, this.character.y + 100, this.character.otherDirection); //Start Zauber
                this.throwableObjects.push(magicBall);
            } else if (this.character.otherDirection == true) {
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
                this.character.hit(5);
                this.character.isHurt();
                // console.log(this.character.energy);
                this.statusBar.setPercentage(this.character.energy); // Statusbar Health
            }
        });
    }

    checkJumpingOnEnemy() {
        this.level.enemies.forEach((enemy, index) => {
            if (enemy.dead) return;
            let enemyHeadY = enemy.y + enemy.height - enemy.offset.top;
            let characterFootY = this.character.y + this.character.height - this.character.offset.bottom;
            let isAboveHead = characterFootY <= enemyHeadY + 10;
            if (isAboveHead && this.character.isColliding(enemy) && !this.character.hit()) {
                enemy.hit(5);
                this.character.littleJump();
                if (enemy.isDead()) {
                    this.enemyisDead(enemy);
                }
            }
        });
    }

    checkMagicCollisions() {
        this.throwableObjects.forEach(magic => {
            this.level.enemies.forEach((enemy, index) => {
                if (enemy.isColliding(magic)) {
                    enemy.hit(5);
                    // magic.throwMagicBall();
                    if (enemy.isDead()) {
                        // console.log(enemy.energy);
                        this.enemyisDead(enemy);
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
                    enemy.hit(5);
                    // if (enemy.isDead()) {
                    // console.log(enemy.energy);
                    // }
                    this.endbossBar.setPercentage(enemy.energy);
                }
                if (enemy.energy == 0) {
                    this.level.endboss.splice(index, 1);
                }
            });
        });
    }


    checkCollisionsEndboss() {
        //Check collision
        this.level.endboss.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !enemy.isDead() && !this.character.isAboveGround()) {
                this.character.hit(5);
                this.character.isHurt();
                this.statusBar.setPercentage(this.character.energy); // Statusbar Health
            }
        });
    }

    collectCoins() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.level.coins.splice(index, 1);
                this.collectedCoins++;
                this.coinBar.setNumberOfCoins(this.collectedCoins);
                AudioHub.playOne(AudioHub.COLLECT_COIN);
            }
        });
    }

    collectMagicPoints() {
        this.level.magicPoints.forEach((magic, index) => {
            if (this.character.isColliding(magic)) {
                this.level.magicPoints.splice(index, 1);
                this.collectedMagicPoints++;
                this.magicBar.setNumberOfMagic(this.collectedMagicPoints);
                AudioHub.playOne(AudioHub.PICK_UP_STAFF);
            }
        });
    }

    checkEndbossIsNear() {
        if (this.character.x > 3000) {
            this.endbossBarVisible = true;
        } else {
            this.endbossBarVisible = false;
        }
    }

    enemyisDead(enemy) {
        enemy.dead = true;
        enemy.playAnimation(enemy.IMAGES_DEAD);
        setTimeout(() => {
            let i = this.level.enemies.indexOf(enemy);
            if (i !== -1) this.level.enemies.splice(i, 1);
        }, 100);
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
        if (this.endbossBarVisible) {
            this.addToMap(this.endbossBar);
        }
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
        // mo.showFrameHelper(this.ctx); //Frame Help


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