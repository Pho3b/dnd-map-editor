import Square from "./Square.js";
export default class CanvasComponent {
    constructor() {
        this.cells = 100;
        this.canvasWidth = 4000;
        this.signalCellWidth = Math.floor(this.canvasWidth * 0.01);
        this.signalCellHeight = Math.floor(this.canvasWidth * 0.01);
        this.editedCanvasWidth = this.canvasWidth + this.signalCellWidth;
        this.counterX = 1;
        this.counterY = 1;
        this.charPosY = this.signalCellHeight / 1.7;
        this.charPosX = this.signalCellHeight / 4;
        this.canvas = this.initCanvas();
        this.ctx = this.initContext(this.canvas);
        this.squareWidth = (this.canvas.width - this.signalCellWidth) / this.cells;
        this.squareHeight = (this.canvas.width - this.signalCellHeight) / this.cells;
        this.createCellsSignals();
        this.squaresMatrix = this.createNewGrid();
    }
    static getInstance() {
        if (!CanvasComponent.instance) {
            CanvasComponent.instance = new CanvasComponent();
        }
        return CanvasComponent.instance;
    }
    initCanvas() {
        let canvas = document.getElementById('canvas');
        canvas.width = this.editedCanvasWidth;
        canvas.height = this.editedCanvasWidth;
        return canvas;
    }
    initContext(canvas) {
        let context = canvas.getContext("2d");
        if (context !== null) {
            context.lineCap = 'round';
            context.lineJoin = 'round';
            context.strokeStyle = 'black';
            context.lineWidth = 0.5;
        }
        return context;
    }
    drawCellSignal(x, y, width, height) {
        this.ctx.beginPath();
        this.ctx.rect(x, y, width, height);
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(x, y, width, height);
        this.ctx.stroke();
        this.ctx.fillStyle = "black";
        this.ctx.font = "12pt sans-serif";
        if (y === 0 && x !== 0) {
            this.ctx.fillText(this.counterX.toString(), x + (this.charPosX / 4), this.charPosY);
            this.counterX++;
        }
        else if (x === 0 && y !== 0) {
            this.ctx.fillText(this.counterY.toString(), this.charPosX + 3, y + (this.charPosX + this.charPosX));
            this.counterY++;
        }
    }
    drawSquare(x, y, width) {
        this.ctx.beginPath();
        this.ctx.rect(x, y, width, width);
        this.ctx.stroke();
        return new Square(x, y, this);
    }
    createCellsSignals() {
        for (let x = this.signalCellWidth; x <= this.editedCanvasWidth; x += this.squareWidth) {
            this.drawCellSignal(x, 0, this.squareWidth, this.signalCellHeight);
        }
        for (let y = this.signalCellHeight; y <= this.editedCanvasWidth; y += this.squareHeight) {
            this.drawCellSignal(0, y, this.signalCellWidth, this.squareHeight);
        }
    }
    createNewGrid() {
        let column;
        let res = [];
        for (let x = this.signalCellWidth; x <= this.editedCanvasWidth; x += this.squareWidth) {
            column = [];
            for (let y = this.signalCellHeight; y <= this.editedCanvasWidth; y += this.squareHeight) {
                column.push(this.drawSquare(x, y, this.squareWidth));
            }
            res.push(column);
        }
        return res;
    }
    drawPreSavedGrid(savedMatrix) {
        let len = savedMatrix.length;
        let currentSquare;
        let counter = 0;
        let savedSquare;
        if (len !== this.squaresMatrix.length) {
            console.log('Error while loading the last saved map');
            return;
        }
        for (let x = 0; x < len; x++) {
            for (let y = 0; y < len; y++) {
                // @ts-ignore
                currentSquare = this.drawSquare(savedMatrix[counter]["x"], savedMatrix[counter]["y"], this.squareWidth);
                console.log(savedMatrix[counter][y]);
                // currentSquare.level1Img = savedMatrix[counter]["level1Img"];
                // currentSquare.level1Img = savedMatrix[counter]["level1Img"];
                // currentSquare.level1Img = savedMatrix[counter]["level1Img"];
                currentSquare.drawImages();
                //console.log(currentSquare);
                this.squaresMatrix[x][y] = currentSquare;
            }
        }
    }
}
