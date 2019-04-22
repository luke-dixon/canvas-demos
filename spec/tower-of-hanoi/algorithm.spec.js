/* eslint-env jasmine */
import '@babel/polyfill';
import {solve} from '../../src/tower-of-hanoi/algorithm';

describe('The recursive algorithm for solving the tower of hanoi problem', function () {

    class TestPeg {
        constructor(name) {
            this.name = name;
        }

        toString() {
            return `${this.name}`;
        }
    }

    const sourcePeg = new TestPeg('source peg');
    const targetPeg = new TestPeg('target peg');
    const sparePeg = new TestPeg('spare peg');

    it('moves no disks if there are no disks', function () {
        const gen = solve(0, sourcePeg, targetPeg, sparePeg);

        const task = gen.next();
        expect(task.done).toBeTruthy();
        expect(task.value).toBeUndefined();
    });

    it('moves a disk to the target peg', function () {
        const tasks = [];
        const gen = solve(1, sourcePeg, targetPeg, sparePeg);

        let task = null;
        do {
            task = gen.next();
            if (task.value) {
                tasks.push(task.value);
            }
        } while (!task.done);

        expect(tasks.length).toBe(1);

        expect(tasks[0].action).toBe('move');
        expect(tasks[0].source).toBe(sourcePeg);
        expect(tasks[0].target).toBe(targetPeg);
    });

    it('moves a stack of two disks to the target peg, using the spare peg', function () {
        const tasks = [];
        const gen = solve(2, sourcePeg, targetPeg, sparePeg);

        let task = null;
        do {
            task = gen.next();
            if (task.value) {
                tasks.push(task.value);
            }
        } while (!task.done);

        expect(tasks.length).toBe(3);

        // first move top disk to spare peg
        expect(tasks[0].action).toBe('move');
        expect(tasks[0].source).toBe(sourcePeg);
        expect(tasks[0].target).toBe(sparePeg);

        // Then move bottom disk to target peg
        expect(tasks[1].action).toBe('move');
        expect(tasks[1].source).toBe(sourcePeg);
        expect(tasks[1].target).toBe(targetPeg);

        // Then move top disk to target peg
        expect(tasks[2].action).toBe('move');
        expect(tasks[2].source).toBe(sparePeg);
        expect(tasks[2].target).toBe(targetPeg);
    });
});
