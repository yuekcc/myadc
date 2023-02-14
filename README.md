# myadc

一个简单的 FaaS 服务：

- 基于 node.js vm 模块实现代码隔离
- 支持路由

## 使用

```sh
pnpm i
pnpm build
pnpm start
```

然后就会在 3000 端口启动一个 web 服务器。使用浏览器访问：

- http://127.0.0.1:3000/app/myproject/names
- http://127.0.0.1:3000/app/myproject/baidu

即可看到效果。

## LICENSE

[MIT](LICENSE)
