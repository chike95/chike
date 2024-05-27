# 快速开始

## 创建项目

```bash
nest new project-name

cd project-name

npm i
```

启动项目 我们需要热更新 就启动 npm run start:dev 就可以了

```bash
"start": "nest start",
"start:dev": "nest start --watch",
"start:debug": "nest start --debug --watch",
"start:prod": "node dist/main",
```

## 目录结构

### main.ts

main.ts 入口文件主文件 类似于 vue 的 main.ts

通过 NestFactory.create(AppModule) 创建一个 app 就是类似于绑定一个根组件 App.vue

app.listen(3000) 监听一个端口

![alt text](img/image-1.png)

### app.module.ts

app.module.ts 根模块用于处理其他类的引用与共享，app.controller.ts 常见功能是用来处理 http 请求以及调用 service 层的处理方法 app.service.ts 封装通用的业务逻辑、与数据层的交互(例如数据库)、其他额外的一些三方请求

```ts
// app.module.ts
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

### app.controller.ts

可以理解成 vue 的路由

private readonly appService: AppService 这一行代码就是依赖注入不需要实例化 appService 它内部会自己实例化的我们主需要放上去就可以了

```ts
// app.controller.ts
import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller("app")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
```

### app.service.ts

这个文件主要实现业务逻辑的 当然 Controller 可以实现逻辑，但是就是单一的无法复用，放到 app.service 有别的模块也需要就可以实现复用

```ts
// app.service.ts
import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello(): string {
    return "Hello World!";
  }
}
```

### Dto.ts

Dto 数据传输对象 用于接收前端传递过来的数据

```ts
// user.dto.ts
import { IsString } from "class-validator";

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  password: string;
}
```

### Entity.ts

实体类 用于定义数据库表结构

```ts
// user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  password: string;
}
```

### Repository.ts

Repository 用于操作数据库

```ts
// user.repository.ts
import { EntityRepository, Repository } from "@nestjs/typeorm";
import { User } from "./user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {}
```
