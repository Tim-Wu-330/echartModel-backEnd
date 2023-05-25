const Koa = require('koa');
const app = new Koa();

const durarionMiddleware = require('./middleware/response_duration')
app.use(durarionMiddleware);

const headerMiddleware = require('./middleware/response_header')
app.use(headerMiddleware);

const dataMiddleware = require('./middleware/response_data')
app.use(dataMiddleware);

app.listen(3000);

const websocketService = require('./service/webSocket_service');
// 开启服务端的监听，监听客户端的连接
// 当某个客户端连接成功后，对这个客户端进行message事件的监听
websocketService.listen();