class DrawableObject {

    x = 120;
    y = 280;
    height = 150;
    width = 100;
    img;
    currentImage = 0;
    imageCache = [];

    //loadImage('img/test.png')
    loadImage(path) {
        this.img = new Image(); // this.img = document.getElementById('image') <img id="image" src>
        this.img.src = path;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    // arr = 'img1.png, 'img2.png' usw.
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
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


}