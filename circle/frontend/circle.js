'use strict';

import './circle.css';

let ctx = null;
let canvas = null;

let options = {
    radius: 50,
    angle: Math.PI / 30,
    translateX: 100,
    translateY: 100
};

let ellipse = {
    len: 501,
    x: (t) => t,
    y: (t, coef) => {
        console.log(t);

        let shiftX = 250;
        let shiftY = 0;

        let axis = coef.minor / coef.major;
        //console.log('axis:', axis);

        let powerX = Math.pow(t - shiftX, 2);
        console.log('powerX:', powerX);

        let powerMajor = Math.pow(coef.major, 2);
        //console.log('powerMajor:', powerMajor);

        return axis * Math.sqrt(powerMajor - powerX) + shiftY;
    },
    major: 250,
    minor: 160,
    color: 'green'
};

let parabola = {
    len: 150,
    x: t => t,
    y: (t, coef) => {
        return coef.a * t * t + coef.b * t + coef.c
    },
    a: -0.01,
    b: 0,
    c: 360,
    color: 'green'
};

let eggCurve = {
    x: (point) => point,
    y: (point, coef) => {

        let major = coef.major * coef.measure;
        //console.log('major: ', major);

        let minor = coef.major * 0.7;
        //console.log('minor: ', minor);

        let A = (major - minor) - 2 * point;
        //console.log('A: ', A);

        let B = Math.pow(major - major, 2);
        let C = Math.sqrt(4 * minor * point + B);
        //console.log('C: ', C);

        let D = Math.sqrt(point / 2);
        //console.log('D: ', D);


        //console.log('cndcjdio', Math.sqrt(A + C) * D);
        return Math.sqrt(A + C) * D;
    },
    len: 210,
    major: 210,
    minor: 0,
    measure: 1,
    color: 'green'
};

function polarCurve(options) {
    for (let t = 0, period = 2 * Math.PI; t < period; t += options.angle) {
        let x = options.radius * Math.cos(t) + options.translateX;
        let y = options.radius * Math.sin(t) + options.translateY;

        ctx.lineTo(x, y);
    }
}

function cartesianCurve(options) {
    ctx.strokeStyle = options.color;

    let number = 8;
    let step = options.len / number;
    step = 20;

    for (let t = step; t < options.len; t += step) {
        //console.log('t: ', t);

        let x = options.x(t);
        //console.log('x: ', x);

	let optic = 0 & options.y(t, options) * 0.293;
	let halfStvol = 15;

        let y = options.y(t, options) - halfStvol + optic;


        console.log(x.toFixed(0), y.toFixed(0));

        // ctx.lineTo(x, y);
        ctx.fillRect(x, y, 20, 20);
    }
}

function drawLines(options) {
//    console.log('options: ', options);

    ctx.beginPath();

    // polarCurve(options);
    // cartesianCurve(parabola);
    cartesianCurve(eggCurve);

    //ctx.closePath();

    ctx.stroke();
}

function drawPolygon(type, value) {
//    console.log('type, value: ', type, value);

    clearCanvas();

    if (type) {
        if (type === 'angle') {
            console.log('angle');

            value *= Math.PI / 180;
        }

        options[type] = value;
    }

    drawLines(options);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function uihandler(event) {
    let target = event.target;

    if (target.tagName !== 'INPUT') {
        return;
    }

    let value = +target.value;
    let type = target.getAttribute('data-type');

    drawPolygon(type, value);
}

function draw() {
    canvas = document.getElementById('whatman');

    if (canvas.getContext) {
        ctx = canvas.getContext('2d');

        let list = document.getElementById('list');
        list.addEventListener('change', uihandler);
		        
        drawPolygon();
    }
}

exports.draw = draw;

































