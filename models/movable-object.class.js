class MovableObject {
    x = 120;
    y = 280;
    img;
    height = 150;
    width = 100;
    imageCache = [];
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5; //Beschleunigung
    energy = 100;
    lastHit = 0;
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        return this.y < 155;
    }

    //loadImage('img/test.png')
    loadImage(path) {
        this.img = new Image(); // this.img = document.getElementById('image') <img id="image" src>
        this.img.src = path;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    showFrameHelper(ctx) {
        //Helfer 
        if (this instanceof Character || this instanceof Chicken) { //Helper nur bei Character und Chicken
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else{
            this.lastHit = new Date().getTime();
        }
    }

    isDead() {
        return this.energy == 0;
    }

    isHurt(){
     let timepassed = new Date().getTime() - this.lastHit; // Differenz in ms
     timepassed = timepassed / 1000; // Differenz in sekunden
     return timepassed < 1;
    }
    //character.isColliding(chicken)
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    // arr = 'img1.png, 'img2.png' usw.
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    moveRight() {
        this.x += this.speed;

    }

    moveLeft() {
        this.x -= this.speed;

    }

    playAnimation(images) {
        let i = this.currentImage % images.length; // Bsp. let i = 7 % 6; => 1, Rest 1 ist der Modulo-Operator
        // i = 0, 1, 2, 3, 4, 5 dann nicht 6 sondern wieder 0
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


}


