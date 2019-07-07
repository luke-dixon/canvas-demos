export class Stack {
    constructor() {
        this.length = 0;
        this.queue = [];
    }

    remove() {
        this.length -= 1;
        return this.queue.pop();
    }

    add(elem) {
        this.queue.push(elem);
        this.length += 1;
    }
}

export class Queue {
    constructor() {
        this.length = 0;
        this.queue = [];
    }

    remove() {
        this.length -= 1;
        return this.queue.shift();
    }

    add(elem) {
        this.queue.push(elem);
        this.length += 1;
    }
}

export class PriorityQueue {
    constructor(compareFn) {
        this.compareFn = compareFn;
        this.length = 0;
        this.queue = [];
    }

    remove() {
        this.length -= 1;
        return this.queue.shift();
    }

    add(elem) {
        this.queue.push(elem);
        this.length += 1;
        this.queue.sort(this.compareFn);
    }
}
