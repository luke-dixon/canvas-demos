import 'regenerator-runtime/runtime';
import {Disk} from './disk';
import {Peg} from './peg';
import {solve} from './algorithm';
import {styles} from './style.css'; // eslint-disable-line no-unused-vars

window.onload = function () {
    const currentAnimationText = document.getElementById('currentAnimationText');
    let animate = false;
    let cancel = false;
    let speed = 1;
    let pegs = [];

    /**
     * Draws the scene.
     *
     * @param drawAdditional An optional function that draws anything extra
     * after we've drawn everything else
     */
    const drawScene = function (timeStamp, drawAdditional) {
        const canvas = document.getElementById('myCanvas');
        const ctx = canvas.getContext('2d');

        // Clear the scene
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Loop through the pegs and draw them
        // Each peg's draw function draws the pegs also
        pegs.forEach(function (peg) {
            ctx.save();
            peg.draw(ctx);
            ctx.restore();
        });

        if (typeof drawAdditional === 'function') {
            ctx.save();
            drawAdditional(ctx);
            ctx.restore();
        }
    };

    class MoveUpState {
        constructor(mover) {
            this.mover = mover;
            this.movementSpeed = speed * 5;
        }

        get finished() {
            return false;
        }

        move(delta) {
            this.mover.disk.yPos -= this.movementSpeed * delta;
        }

        next() {
            if (this.mover.disk.yPos <= 50) {
                this.mover.disk.yPos = 50;
                return new MoveAcrossState(this.mover);
            } else {
                return new MoveUpState(this.mover);
            }
        }
    }

    class MoveAcrossState {
        constructor(mover) {
            this.mover = mover;
            this.movementSpeed = speed * 5;
        }

        get finished() {
            return false;
        }

        move(delta) {
            if (this.mover.disk.xPos < this.mover.toPeg.xPos) {
                this.mover.disk.xPos += this.movementSpeed * delta;
                if (this.mover.disk.xPos > this.mover.toPeg.xPos) {
                    this.mover.disk.xPos = this.mover.toPeg.xPos;
                }
            }
            else if (this.mover.disk.xPos > this.mover.toPeg.xPos) {
                this.mover.disk.xPos -= this.movementSpeed * delta;
                if (this.mover.disk.xPos < this.mover.toPeg.xPos) {
                    this.mover.disk.xPos = this.mover.toPeg.xPos;
                }
            }
        }

        next() {
            if (this.mover.disk.xPos === this.mover.toPeg.xPos) {
                return new MoveDownState(this.mover);
            } else {
                return new MoveAcrossState(this.mover);
            }
        }
    }

    class MoveDownState {
        constructor(mover) {
            this.mover = mover;
            this.movementSpeed = speed * 5;
            if (this.mover.toPeg.disks.length > 0) {
                this.yPosTarget = this.mover.toPeg.disks[this.mover.toPeg.disks.length - 1].yPos - 20;
            } else {
                this.yPosTarget = 230;
            }
        }

        get finished() {
            return false;
        }

        move(delta) {
            if (this.mover.disk.yPos < this.yPosTarget) {
                this.mover.disk.yPos += this.movementSpeed * delta;
                if (this.mover.disk.yPos >= this.yPosTarget) {
                    this.mover.disk.yPos = this.yPosTarget;
                }
            }
        }

        next() {
            if (this.mover.disk.yPos === this.yPosTarget) {
                return new FinishedState(this.mover);
            } else {
                return new MoveDownState(this.mover);
            }
        }
    }

    class FinishedState {
        constructor(mover) {
            this.mover = mover;
        }

        get finished() {
            return true;
        }

        move(delta) {}
        next() {}
    }

    class DiskMover {
        constructor(fromPeg, toPeg) {
            this.fromPeg = fromPeg;
            this.toPeg = toPeg;
            this.lastFrame = null;
            this.animationState = new MoveUpState(this);
            this.disk = null;
            this.finishedCallback = null;
        }
        move(finishedCallback) {
            this.finishedCallback = finishedCallback;
            this.disk = this.fromPeg.disks.pop();
            if (!cancel) {
                currentAnimationText.replaceChild(
                    document.createTextNode('Moving ' + this.disk.color + ' disk from ' + this.fromPeg.name + ' to ' + this.toPeg.name), currentAnimationText.lastChild);
            }
            animate = true;
            if (!cancel) {
                window.requestAnimationFrame((timestamp) => this.update(timestamp));
            }
        }
        update(timestamp) {
            let delta = 0;
            const movementSpeed = speed * 5;
            if (this.lastFrame && timestamp) {
                delta = (timestamp - this.lastFrame) / 100;
            }
            if (cancel) {
                // we've been cancelled, don't bother animating anything else
                this.toPeg.pushDisk(this.disk);
                animate = false;
                this.finishedCallback();
                return;
            }

            this.animationState.move(delta);
            this.animationState = this.animationState.next();

            if (this.animationState.finished) {
                this.toPeg.pushDisk(this.disk);
                animate = false;
                this.finishedCallback();
            } else {

                drawScene(null, (ctx) => {
                    this.disk.draw(ctx);
                });

                this.lastFrame = timestamp;
                if (animate) {
                    window.requestAnimationFrame((timestamp) => this.update(timestamp));
                }
            }
        }
    }

    /**
     * Sets up the pegs and disks. Also used to reset things.
     */
    const initializePegs = function () {
        pegs = [
            new Peg('A', 100, 250, [
                new Disk(100, 230, 5, 'purple'),
                new Disk(100, 210, 4, 'blue'),
                new Disk(100, 190, 3, 'green'),
                new Disk(100, 170, 2, 'orange'),
                new Disk(100, 150, 1, 'red'),
            ]),
            new Peg('B', 300, 250, []),
            new Peg('C', 500, 250, []),
        ];
    };

    /**
     * Set everything up such as event handlers and the canvas
     */
    const initialize = function () {
        currentAnimationText.appendChild(document.createTextNode('Press the Go button to begin:'));
        initializePegs();

        const animateButton = document.getElementById('animateButton');
        animateButton.addEventListener('click', function () {
            animateButton.disabled = true;

            // call the algorithm to get the list of tasks
            // the tasks take a callback function that runs when it completes
            const tasks = [];
            const gen = solve(pegs[0].disks.length, pegs[0], pegs[2], pegs[1], tasks);

            const callTask = function (cancelled, task) {
                if (task.done) {
                    // we're finished now
                    window.requestAnimationFrame(drawScene);
                    animateButton.disabled = false;
                    currentAnimationText.replaceChild(document.createTextNode('All finished. Press reset to start over:'), currentAnimationText.lastChild);
                    if (cancel) {
                        cancel = false;
                    }
                    return;
                }
                if (task.value) {
                    const fromPeg = task.value.source;
                    const toPeg = task.value.target;

                    const diskMover = new DiskMover(fromPeg, toPeg);
                    diskMover.move(function () {
                        callTask(cancel, gen.next());
                    })
                }
            };

            // call the next task
            callTask(cancel, gen.next());
        });

        const resetButton = document.getElementById('resetButton');
        resetButton.addEventListener('click', function () {
            cancel = true;
            currentAnimationText.replaceChild(document.createTextNode('Resetting'), currentAnimationText.lastChild);
            setTimeout(function () {
                animateButton.disabled = false;

                currentAnimationText.replaceChild(document.createTextNode('Press the Go button to begin:'), currentAnimationText.lastChild);
                initializePegs();

                // draw one frame after a reset
                window.requestAnimationFrame(drawScene);
                cancel = false;
            }, 1000);
        });

        const speedSlider = document.getElementById('speedSlider');
        speedSlider.oninput = function () {
            speed = parseInt(speedSlider.value, 10);
        };
        speed = parseInt(speedSlider.value, 10);

        // draw one frame to begin with
        window.requestAnimationFrame(drawScene);
    };

    initialize();
};
