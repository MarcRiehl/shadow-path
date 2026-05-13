/**
 * Main game world class.
 * Handles rendering, collisions, enemies, collectibles,
 * player actions, and game state management.
 */
class World {
    /**
     * Main player character.
     * @type {Character}
     */
    character = new Character();

    /**
     * Current game level.
     * @type {Level}
     */
    level = level1;

    /**
     * Game canvas element.
     * @type {HTMLCanvasElement}
     */
    canvas;

    /**
     * Canvas rendering context.
     * @type {CanvasRenderingContext2D}
     */
    ctx;

    /**
     * Keyboard input handler.
     * @type {Object}
     */
    keyboard;

    /**
     * Mobile input handler.
     * @type {Object}
     */
    mobilControl;

    /**
     * Camera X position.
     * @type {number}
     */
    camera_x = 0;

    /**
     * Player health status bar.
     * @type {Statusbar}
     */
    statusBar = new Statusbar();

    /**
     * Coin status bar.
     * @type {Coinbar}
     */
    coinBar = new Coinbar();

    /**
     * Magic points status bar.
     * @type {Magicbar}
     */
    magicBar = new Magicbar();

    /**
     * Endboss health status bar.
     * @type {EndbossBar}
     */
    endbossBar = new EndbossBar();

    /**
     * Active throwable objects.
     * @type {ThrowableObject[]}
     */
    throwableObjects = [];

    /**
     * Number of collected coins.
     * @type {number}
     */
    collectedCoins = 0;

    /**
     * Number of collected magic points.
     * @type {number}
     */
    collectedMagicPoints = 0;

    /**
     * Timestamp of the last throw action.
     * @type {number}
     */
    lastThrowTime = 0;

    /**
     * Timestamp of the last endboss hit.
     * @type {number}
     */
    lastEndbossHit = 0;

    /**
     * Timestamp of the last character hit.
     * @type {number}
     */
    lastCharacterHit = 0;

    /**
     * Timestamp of the last enemy hit.
     * @type {number}
     */
    lastEnemyHit = 0;

    /**
     * Indicates if the endboss bar is visible.
     * @type {boolean}
     */
    endbossBarVisible = false;

    /**
     * Indicates if the character is dead.
     * @type {boolean}
     */
    characterDead = false;

    /**
     * Indicates if the endboss is dead.
     * @type {boolean}
     */
    endbossDead = false;

    /**
     * Stores all active interval IDs.
     * @type {number[]}
     */
    intervalIds = [];

    /**
    * Stores the previous ground state.
    * 
    * @type {boolean}
    */
    wasAboveGround = false;

    /**
     * Creates a new game world.
     * @param {HTMLCanvasElement} canvas - Game canvas.
     * @param {Object} keyboard - Keyboard input handler.
     * @param {Object} mobilControl - Mobile input handler.
     */
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

    /**
     * Connects the character with the current world.
    */
    setWorld() {
        this.character.world = this;
    }

    /**
    * Starts the main game loop.
    */
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

