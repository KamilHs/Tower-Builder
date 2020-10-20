class Block {
    constructor(x, y, w, img) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.img = img;
    }

    draw(isHooked) {
        noStroke();
        fill(255, 0, 0);
        if (isHooked)
            image(this.img, this.x, this.y, this.w, this.w + (ropeBlockImg.height - blockImg.height) * (this.w / blockImg.width));
        else
            image(this.img, this.x, this.y, this.w, this.w);
    }

    update(x, y) {
        this.x = x;
        this.y = y;
    }

    fall() {
        this.y += isMobile ? this.w / 6 : this.w / 8;
    }

    checkCollision(block) {
        return this.y + this.w >= block.y;
    }

    didAttach(block) {
        return abs(this.x - block.x) < this.w / 2;
    }

    setImage(img) {
        this.img = img;
    }
}