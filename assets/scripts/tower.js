class Tower {
    constructor(x, y, limit) {
        this.blocks = [new Block(x - blockSize / 2, y - blockSize, blockSize, blockImg)];
        this.height = 1;
        this.limit = limit;
        this.displacment = 0;
        this.displacmentAngle = 0;
    }

    draw() {
        this.blocks.forEach(b => b.draw());
    }

    shake() {
        this.blocks.forEach(b => b.update(b.x + sin(this.displacmentAngle) * abs(this.displacment) / blockSize, b.y))
        this.displacmentAngle += PI / 64;
    }

    canShake() {
        return this.height > 4 && abs(this.displacment) > 0;
    }

    update() {
        if (this.blocks.length > this.limit)
            if (this.blocks[1].y + blockSize <= height)
                this.blocks.forEach(b => b.update(b.x, b.y + 10))
            else
                this.blocks.shift();
    }

    addBlock(block) {
        this.displacment += block.x - this.blocks[this.blocks.length - 1].x;
        block.update(block.x, this.blocks[this.blocks.length - 1].y - blockSize)
        this.blocks.push(block);
        this.height++;
    }
}