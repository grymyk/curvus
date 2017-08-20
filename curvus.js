'use strict';

export class Curvus {
    constructor(canvas) {
        this.ctx = canvas.getContext('2d');

        this.list = document.getElementById('list');

        this.list.addEventListener('change', curvus.uihandler);
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    uihandler(event) {
        let target = event.target;

        if (target.tagName !== 'INPUT') {
            return;
        }

        let value = +target.value;
        let type = target.getAttribute('data-type');

        this.drawPolygon(type, value);
    }
}

/*
let curvus = {};

curvus.clearCanvas = function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
};

curvus.drawPolygon = function drawPolygon(type, value) {
    curvus.clearCanvas();

    if (type) {
        if (type === 'angle') {
            console.log('angle');

            value *= Math.PI / 180;
        }

        options[type] = value;
    }

    console.log(options);

    drawLines(options);
};

curvus.uihandler = function uihandler(event) {
    let target = event.target;

    if (target.tagName !== 'INPUT') {
        return;
    }

    let value = +target.value;
    let type = target.getAttribute('data-type');

    curvus.drawPolygon(type, value);
};
*/
