import {Disk} from '../../src/tower-of-hanoi/disk';

describe('A disk', function () {
    const disk = new Disk(0, 0, 5, 'red');

    it('should have an x position', function () {
        expect(disk.xPos).toBe(0);
    });

    it('should have a y position', function () {
        expect(disk.yPos).toBe(0);
    });

    it('should have a width', function () {
        expect(disk.width).toBe(5);
    });

    it('should have a color', function () {
        expect(disk.color).toBe('red');
    });
});
