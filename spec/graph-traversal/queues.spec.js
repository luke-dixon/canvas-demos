/* eslint-env jasmine */
import {PriorityQueue, Queue, Stack} from '../../src/graph-traversal/queues';

describe('A Stack object', () => {
    const stack = new Stack();

    it('allows an object to be stored and retrieved.', () => {
        const obj = {};
        expect(stack.add(obj)).toBeUndefined();
        expect(stack.remove()).toBe(obj);
    });

    it('updates its length as objects are stored and retrieved.', () => {
        const obj = {};

        expect(stack.length).toBe(0);

        expect(stack.add(obj)).toBeUndefined();
        expect(stack.length).toEqual(1);

        expect(stack.remove()).toBe(obj);
        expect(stack.length).toEqual(0);

        expect(stack.add(obj)).toBeUndefined();
        expect(stack.length).toEqual(1);
        expect(stack.add(obj)).toBeUndefined();
        expect(stack.length).toEqual(2);
        expect(stack.add(obj)).toBeUndefined();
        expect(stack.length).toEqual(3);

        expect(stack.remove()).toBe(obj);
        expect(stack.length).toEqual(2);
        expect(stack.remove()).toBe(obj);
        expect(stack.length).toEqual(1);
        expect(stack.remove()).toBe(obj);
        expect(stack.length).toEqual(0);
    });

    it('stores objects and retrieves them in LIFO order.', () => {
        const a1 = {'a': 1},
            b2 = {'b': 2},
            c3 = {'c': 3};
        expect(stack.add(a1)).toBeUndefined();
        expect(stack.add(b2)).toBeUndefined();
        expect(stack.add(c3)).toBeUndefined();

        expect(stack.remove()).toBe(c3);
        expect(stack.remove()).toBe(b2);
        expect(stack.remove()).toBe(a1);
    })
});

describe('A Queue object', () => {
    const queue = new Queue();

    it('allows an object to be stored and retrieved.', () => {
        const obj = {};
        expect(queue.add(obj)).toBeUndefined();
        expect(queue.remove()).toBe(obj);
    });

    it('updates its length as objects are stored and retrieved.', () => {
        const obj = {};

        expect(queue.length).toBe(0);

        expect(queue.add(obj)).toBeUndefined();
        expect(queue.length).toEqual(1);

        expect(queue.remove()).toBe(obj);
        expect(queue.length).toEqual(0);

        expect(queue.add(obj)).toBeUndefined();
        expect(queue.length).toEqual(1);
        expect(queue.add(obj)).toBeUndefined();
        expect(queue.length).toEqual(2);
        expect(queue.add(obj)).toBeUndefined();
        expect(queue.length).toEqual(3);

        expect(queue.remove()).toBe(obj);
        expect(queue.length).toEqual(2);
        expect(queue.remove()).toBe(obj);
        expect(queue.length).toEqual(1);
        expect(queue.remove()).toBe(obj);
        expect(queue.length).toEqual(0);
    });

    it('stores objects and retrieves them in FIFO order.', () => {
        const a1 = {'a': 1},
            b2 = {'b': 2},
            c3 = {'c': 3};
        expect(queue.add(a1)).toBeUndefined();
        expect(queue.add(b2)).toBeUndefined();
        expect(queue.add(c3)).toBeUndefined();

        expect(queue.remove()).toBe(a1);
        expect(queue.remove()).toBe(b2);
        expect(queue.remove()).toBe(c3);
    })
});

describe('A Priority Queue object', () => {
    const queue = new PriorityQueue((obj1, obj2) => obj1 - obj2);

    it('allows an object to be stored and retrieved.', () => {
        const obj = {};
        expect(queue.add(obj)).toBeUndefined();
        expect(queue.remove()).toBe(obj);
    });

    it('updates its length as objects are stored and retrieved.', () => {
        const obj = {};

        expect(queue.length).toBe(0);

        expect(queue.add(obj)).toBeUndefined();
        expect(queue.length).toEqual(1);

        expect(queue.remove()).toBe(obj);
        expect(queue.length).toEqual(0);

        expect(queue.add(obj)).toBeUndefined();
        expect(queue.length).toEqual(1);
        expect(queue.add(obj)).toBeUndefined();
        expect(queue.length).toEqual(2);
        expect(queue.add(obj)).toBeUndefined();
        expect(queue.length).toEqual(3);

        expect(queue.remove()).toBe(obj);
        expect(queue.length).toEqual(2);
        expect(queue.remove()).toBe(obj);
        expect(queue.length).toEqual(1);
        expect(queue.remove()).toBe(obj);
        expect(queue.length).toEqual(0);
    });

    it('stores objects and retrieves them in priority order.', () => {
        expect(queue.add(4)).toBeUndefined();
        expect(queue.add(5)).toBeUndefined();
        expect(queue.add(3)).toBeUndefined();
        expect(queue.add(1)).toBeUndefined();
        expect(queue.add(2)).toBeUndefined();

        expect(queue.remove()).toBe(1);
        expect(queue.remove()).toBe(2);
        expect(queue.remove()).toBe(3);
        expect(queue.remove()).toBe(4);
        expect(queue.remove()).toBe(5);
    })
});