    /**
    * Starts collision detection loop.
    */
    runCollisions() {
        this.intervalIds.push(setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkMagicCollisionsEndboss();
            this.checkCollisionsEndboss();
        }, 200));
    }

    /**
    * Checks if the player can throw a magic projectile.
    * @local
    * @type {number}
     * now - Current timestamp in milliseconds.
    */
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

    /**
    * Throws a magic projectile to the right.
    * @local
    * @type {ThrowableObject}
    * magicBall - Created magic projectile.
    */
    checkThrowObjectsRight() {
        let magicBall = new ThrowableObject(this.character.x + 120, this.character.y + 100, this.character.otherDirection);
        this.throwableObjects.push(magicBall);
        magicBall.playAnimation(magicBall.IMAGES_THROW_BALL);
        AudioHub.playOne(AudioHub.THROW_FIREBALL);
    }

    /**
    * Throws a magic projectile to the left.
    * @local
    * @type {ThrowableObject}
    * magicBall - Created magic projectile.
    */
    checkThrowObjectsLeft() {
        let magicBall = new ThrowableObject(this.character.x - 0, this.character.y + 100, this.character.otherDirection);
        this.throwableObjects.push(magicBall);
        magicBall.playAnimation(magicBall.IMAGES_THROW_BALL);
        AudioHub.playOne(AudioHub.THROW_FIREBALL);
    }

    /**
    * Checks collisions between the character and enemies.
    * 
    * @local
    * @type {number}
    * now - Current timestamp in milliseconds.
    * 
    * @local
    * @type {Enemy}
    * enemy - Current enemy being checked.
    */
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

    /**
    * Checks if the character jumps on an enemy.
    * 
    * @local
    * @type {Enemy}
    * enemy - Current enemy being checked.
    * 
    * @local
    * @type {number}
    * index - Current enemy index.
    * 
    * @local
    * @type {number}
    * enemyHeadY - Y position of the enemy head.
    * 
    * @local
    * @type {number}
    * characterFootY - Y position of the character feet.
    * 
    * @local
    * @type {boolean}
    * isAboveHead - Indicates if the character is above the enemy.
    */
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

    /**
    * Checks collisions between magic projectiles and enemies.
    * 
    * @local
    * @type {ThrowableObject}
    * magic - Current magic projectile.
    * 
    * @local
    * @type {Enemy}
    * enemy - Current enemy being checked.
    * 
    * @local
    * @type {number}
    * index - Current enemy index.
    */
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

    /**
    * Handles magic projectile explosion effects.
    * 
    * @param {ThrowableObject} magic - Exploding magic projectile.
    */
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

    /**
    * Checks collisions between magic projectiles and the endboss.
    * 
    * @local
    * @type {number}
    * now - Current timestamp in milliseconds.
    * 
    * @local
    * @type {ThrowableObject}
    * magic - Current magic projectile.
    * 
    * @local
    * @type {Enemy}
    * enemy - Current endboss being checked.
    * 
    * @local
    * @type {number}
    * index - Current endboss index.
    */
    checkMagicCollisionsEndboss() {
        let now = Date.now();

        this.throwableObjects.forEach((magic, magicIndex) => {
            this.level.endboss.forEach((enemy, enemyIndex) => {
                this.handleMagicEndbossCollision(
                    magic,
                    magicIndex,
                    enemy,
                    enemyIndex,
                    now
                );
            });
        });
    }

    /**
     * Handles collision between magic projectile and endboss.
     * 
     * @param {Object} magic - Magic projectile.
     * @param {number} magicIndex - Index of magic projectile.
     * @param {Object} enemy - Endboss enemy.
     * @param {number} enemyIndex - Index of endboss.
     * @param {number} now - Current timestamp.
     */
    handleMagicEndbossCollision(magic, magicIndex, enemy, enemyIndex, now) {
        if (now - this.lastEndbossHit < 1000) {
            return;
        }
        if (enemy.isColliding(magic)) {
            this.lastEndbossHit = now;
            enemy.hit(5);
            this.magicCollisionsEnbossHit(magic);
            setTimeout(() => {
                magic.isDeleted = true;
                this.throwableObjects.splice(magicIndex, 1);
            }, 200);
            this.endbossBar.setPercentage(enemy.energy);
        }
        if (enemy.isDead()) {
            this.checkEndbossIsDead(enemyIndex);
        }
    }

    /**
    * Handles magic hits on the endboss.
    * 
    * @param {ThrowableObject} magic - Exploding magic projectile.
    */
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

    /**
    * Checks collisions between the character and the endboss.
    * 
    * @local
    * @type {number}
    * now - Current timestamp in milliseconds.
    * 
    * @local
    * @type {Enemy}
    * enemy - Current endboss being checked.
    */
    checkCollisionsEndboss() {
        let now = Date.now();
        this.level.endboss.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !enemy.isDead() && !this.character.isAboveGround() && !this.character.isHurt() && (now - this.lastCharacterHit > 1000)) {
                this.lastCharacterHit = now;
                this.character.hit(5);
                this.character.isHurt();
                this.statusBar.setPercentage(this.character.energy);
                AudioHub.playOne(AudioHub.HIT_CHARACTER);
            }
        });
    }

    /**
    * Collects coins on collision with the character.
    * 
    * @local
    * @type {Coin}
    * coin - Current coin being checked.
    * 
    * @local
    * @type {number}
    * index - Current coin index.
    */
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

    /**
    * Collects magic points on collision with the character.
    * 
    * @local
    * @type {MagicObject}
    * magic - Current magic object being checked.
    * 
    * @local
    * @type {number}
    * index - Current magic object index.
    */
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

    /**
    * Checks if the character is near the endboss.
    */
    checkEndbossIsNear() {
        if (this.character.x > 3600) {
            this.endbossBarVisible = true;
        }
    }

    /**
    * Plays enemy death animation
    * and removes the enemy.
    * 
    * @param {Enemy} enemy - Defeated enemy.
    * 
    * @local
    * @type {number}
    * deadAnimation - Interval for death animation.
    * 
    * @local
    * @type {number}
    * i - Enemy index in the array.
    */
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

    /**
    * Checks if the character is dead
    * and starts the game over screen.
    */
    checkCharacterIsDead() {
        if (this.character.isDead()) {
            this.characterDead = true;
            setTimeout(() => {
                endScreenLost();
                this.resetAll();
            }, 2000);
        }
    }

    /**
    * Checks if the endboss is dead
    * and starts the win screen.
    * 
    * @param {number} index - Endboss index.
    */
    checkEndbossIsDead(index) {
        this.endbossDead = true;
        setTimeout(() => {
            this.level.endboss.splice(index, 1);
            endScreenWin();
            this.resetAll();
        }, 1000);
    }

    /**
    * Clears all active intervals.
    * 
    * @local
    * @type {number}
    * id - Current interval ID.
    */
    clearAllIntervals() {
        this.intervalIds.forEach(id => clearInterval(id));
        this.intervalIds = [];
    }

    /**
    * Resets the complete game state.
    */
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

    /**
    * Draws all game objects on the canvas.
    * 
    * @local
    * @type {World}
    * self - Reference to the current world instance.
    */
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

    /**
    * Adds multiple objects to the map.
    * 
    * @param {Array} objects - Objects to render.
    * 
    * @local
    * @type {MovableObject}
    * o - Current object being rendered.
    */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            if (!o.isDeleted) {
                this.addToMap(o);
            }
        });
    }

    /**
    * Draws a single object on the map.
    * 
    * @param {MovableObject} mo - Object to render.
    */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
    * Flips an object horizontally.
    * 
    * @param {MovableObject} mo - Object to flip.
    */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
    * Restores the original object direction.
    * 
    * @param {MovableObject} mo - Object to restore.
    */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}