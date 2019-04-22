/**
 * This class represents a disk used in the Tower of Hanoi puzzle.
 */
export class Disk {
    constructor(xPosInitial, yPosInitial, width, color) {
        this.xPos = xPosInitial;
        this.yPos = yPosInitial;
        this.width = width;
        this.color = color
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.lineCap = 'round';
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 15;
        ctx.moveTo(this.xPos - (5 * this.width), this.yPos);
        ctx.lineTo(this.xPos + (5 * this.width), this.yPos);
        ctx.stroke();
    }
}
