class Hook {
    constructor(x, y, l) {
        this.x = x;
        this.y = y;
        this.l = l;
        this.a = 0;
        this.w = Math.PI / 72;
        this.createNewBlock();
    }

    update() {
        if (this.isBlockFreed)
            this.block.fall();
        else {
            this.a += this.w;
            if (abs(this.a) >= PI * 0.4)
                this.w *= -1;
            this.block.update(this.x + sin(this.a) * this.l - blockSize / 2, this.y + cos(this.a) * this.l);
        }
    }

    draw() {
        stroke(0);
        strokeWeight(4)
        line(this.x, this.y, this.x + sin(this.a) * this.l, this.y + cos(this.a) * this.l);
        this.block.draw(!this.isBlockFreed);
    }

    free() {
        this.isBlockFreed = true;
        this.block.setImage(blockImg);
    }
    isFreed() {
        return this.isBlockFreed;
    }

    createNewBlock() {
        this.block = new Block(this.x, this.y, blockSize, ropeBlockImg);
        this.isBlockFreed = false;
    }

    speedUp() {
        this.w *= 1.02;
    }
}