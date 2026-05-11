class DrawableObject {

    x = 120;
    y = 280;
    height = 150;
    width = 100;
    img;
    currentImage = 0;
    imageCache = [];

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } catch(e){
            console.warn('Error loading imgage', e);
            console.log('Colul not load image,', this.img.src);
            
        }
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    showFrameHelper(ctx) {
        //Helfer 
        if (this instanceof Character || this instanceof Zombie || this instanceof Endboss || this instanceof Crusader) { //Helper nur bei Character und Chicken
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.left - this.offset.right, this.height - this.offset.top - this.offset.bottom);
            ctx.stroke();
        }
    }
}