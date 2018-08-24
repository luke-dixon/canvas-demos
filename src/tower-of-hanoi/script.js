window.onload = function () {
    const currentAnimationText = document.getElementById('currentAnimationText');
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
        }

        moveTopDiskTo(otherPeg) {
            const disk = this.disks.pop();
            currentAnimationText.replaceChild(document.createTextNode('Moving ' + disk.color + ' from ' + this.name + ' to ' + otherPeg.name), currentAnimationText.lastChild);
            otherPeg.pushDisk(disk);
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
            ctx.lineTo(this.xPos - 40, this.yPos);
            ctx.stroke();
            ctx.moveTo(this.xPos, this.yPos);
            ctx.lineTo(this.xPos + 40, this.yPos);
            ctx.stroke();
            ctx.moveTo(this.xPos, this.yPos);
            ctx.lineTo(this.xPos, this.yPos - 130);
            ctx.stroke();

            this.disks.forEach(function (disk) {
                disk.draw(ctx);
            });
        }
    }

    let pegs = [];

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
     * Draws the scene.
     */
    const draw = function () {
        const canvas = document.getElementById('myCanvas');
        const ctx = canvas.getContext('2d');

        // Clear the scene
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Loop through the pegs and draw them
        // Each peg's draw function draws the pegs also
        pegs.forEach(function (peg) {
            peg.draw(ctx);
        });
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
                setTimeout(function () {
                    sourcePeg.moveTopDiskTo(targetPeg);
                    callback();
                }, 500);
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
        canvas.height = 300;
        canvas.width = 600;
        initializePegs();

        const animateButton = document.getElementById('animateButton');
        animateButton.addEventListener('click', function () {
            animateButton.disabled = true;

            // call the algorithm to get the list of tasks
            // the tasks take a callback function that runs when it completes
            const tasks = [];
            solve(pegs[0].disks.length - 1, pegs[0], pegs[2], pegs[1], tasks);

            const callTask = function (index) {
                if (tasks.length <= index) {
                    // we're finished now
                    window.requestAnimationFrame(draw);
                    animateButton.disabled = false;
                    currentAnimationText.replaceChild(document.createTextNode('All finished. Press reset to start over:'), currentAnimationText.lastChild);
                    return;
                }
                const task = tasks[index];

                // run the task
                task(function () {
                    // run the next task when the current task finishes
                    window.requestAnimationFrame(draw);
                    callTask(index + 1);
                });
            };

            // call the next task
            callTask(0);
        });

        const resetButton = document.getElementById('resetButton');
        resetButton.addEventListener('click', function () {
            initializePegs();
            animateButton.disabled = false;

            currentAnimationText.replaceChild(document.createTextNode('Press the Go button to begin:'), currentAnimationText.lastChild);

            // draw one frame after a reset
            window.requestAnimationFrame(draw);
        });

        // draw one frame to begin with
        window.requestAnimationFrame(draw);
    };

    initialize();
};
