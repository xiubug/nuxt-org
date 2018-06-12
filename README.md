# nuxt-org

> 基于Nuxt.js最佳实现

- 预览：http://nuxt.sosout.com/

## 快速上手

``` bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:7788
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

## 特性

- :gem: **特性一**：基于 Vue.js
- :rocket: **特性二**：自动代码分层
- :1234: **特性三**：服务端渲染
- :gem: **特性四**：强大的路由功能，支持异步数据
- :rocket: **特性五**：静态文件服务
- :1234: **特性六**：ES6/ES7 语法支持
- :gem: **特性七**：打包和压缩 JS 和 CSS
- :rocket: **特性八**：HTML头部标签管理
- :1234: **特性九**：本地开发支持热加载
- :gem: **特性十**：集成ESLint
- :rocket: **特性十一**：支持各种样式预处理器： SASS、LESS、 Stylus等等

## 模板
- [ ] 项目搭建

## 使用pm2守护进程

```bash
# for development
$ pm2 start npm --name "my-nuxt" -- run dev

# for production
$ pm2 start npm --name "my-nuxt" -- run build         
```

## Nuxt踩坑之旅

### 开发环境是否允许自动打开浏览器

不允许自动打开浏览器，作者认为自动打开浏览器具有侵略性！参考：[Auto open browser when run dev](https://github.com/nuxt/nuxt.js/issues/1433)，该项目是通过express 和 opn 自动打开浏览器的！

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).
