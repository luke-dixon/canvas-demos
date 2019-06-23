import 'regenerator-runtime/runtime';
import {Disk} from './disk.js';
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

    /**
     * This class represents a peg used in the Tower of Hanoi puzzle.
     */
    class Peg {
        constructor(name, xPosInitial, yPosInitial, disks) {
            this.name = name;
            this.xPos = xPosInitial;
            this.yPos = yPosInitial;
            this.disks = disks;
            this.width = 40;
            this.height = 130;
        }

        moveTopDiskTo(otherPeg, finishedCallback) {
            const disk = this.disks.pop();
            if (!cancel) {
                currentAnimationText.replaceChild(document.createTextNode('Moving ' + disk.color + ' disk from ' + this.name + ' to ' + otherPeg.name), currentAnimationText.lastChild);
            }

            let animationState = 'move-up';
            animate = true;
            let lastFrame = null;
            const update = function (timestamp) {
                let delta = 0;
                const movementSpeed = speed * 5;
                if (lastFrame && timestamp) {
                    delta = (timestamp - lastFrame) / 100;
                }
                if (cancel) {
                    // we've been cancelled, don't bother animating anything else
                    otherPeg.pushDisk(disk);
                    animate = false;
                    finishedCallback();
                    return;
                }
                if (animationState === 'move-up') {
                    disk.yPos -= movementSpeed * delta;
                    if (disk.yPos <= 50) {
                        disk.yPos = 50;
                        // finished moving up, now move across
                        animationState = 'move-across';
                    }
                } else if (animationState === 'move-across') {
                    if (disk.xPos < otherPeg.xPos) {
                        disk.xPos += movementSpeed * delta;
                    }
                    if (disk.xPos > otherPeg.xPos) {
                        disk.xPos -= movementSpeed * delta;
                    }
                    if ((disk.xPos > (otherPeg.xPos - (movementSpeed * delta))) && (disk.xPos < (otherPeg.xPos + (movementSpeed * delta)))) {
                        disk.xPos = otherPeg.xPos;
                        // finished moving across, now move down
                        animationState = 'move-down';
                    }
                } else if (animationState === 'move-down') {
                    let yPosTarget = 230;
                    if (otherPeg.disks.length > 0) {
                        yPosTarget = otherPeg.disks[otherPeg.disks.length - 1].yPos - 20;
                    }
                    if (disk.yPos < yPosTarget) {
                        disk.yPos += movementSpeed * delta;
                    }
                    if (disk.yPos >= yPosTarget) {
                        // finished moving down, disk should be where it needs to be now
                        disk.yPos = yPosTarget;
                        animationState = 'finished';
                    }
                } else if (animationState === 'finished') {
                    otherPeg.pushDisk(disk);
                    animate = false;
                    finishedCallback();
                    return;
                }

                drawScene(null, function (ctx) {
                    disk.draw(ctx);
                });

                lastFrame = timestamp;
                if (animate) {
                    window.requestAnimationFrame(update);
                }
            };
            if (!cancel) {
                window.requestAnimationFrame(update);
            }
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

            this.disks.forEach(function (disk) {
                disk.draw(ctx);
            });
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

                    fromPeg.moveTopDiskTo(toPeg, function () {
                        callTask(cancel, gen.next());
                    });
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
