class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    mobilControl;
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
    lastCharacterHit = 0;
    lastEnemyHit = 0;
    endbossBarVisible = false;
    characterDead = false;
    endbossDead = false;
    intervalIds = [];


    constructor(canvas, keyboard, mobilControl) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.mobilControl = mobilControl;
        this.draw();
        this.setWorld();
        this.run();
        this.runCollisions();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        this.intervalIds.push(setInterval(() => {
            this.collectCoins();
            this.collectMagicPoints();
            this.checkMagicCollisions();
            this.checkJumpingOnEnemy();
            this.checkEndbossIsNear();
            this.checkCharacterIsDead();
        }, 1000 / 60));
    }

    runCollisions() {
        this.intervalIds.push(setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkMagicCollisionsEndboss();
            this.checkCollisionsEndboss();
        }, 200));
    }

    checkThrowObjects() {
        let now = Date.now();
        if (now - this.lastThrowTime < 1000) {
            return;
        }
        if ((this.keyboard.KEY_D || this.mobilControl.KEY_D) && this.collectedMagicPoints > 0) {
            this.lastThrowTime = now;
            if (this.character.otherDirection == false) {
                this.checkThrowObjectsRight();
            } else if (this.character.otherDirection == true) {
                this.checkThrowObjectsLeft();
            }
            this.collectedMagicPoints--;
            this.character.playAnimation(this.character.IMAGES_THROW_MAGIC);
            this.magicBar.setNumberOfMagic(this.collectedMagicPoints);
        }
    }

    checkThrowObjectsRight() {
        let magicBall = new ThrowableObject(this.character.x + 120, this.character.y + 100, this.character.otherDirection);
        this.throwableObjects.push(magicBall);
        magicBall.playAnimation(magicBall.IMAGES_THROW_BALL);
        AudioHub.playOne(AudioHub.THROW_FIREBALL);
    }

    checkThrowObjectsLeft() {
        let magicBall = new ThrowableObject(this.character.x - 0, this.character.y + 100, this.character.otherDirection);
        this.throwableObjects.push(magicBall);
        magicBall.playAnimation(magicBall.IMAGES_THROW_BALL);
        AudioHub.playOne(AudioHub.THROW_FIREBALL);
    }


    checkCollisions() {
        let now = Date.now();
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !enemy.dead && !enemy.isDead() && !this.character.isHurt() && (now - this.lastEnemyHit > 300)) {
                this.lastEnemyHit = now;
                this.character.hit(5);
                this.character.isHurt();
                AudioHub.playOne(AudioHub.HIT_CHARACTER);
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    }

    checkJumpingOnEnemy() {
        this.level.enemies.forEach((enemy, index) => {
            if (enemy.dead || enemy.isDead()) return;
            let enemyHeadY = enemy.y + enemy.height - enemy.offset.top;
            let characterFootY = this.character.y + this.character.height - this.character.offset.bottom;
            let isAboveHead = characterFootY <= enemyHeadY + 10;
            if (isAboveHead && this.character.isColliding(enemy) && !this.character.isHurt()) {
                enemy.hit(5);
                this.character.littleJump();
                AudioHub.playOne(AudioHub.HIT_JUMP);
                if (enemy.isDead()) {
                    this.checkEnemyIsDead(enemy);
                }
            }
        });
    }

    checkMagicCollisions() {
        this.throwableObjects.forEach(magic => {
            this.level.enemies.forEach((enemy, index) => {
                if (enemy.isColliding(magic) && !magic.isExploded) {
                    enemy.hit(5);
                    this.magicCollisionsHit(magic);
                    setTimeout(() => {
                        magic.isDeleted = true;
                        this.throwableObjects.splice(index, 1);
                    }, 200);
                    if (enemy.isDead()) {
                        this.checkEnemyIsDead(enemy);
                    }
                    return;
                }
            });
        });
    }

    magicCollisionsHit(magic) {
        clearInterval(magic.throwInterval);
        magic.playAnimation(magic.IMAGES_EXPLODE_BALL);
        AudioHub.playOne(AudioHub.EXPLOSION);
        magic.width = 100;
        magic.height = 100;
        magic.speedY = 0;
        magic.acceleration = 0;
        magic.isExploded = true;
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
                    this.magicCollisionsEnbossHit(magic);
                    setTimeout(() => {
                        magic.isDeleted = true;
                        this.throwableObjects.splice(index, 1);
                    }, 200);
                    this.endbossBar.setPercentage(enemy.energy);
                }
                if (enemy.isDead()) {
                    this.checkEndbossIsDead(index);
                }
            });
        });
    }

    magicCollisionsEnbossHit(magic) {
        AudioHub.playOne(AudioHub.HIT_BOSS);
        clearInterval(magic.throwInterval);
        magic.playAnimation(magic.IMAGES_EXPLODE_BALL);
        magic.width = 100;
        magic.height = 100;
        magic.speedY = 0;
        magic.acceleration = 0;
        magic.isExploded = true;
    }

    checkCollisionsEndboss() {
        let now = Date.now();
        this.level.endboss.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !enemy.isDead() && !this.character.isAboveGround() && !this.character.isHurt() && (now - this.lastCharacterHit > 1000)) {
                this.lastCharacterHit = now;
                this.character.hit(5);
                this.character.isHurt();
                this.statusBar.setPercentage(this.character.energy);
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
        if (this.character.x > 4000) {
            this.endbossBarVisible = true;
        } else {
            this.endbossBarVisible = false;
        }
    }

    checkEnemyIsDead(enemy) {
        if (enemy.dead) return;
        enemy.dead = true;
        enemy.speed = 0;
        let deadAnimation = setInterval(() => {
            if (enemy.isDead()) {
                enemy.playAnimation(enemy.IMAGES_DEAD);
            }
        }, 120);
        setTimeout(() => {
            clearInterval(deadAnimation);
            let i = this.level.enemies.indexOf(enemy);
            if (i !== -1) this.level.enemies.splice(i, 1);
        }, 800);
    }

    checkCharacterIsDead() {
        if (this.character.isDead()) {
            this.characterDead = true;
            setTimeout(() => {
                endScreenLost();
                this.resetAll();
            }, 2000);

        }
    }

    checkEndbossIsDead(index) {
        this.endbossDead = true;
        setTimeout(() => {
            this.level.endboss.splice(index, 1);
            endScreenWin();
            this.resetAll();
        }, 4000);
    }

    clearAllIntervals() {
        this.intervalIds.forEach(id => clearInterval(id));
        this.intervalIds = [];
    }

    resetAll() {
        this.collectedCoins = 0;
        this.collectedMagicPoints = 0;
        this.lastThrowTime = 0;
        this.lastEndbossHit = 0;
        this.lastCharacterHit = 0;
        this.lastEnemyHit = 0;
        this.character.x = 120;
        this.character.energy = 100;
        this.characterDead = false;
        AudioHub.stopOne(AudioHub.BOSS_FIGHT);
        AudioHub.stopIdle(AudioHub.CHARACTER_IDLE);
        this.throwableObjects = [];
        this.clearAllIntervals();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);

        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.addToMap(this.magicBar);
        this.addToMap(this.coinBar);
        if (this.endbossBarVisible) {
            this.addToMap(this.endbossBar);
        }
        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.endboss);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.magicPoints);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            if (!o.isDeleted) {
                this.addToMap(o);
            }
        });
    }
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
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