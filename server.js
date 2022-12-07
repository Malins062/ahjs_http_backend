
const http = require('http');
const Koa = require('koa');
const koaBody = require('koa-body');
const app = new Koa();

const tickets = [];

app.use(koaBody({
  urlencoded: true,
}));

app.use(async ctx => {
    const { method } = ctx.request.querystring;

    switch (method) {
        case 'allTickets':
            ctx.response.body = tickets;
            return;
        // TODO: обработка остальных методов
        default:
            ctx.response.status = 404;
            return;
    }
});

const port = 7070;

server.listen(port, (err) => {
  if (err) {
    return console.log('Error occured:', err);
  }
  console.log(`Server is listening on port: ${port}.`);
});
