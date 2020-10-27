/**
 * This class represents a peg used in the Tower of Hanoi puzzle.
 */
export class Peg {
    constructor(name, xPosInitial, yPosInitial, disks) {
        this.name = name;
        this.xPos = xPosInitial;
        this.yPos = yPosInitial;
        this.disks = disks;
        this.width = 40;
        this.height = 130;
    }

    pushDisk(disk) {
        if (this.disks.length > 0) {
            disk.yPos = this.disks[this.disks.length - 1].yPos - 20;
        } else {
            disk.yPos = 230;
        }
        this.disks.push(disk);
        disk.xPos = this.xPos;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.lineCap = 'square';
        ctx.strokeStyle = 'brown';
        ctx.lineWidth = 5;
        ctx.moveTo(this.xPos, this.yPos);
        ctx.stroke();
        ctx.moveTo(this.xPos, this.yPos);
        ctx.lineTo(this.xPos - this.width, this.yPos);
        ctx.stroke();
        ctx.moveTo(this.xPos, this.yPos);
        ctx.lineTo(this.xPos + this.width, this.yPos);
        ctx.stroke();
        ctx.moveTo(this.xPos, this.yPos);
        ctx.lineTo(this.xPos, this.yPos - this.height);
        ctx.stroke();

        ctx.strokeStyle = 'black';
        ctx.lineWidth = 1;
        ctx.textAlign = 'center';
        ctx.font = '24px sans-serif';
        ctx.fillText(this.name, this.xPos, this.yPos + 35);

        this.disks.forEach((disk) => {
            disk.draw(ctx);
        });
    }
}
