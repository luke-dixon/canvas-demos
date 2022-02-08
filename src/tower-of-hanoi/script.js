import 'regenerator-runtime/runtime';
import {FinishedState, InitialState} from './animationState';
import {Disk} from './disk';
import {Peg} from './peg';
import {solve} from './algorithm';
import {styles} from './style.css'; // eslint-disable-line no-unused-vars
import {drawDisk, drawPeg} from "./draw";

window.onload = function () {
    const currentAnimationText = document.getElementById('currentAnimationText');
    let animate = false;
    let cancel = false;
    let speed = 1;
    let pegs = [];
    let diskMover = null;

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
            drawPeg(ctx, peg);
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
            this.speedMultiplier = 5;
            this.fromPeg = fromPeg;
            this.toPeg = toPeg;
            this.lastFrame = null;
            this.animationState = new InitialState(this, speed * this.speedMultiplier);
            this.disk = null;
            this.finishedCallback = null;
        }

        get speed() {
            return this.animationState.speed;
        }

        set speed(value) {
            this.animationState.speed = value * this.speedMultiplier;
        }

        move(finishedCallback) {
            this.finishedCallback = finishedCallback;
            this.disk = this.fromPeg.disks.pop();
            if (!cancel) {
                currentAnimationText.replaceChild(document.createTextNode('Moving ' + this.disk.color + ' disk from ' + this.fromPeg.name + ' to ' + this.toPeg.name), currentAnimationText.lastChild);
            }
            animate = true;
            if (!cancel) {
                window.requestAnimationFrame((timestamp) => this.update(timestamp));
            }
        }

        cancel() {
            animate = false;
            this.animationState = new FinishedState(this.mover, speed * 5);
            if (this.disk) {
                this.toPeg.pushDisk(this.disk);
            }
        }

        update(timestamp) {
            let delta = 0;
            if (this.lastFrame && timestamp) {
                delta = (timestamp - this.lastFrame) / 100;
            }

            this.animationState.move(delta);
            this.animationState = this.animationState.next();

            if (this.animationState.finished) {
                this.toPeg.pushDisk(this.disk);
                animate = false;
                this.finishedCallback();
            } else {

                drawScene(null, (ctx) => {
                    drawDisk(ctx, this.disk);
                });

                this.lastFrame = timestamp;
                if (animate) {
                    window.requestAnimationFrame((ts) => this.update(ts));
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
                    currentAnimationText.replaceChild(document.createTextNode('All finished. Press reset to start over:'), currentAnimationText.lastChild);
                    if (cancel) {
                        cancel = false;
                    }
                    return;
                }
                if (task.value) {
                    const fromPeg = task.value.source;
                    const toPeg = task.value.target;

                    diskMover = new DiskMover(fromPeg, toPeg);
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
            if (diskMover) {
                diskMover.cancel();
                window.requestAnimationFrame(() => {
                    animateButton.disabled = false;

                    currentAnimationText.replaceChild(document.createTextNode('Press the Go button to begin:'), currentAnimationText.lastChild);
                    initializePegs();

                    // draw one frame after a reset
                    window.requestAnimationFrame(drawScene);
                    cancel = false;
                });
            } else {
                window.requestAnimationFrame(() => {
                    currentAnimationText.replaceChild(document.createTextNode('Press the Go button to begin:'), currentAnimationText.lastChild);
                    window.requestAnimationFrame(drawScene);
                    cancel = false;
                });
            }
        });

        const speedSlider = document.getElementById('speedSlider');
        speedSlider.oninput = function () {
            speed = parseInt(speedSlider.value, 10);
            if (diskMover) {
                diskMover.speed = speed;
            }
        };
        speed = parseInt(speedSlider.value, 10);
        if (diskMover) {
            diskMover.speed = speed;
        }

        // draw one frame to begin with
        window.requestAnimationFrame(drawScene);
    };

    initialize();
};
