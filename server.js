
const http = require('http');
const path = require('path');
const Koa = require('koa');
const koaBody = require('koa-body');
const koaStatic = require('koa-static');

const app = new Koa();

const tickets = [
  {
    name: 'Поменять краску в принтере, каб.404',
    description: 'Закончилась краска в принтере, модель Epson-CJ300',
    status: true,
    created: '10.03.2022 08:40'
  },
  {
    name: 'Переустановить OC Linux, каб.204',
    description: 'Слетела операционная система, требуется переустановка',
    status: true,
    created: '22.11.2022 13:10'
  },
  {
    name: 'Установить обновление KB-32565, каб.6',
    description: 'Вышло критическое обновление Windows-10, требуется установка обновления',
    status: false,
    created: '08.12.2022 10:00'
  },
];

// app.use(koaBody({
//   urlencoded: true,
// }));

// app.use(async ctx => {
//     const { method } = ctx.request.querystring;

//     switch (method) {
//         case 'allTickets':
//             ctx.response.body = tickets;
//             return;
//         // TODO: обработка остальных методов
//         default:
//             ctx.response.status = 404;
//             return;
//     }
// });

// => Static file handling
const public = path.join(__dirname, '/public')
app.use(koaStatic(public));

// => CORS
app.use(async (ctx, next) => {
  const origin = ctx.request.get('Origin');
  if (!origin) {
    return await next();
  }

  const headers = { 'Access-Control-Allow-Origin': '*', };

  if (ctx.request.method !== 'OPTIONS') {
    ctx.response.set({...headers});
    try {
      return await next();
    } catch (e) {
      e.headers = {...e.headers, ...headers};
      throw e;
    }
  }

  if (ctx.request.get('Access-Control-Request-Method')) {
    ctx.response.set({
      ...headers,
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH',
    });

    if (ctx.request.get('Access-Control-Request-Headers')) {
      ctx.response.set('Access-Control-Allow-Headers', 
                            ctx.request.get('Access-Control-Request-Headers'));
    }

    ctx.response.status = 204;
  }
});

// => Body Parsers
app.use(koaBody({
  text: true,
  urlencoded: true,
  multipart: true,
  json: true,
}));

// => GET/POST
app.use(async ctx => {
    const { method } = ctx.request.querystring;
    console.log(method, ctx.request.method, ctx.request.querystring, ctx.request.body,
      ctx.request
      );

    switch (method) {
        case 'allTickets':
            ctx.response.body = tickets;
            console.log(tickets);
            return;
        default:
            ctx.response.status = 404;
            return;
    }
// const { name, phone } = ctx.request.querystring;
//   // const { name, phone } = ctx.request.body;  // for POST

//   if (subscriptions.has(phone)) {
//     ctx.response.status = 400
//     ctx.response.body = 'You already subscribed';
//     return;
//   }

//   subscriptions.set(phone, name);
  ctx.response.body = 'Ok';
});


const port = process.env.PORT || 7070;
http.createServer(app.callback()).listen(port,port, (err) => {
  if (err) {
    return console.log('Error occured:', err);
  }
  console.log(`Server is listening on port: ${port}.`);
});
