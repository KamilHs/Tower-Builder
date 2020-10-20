let canvasHeight = document.documentElement.clientHeight;
let canvasWidth = canvasHeight / 1.3;
let blockImg;
let ropeBlockImg;
let liveCount;
let heartImg;

let isMobile = false;
let isEnded = false;

let scoreDom;
let restartBtn;

if (document.documentElement.clientHeight > document.documentElement.clientWidth) {
    canvasWidth = document.documentElement.clientWidth;
    isMobile = true;
}


const hookLength = canvasWidth / 2.5;
const blockSize = hookLength / 2;

let hook;
let tower;


function setup() {
    createCanvas(canvasWidth, canvasHeight);
    background(0);
    init();
}



function draw() {
    background(0, 132, 255, 255);
    renderLives();
    if (!isEnded) {
        hook.update();
    }
    hook.draw();
    if (!isEnded) {
        tower.update();
        if (tower.canShake())
            tower.shake();
    }
    tower.draw();

    if (isEnded) return;

    if (hook.isFreed()) {
        if (hook.block.checkCollision(tower.blocks[tower.blocks.length - 1])) {
            if (hook.block.didAttach(tower.blocks[tower.blocks.length - 1])) {
                tower.addBlock(hook.block);
                updateScore();
                hook.speedUp();
            }
            else {
                if (--liveCount == 0) {
                    renderLives();
                    endGame();
                    return;
                }

            }
            hook.createNewBlock();
        }
    }

}

function mousePressed() {
    hook.free();
}


function preload() {
    blockImg = loadImage('assets/img/block.png');
    ropeBlockImg = loadImage('assets/img/block-rope.png');
    heartImg = loadImage("assets/img/heart.png");
}


function renderScore() {
    if (scoreDom) return;
    scoreDom = createSpan(tower.height);
    scoreDom.addClass("score");
    if (isMobile) {
        scoreDom.style('left', '3%');
    }
    else
        scoreDom.style('left', `${windowWidth / 2 - canvasWidth / 2 + 10}px`);
    scoreDom.style('top', "1%");
    scoreDom.style('font-size', blockSize * 0.75 + "px");
}

function updateScore() {
    scoreDom.html(tower.height)
}

function endGame() {
    isEnded = true;
    renderRestartBtn();
}

function renderRestartBtn() {
    if (restartBtn)
        restartBtn.show();
    else {
        restartBtn = createButton("Restart");
        restartBtn.addClass("restart");
        restartBtn.style("font-size", blockSize / 2);
        restartBtn.mouseClicked(restart)
    }
}


function renderLives() {
    for (let i = 1; i <= liveCount; i++)
        image(heartImg, width - i * blockSize / 2, 10, blockSize / 2, blockSize / 2);
}

function restart() {
    restartBtn.hide();
    init();
}

function init() {
    isEnded = false;
    hook = new Hook(canvasWidth / 2, 0, hookLength);
    tower = new Tower(canvasWidth / 2, canvasHeight, isMobile ? 3 : 2);
    liveCount = 3;
    renderScore();
}