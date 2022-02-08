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
}
