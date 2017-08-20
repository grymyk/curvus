'use strict';

const fs = require('fs');
const serve = require('koa-static');
const Koa = require('koa');
const Router = require('koa-router');

let app = new Koa();
let router = new Router();

app.use(serve(__dirname + '/public'));

router.get('/', function (ctx, next) {
    let indexHTML = fs.createReadStream('/public/index.html', 'utf-8');

    ctx.body = indexHTML;
});

router.use('/bg.html', () => {
    let bgHTML = fs.createReadStream('/public/bg.html', 'utf-8');

    ctx.body = bgHTML;
});

app
    .use(router.routes())
    .use(router.allowedMethods());

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Listening to %s', port);
});