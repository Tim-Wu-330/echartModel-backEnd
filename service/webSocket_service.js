const path = require('path');
const fileUtils = require('../utils/file_utils');
const websocket = require('ws');
// 创建websocket服务端的对象，绑定的端口号为3344
const wss = new websocket.Server({
  port: 3344,
});

// 服务端开启监听
module.exports.listen = () => {
  // 对客户端的连接事件进行监听
  // client：客户端的连接socket对象
  wss.on('connection', (client) => {
    console.log('客户端连接成功！');
    client.on('message', async (msg) => {
      console.log(msg);
      // 字符串转为json
      let payload = JSON.parse(msg);
      const action = payload.action;
      if (action == 'getData') {
        let filePath = '../data/' + payload.chartName + '.json';
        filePath = path.join(__dirname, filePath);
        const ret = await fileUtils.getFileJsonData(filePath);
        // data对应的值，就是某个json文件的内容
        payload.data = ret;
        client.send(JSON.stringify(payload));
      } else {
        // 原封不动的将所接收到的数据转发给每一个处于连接状态的客户端
        // 所有客户端的连接
        wss.clients.forEach((item) => {
          item.send(JSON.stringify(payload));
        });
      }
    });
  });
};
