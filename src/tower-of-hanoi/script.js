import styles from './style.css';

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
    const drawScene = function (drawAdditional) {
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
     * This class represents a disk used in the Tower of Hanoi puzzle.
      */
    class Disk {
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
            const update = function () {
                if (cancel) {
                    // we've been cancelled, don't bother animating anything else
                    otherPeg.pushDisk(disk);
                    animate = false;
                    finishedCallback();
                    return;
                }
                if (animationState === 'move-up') {
                    disk.yPos -= speed;
                    if (disk.yPos <= 50) {
                        disk.yPos = 50;
                        // finished moving up, now move across
                        animationState = 'move-across';
                    }
                } else if (animationState === 'move-across') {
                    if (disk.xPos < otherPeg.xPos) {
                        disk.xPos += speed;
                    }
                    if (disk.xPos > otherPeg.xPos) {
                        disk.xPos -= speed;
                    }
                    if ((disk.xPos > (otherPeg.xPos - speed)) && (disk.xPos < (otherPeg.xPos + speed))) {
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
                        disk.yPos += speed;
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

                drawScene(function (ctx) {
                    disk.draw(ctx);
                });

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
     * Animates the scene
     */
    const animateScene = function (update) {
        update();
        drawScene();

        if (animate) {
            window.requestAnimationFrame(animateScene.bind(null, update));
        }
    };

    /**
     * Creates a list of functions that will solve the tower when executed
     * sequentially.
     *
     * @param numDisks The number of disks the puzzle contains
     * @param sourcePeg The peg we want to move disks from
     * @param targetPeg The peg we want to move disks to
     * @param sparePeg The peg we can use to move pegs to temporarily
     * @param tasks An output list of functions
     */
    const solve = function (numDisks, sourcePeg, targetPeg, sparePeg, tasks) {
        if (numDisks >= 0) {
            solve(numDisks - 1, sourcePeg, sparePeg, targetPeg, tasks);
            tasks.push(function (callback) {
                sourcePeg.moveTopDiskTo(targetPeg, callback);
            });
            solve(numDisks - 1, sparePeg, targetPeg, sourcePeg, tasks);
        }
    };

    /**
     * Set everything up such as event handlers and the canvas
     */
    const initialize = function () {
        const canvas = document.getElementById('myCanvas');
        currentAnimationText.appendChild(document.createTextNode('Press the Go button to begin:'));
        initializePegs();

        const animateButton = document.getElementById('animateButton');
        animateButton.addEventListener('click', function () {
            animateButton.disabled = true;

            // call the algorithm to get the list of tasks
            // the tasks take a callback function that runs when it completes
            const tasks = [];
            solve(pegs[0].disks.length - 1, pegs[0], pegs[2], pegs[1], tasks);

            const callTask = function (cancelled, index) {
                if (tasks.length <= index) {
                    // we're finished now
                    window.requestAnimationFrame(drawScene);
                    animateButton.disabled = false;
                    currentAnimationText.replaceChild(document.createTextNode('All finished. Press reset to start over:'), currentAnimationText.lastChild);
                    if (cancel) {
                        cancel = false;
                    }
                    return;
                }
                const task = tasks[index];

                // run the task
                task(function () {
                    // run the next task when the current task finishes
                    callTask(cancel, index + 1);
                });
            };

            // call the next task
            callTask(cancel, 0);
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
