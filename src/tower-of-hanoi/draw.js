export function drawDisk(ctx, disk) {
    ctx.beginPath();
    ctx.lineCap = 'round';
    ctx.strokeStyle = disk.color;
    ctx.lineWidth = 15;
    ctx.moveTo(disk.xPos - (5 * disk.width), disk.yPos);
    ctx.lineTo(disk.xPos + (5 * disk.width), disk.yPos);
    ctx.stroke();
}

export function drawPeg(ctx, peg) {
    ctx.beginPath();
    ctx.lineCap = 'square';
    ctx.strokeStyle = 'brown';
    ctx.lineWidth = 5;
    ctx.moveTo(peg.xPos, peg.yPos);
    ctx.stroke();
    ctx.moveTo(peg.xPos, peg.yPos);
    ctx.lineTo(peg.xPos - peg.width, peg.yPos);
    ctx.stroke();
    ctx.moveTo(peg.xPos, peg.yPos);
    ctx.lineTo(peg.xPos + peg.width, peg.yPos);
    ctx.stroke();
    ctx.moveTo(peg.xPos, peg.yPos);
    ctx.lineTo(peg.xPos, peg.yPos - peg.height);
    ctx.stroke();

    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    ctx.textAlign = 'center';
    ctx.font = '24px sans-serif';
    ctx.fillText(peg.name, peg.xPos, peg.yPos + 35);

    peg.disks.forEach((disk) => {
        drawDisk(ctx, disk);
    });
}
