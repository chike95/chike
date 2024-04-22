# 技术

官网：<https://nest.nodejs.cn/techniques>

## Session

(1) 安装插件

```bash
$ npm i express-session
$ npm i -D @types/express-session
```

(2) 将 express-session 中间件应用为全局中间件
```ts
// main.ts
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      name: 'zp.sid',
      secret: 'lxm_help',
      rolling: true,
      cookie: {
        maxAge: 6000000,
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
      },
    }),
  );
  await app.listen(3000);
}
```
```js
[Function: session] {
  Store: [Function: Store],
  Cookie: [Function: Cookie],
  Session: [Function: Session],
  MemoryStore: [Function: MemoryStore]
}
```


## 上传文件

官网：<https://nest.nodejs.cn/techniques/file-upload>