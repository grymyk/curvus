'use strict';

let ctx = null;
let canvas = null;

let options = {
    radius: 50,
    angle: Math.PI / 30,
    translateX: 100,
    translateY: 100
};

function drawLines(options) {
    ctx.beginPath();

    for (let t = 0, period = 2 * Math.PI; t < period; t += options.angle) {
        let x = options.radius * Math.cos(t) + options.translateX;
        let y = options.radius * Math.sin(t) + options.translateY;

        ctx.lineTo(x, y);
    }

    ctx.closePath();

    ctx.stroke();
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawPolygon(type, value) {
    clearCanvas();

    if (type) {
        if (type === 'angle') {
            console.log('angle');

            value *= Math.PI / 180;
        }

        options[type] = value;
    }

    console.log(options);

    drawLines(options);
}

function handler(event) {
    let target = event.target;

    if (target.tagName !== 'INPUT') {
        return;
    }

    let value = +target.value;
    let type = target.getAttribute('data-type');

    drawPolygon(type, value);
}

function draw() {
    canvas = document.getElementById('tutorial');

    if (canvas.getContext) {
        ctx = canvas.getContext('2d');

        let list = document.getElementById('list');

        list.addEventListener('change', handler);

        drawPolygon();
    }
}
