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
}
