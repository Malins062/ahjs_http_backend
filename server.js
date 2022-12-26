
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

// => Static file handling
const public = path.join(__dirname, '/public')
app.use(koaStatic(public));

app.use(koaBody({
  urlencoded: true,
  multipart: true,
}));

app.use((ctx, next) => {
  console.log('STEP - 1');
  console.log(`Request method: ${ctx.request.method}`);
  console.log(`Headers: ${ctx.headers}`);
  
  if (ctx.request.method !== 'OPTIONS') {
    next();

    return;
  }

  ctx.response.set('Access-Control-Allow-Origin', '*');

  ctx.response.set('Access-Control-Allow-Methods', 'DELETE, PUT, PATCH, GET, POST');

  ctx.response.status = 204;

  console.log(`Response status code: ${ctx.response.status}`);
});

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


// => CORS
// app.use(async (ctx, next) => {
//   const origin = ctx.request.get('Origin');
//   console.log(origin);
//   if (!origin) {
//     return await next();
//   }

//   const headers = { 'Access-Control-Allow-Origin': '*', };

//   console.log(headers, ctx.request.method);
//   if (ctx.request.method !== 'OPTIONS') {
//     ctx.response.set({...headers});
//     try {
//       return await next();
//     } catch (e) {
//       e.headers = {...e.headers, ...headers};
//       throw e;
//     }
//   }

//   if (ctx.request.get('Access-Control-Request-Method')) {
//     ctx.response.set({
//       ...headers,
//       'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH',
//     });

//     if (ctx.request.get('Access-Control-Request-Headers')) {
//       ctx.response.set('Access-Control-Allow-Headers', 
//                             ctx.request.get('Access-Control-Request-Headers'));
//     }

//     ctx.response.status = 204;
//   }
// });

// // => Body Parsers
// app.use(koaBody({
//   text: true,
//   urlencoded: true,
//   multipart: true,
//   json: true,
// }));

// => GET/POST
app.use(async ctx => {
  console.log('STEP - 2');
  const { method } = ctx.query;
  console.log(ctx.request, ctx.query, ctx.request.body);

  switch (method) {
      case 'allTickets':
          ctx.response.body = tickets;
          console.log(tickets);
          return;
      default:
          ctx.response.status = 404;
          return;
  }

  ctx.response.body = 'Server response';
// const { name, phone } = ctx.request.querystring;
//   // const { name, phone } = ctx.request.body;  // for POST

//   if (subscriptions.has(phone)) {
//     ctx.response.status = 400
//     ctx.response.body = 'You already subscribed';
//     return;
//   }

//   subscriptions.set(phone, name);
});

const port = process.env.PORT || 7070;
const server = http.createServer(app.callback());

server.listen(port, (err) => {
  if (err) {
    return console.log('Error occured:', err);
  }
  console.log(`Server is listening on port: ${port}.`);
});
