class State {
    constructor(mover, speed) {
        this.mover = mover;
        this.speed = speed;
    }

    get finished() {
        return false;
    }

    move(delta) {}
    next() {}
}

class MoveUpState extends State {
    move(delta) {
        this.mover.disk.yPos -= this.speed * delta;
    }

    next() {
        if (this.mover.disk.yPos <= 50) {
            this.mover.disk.yPos = 50;
            return new MoveAcrossState(this.mover, this.speed);
        } else {
            return this;
        }
    }
}

class MoveAcrossState extends State {
    move(delta) {
        if (this.mover.disk.xPos < this.mover.toPeg.xPos) {
            this.mover.disk.xPos += this.speed * delta;
            if (this.mover.disk.xPos > this.mover.toPeg.xPos) {
                this.mover.disk.xPos = this.mover.toPeg.xPos;
            }
        }
        else if (this.mover.disk.xPos > this.mover.toPeg.xPos) {
            this.mover.disk.xPos -= this.speed * delta;
            if (this.mover.disk.xPos < this.mover.toPeg.xPos) {
                this.mover.disk.xPos = this.mover.toPeg.xPos;
            }
        }
    }

    next() {
        if (this.mover.disk.xPos === this.mover.toPeg.xPos) {
            return new MoveDownState(this.mover, this.speed);
        } else {
            return this;
        }
    }
}

class MoveDownState extends State {
    constructor(mover, speed) {
        super(mover, speed);
        if (this.mover.toPeg.disks.length > 0) {
            this.yPosTarget = this.mover.toPeg.disks[this.mover.toPeg.disks.length - 1].yPos - 20;
        } else {
            this.yPosTarget = 230;
        }
    }

    move(delta) {
        if (this.mover.disk.yPos < this.yPosTarget) {
            this.mover.disk.yPos += this.speed * delta;
            if (this.mover.disk.yPos >= this.yPosTarget) {
                this.mover.disk.yPos = this.yPosTarget;
            }
        }
    }

    next() {
        if (this.mover.disk.yPos === this.yPosTarget) {
            return new FinishedState(this.mover, this.speed);
        } else {
            return this;
        }
    }
}

export class FinishedState {
    get finished() {
        return true;
    }

    move(delta) {}
    next() {
        return this;
    }
}

export const InitialState = MoveUpState;
