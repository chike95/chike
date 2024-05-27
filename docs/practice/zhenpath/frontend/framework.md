# 前端架构

## 技术栈

- 语言：typescript
- 前端框架 Vue
- 组件库 Ant Design of Vue

### 前台系统

- SSR 框架 NuxtJS
- CSS ：tailwind

### 后台系统

- vben-admin-vue

```ts
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 设置全局前缀
  app.setGlobalPrefix("manager");

  // 注册全局中间件
  app.use(someGlobalMiddleware);

  // 注册全局错误处理器
  app.useGlobalFilters(new GlobalExceptionFilter());

  // 启动应用程序并监听指定端口
  await app.listen(3000);
}

// 全局中间件示例
function someGlobalMiddleware(req, res, next) {
  // 在这里可以添加一些全局中间件逻辑
  next();
}

// 全局错误处理器示例
class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    // 在这里可以处理全局的异常情况
  }
}
```
