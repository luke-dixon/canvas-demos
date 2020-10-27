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

    class DiskMover {
        constructor(fromPeg, toPeg) {
            this.fromPeg = fromPeg;
            this.toPeg = toPeg;
            this.lastFrame = null;
            this.animationState = 'move-up';
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
            if (this.animationState === 'move-up') {
                this.disk.yPos -= movementSpeed * delta;
                if (this.disk.yPos <= 50) {
                    this.disk.yPos = 50;
                    // finished moving up, now move across
                    this.animationState = 'move-across';
                }
            } else if (this.animationState === 'move-across') {
                if (this.disk.xPos < this.toPeg.xPos) {
                    this.disk.xPos += movementSpeed * delta;
                }
                if (this.disk.xPos > this.toPeg.xPos) {
                    this.disk.xPos -= movementSpeed * delta;
                }
                if ((this.disk.xPos > (this.toPeg.xPos - (movementSpeed * delta))) && (this.disk.xPos < (this.toPeg.xPos + (movementSpeed * delta)))) {
                    this.disk.xPos = this.toPeg.xPos;
                    // finished moving across, now move down
                    this.animationState = 'move-down';
                }
            } else if (this.animationState === 'move-down') {
                let yPosTarget = 230;
                if (this.toPeg.disks.length > 0) {
                    yPosTarget = this.toPeg.disks[this.toPeg.disks.length - 1].yPos - 20;
                }
                if (this.disk.yPos < yPosTarget) {
                    this.disk.yPos += movementSpeed * delta;
                }
                if (this.disk.yPos >= yPosTarget) {
                    // finished moving down, disk should be where it needs to be now
                    this.disk.yPos = yPosTarget;
                    this.animationState = 'finished';
                }
            } else if (this.animationState === 'finished') {
                this.toPeg.pushDisk(this.disk);
                animate = false;
                this.finishedCallback();
                return;
            }

            drawScene(null, (ctx) => {
                this.disk.draw(ctx);
            });

            this.lastFrame = timestamp;
            if (animate) {
                window.requestAnimationFrame((timestamp) => this.update(timestamp));
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
