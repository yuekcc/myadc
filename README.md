# myadc

一个简单的 FaaS 服务：

- 基于 node.js vm 模块实现一定程度的代码隔离
- 由 express 提供的路由支持

## 使用

```sh
pnpm i
pnpm build
pnpm start
```

然后就会在 3000 端口启动一个 web 服务器。使用浏览器访问：

- http://127.0.0.1:3000/app/myproject/hello
- http://127.0.0.1:3000/app/myproject/baidu

即可看到效果。

## LICENSE

[MIT](LICENSE)
