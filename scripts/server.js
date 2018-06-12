const opn = require('opn');
const { Nuxt, Builder } = require('nuxt');
const app = require('express')();
const port = process.env.PORT || 8888;

// 传入配置初始化 Nuxt.js 实例(config and init)
const config = require('../nuxt.config.js');

const nuxt = new Nuxt(config);
app.use(nuxt.render);

// 在开发模式下进行编译(Compile in the development mode)
if (config.dev) {
  new Builder(nuxt).build()
  .catch((error) => {
    console.log(error);
    process.exit(1);
  })
}

// 监听指定端口(Listen on port)
app.listen(port, 'localhost', function () {
  console.log('成功开启'+ port +'端口');
  var url = 'http://localhost:' + port;
  console.log('> 服务器运行于 ' + url + '\n');
  opn(url);
})
