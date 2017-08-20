'use strict';

let ctx = null;

let trochoid = {
    radius: 25,
    point: 70,
    angle: Math.PI / 15,
    translateX: 50,
    translateY: 50,
    halfPeriod: 4,
    fx: (radius, angle, point, translateX)=> {
        return radius * angle - point * Math.sin(angle) + translateX;
    },
    fy: (radius, angle, point, translateY)=> {
        return radius - point * Math.cos(angle) + translateY;
    }
};

let cycliod = {
    radius: 50,
    angle: Math.PI / 15,
    translateX: 100,
    translateY: 100,
    halfPeriod: 2,
    fx: (radius, time)=> {
        return radius * (time - Math.sin(time));
    },
    fy: (radius, time)=> {
        return radius * (1 - Math.cos(time));
    }
};

let cycloidH = {
    radius: 50,
    angle: Math.PI / 15,
    translateX: 0,
    translateY: 0,
    halfPeriod: 2,
    fx: (radius, angle, translateX)=> {
        return radius * angle + translateX;
    },
    fy: (radius, angle, translateY)=> {
        return 2 * radius * Math.pow(Math.sin(angle), 2) + translateY;
        //return radius * Math.sin(angle) + translateY;
    }
};

let sinusoid = {
    radius: 50,
    angle: Math.PI / 15,
    translateX: 10,
    translateY: 100,
    halfPeriod: 2,
    fx: (radius, angle, translateX)=> {
        return radius * angle + translateX;
    },
    fy: (radius, angle, translateY)=> {
        return radius * Math.sin(angle) + translateY;
    }
};

function drawCurve(options) {
    ctx.beginPath();

    let radius = options.radius;
    let point = 0;
    let shiftY = 0;
    let shiftX = 0;

    if (options.translateX) {
        shiftX += options.translateX;
    }

    if (options.translateY) {
        shiftY += options.translateY;
    }

    if (options.point) {
        point = options.point;
    }

    for (let time = 0; time < options.halfPeriod * Math.PI; time += options.angle) {
        let Mx = options.fx(radius, time, point, shiftX);
        let My = options.fy(radius, time, point, shiftY);

        ctx.lineTo(Mx, My);
    }

    ctx.stroke();
}

function draw() {
    let canvas = document.getElementById('tutorial');

    if (canvas.getContext) {
        ctx = canvas.getContext('2d');

        drawCurve(trochoid);
    }
}

