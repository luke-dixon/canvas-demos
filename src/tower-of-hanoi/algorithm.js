/**
 * Yields tasks that will solve the tower when executed sequentially.
 *
 * @param numDisks The number of disks the puzzle contains
 * @param sourcePeg The peg we want to move disks from
 * @param targetPeg The peg we want to move disks to
 * @param sparePeg The peg we can use to move pegs to temporarily
 */
export const solve = function *(numDisks, sourcePeg, targetPeg, sparePeg) {
    if (numDisks > 0) {
        let gen = solve(numDisks - 1, sourcePeg, sparePeg, targetPeg);
        while (true) {
            const task = gen.next();
            if (task.value) {
                yield task.value;
            }
            if (task.done) {
                break;
            }
        }
        yield {'action': 'move',
            'source': sourcePeg,
            'target': targetPeg};
        gen = solve(numDisks - 1, sparePeg, targetPeg, sourcePeg);
        while (true) {
            const task = gen.next();
            if (task.value) {
                yield task.value;
            }
            if (task.done) {
                break;
            }
        }
    }
};
