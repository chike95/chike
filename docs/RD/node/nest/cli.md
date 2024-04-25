# CLI

安装

```bash
npm install -g @nestjs/cli

// 查看版本 
nest -version

// 获取帮助信息
nest -help
```

创建项目

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
### 常用命令

![alt text](img/image-3.png)

生成 module.ts

```bash
nest g mo module-name
```

生成 controller.ts

```bash
nest g co controller-name
```

生成 service.ts

```bash
nest g s service-name
```


命令生成CURD

```bash
nest g res user
```

::: info Options 显示命令：nest g -help
  -d, --dry-run                      Report actions that would be taken without writing out results.

  -p, --project [project]            Project in which to generate files.

  --flat                             Enforce flat structure of generated element.

  --no-flat                          Enforce that directories are generated.

  --spec                             Enforce spec files generation. (default: true)

  --spec-file-suffix [suffix]        Use a custom suffix for spec files.

  --skip-import                      Skip importing (default: false)

  --no-spec                          Disable spec files generation.

  -c, --collection [collectionName]  Schematics collection to use.

  -h, --help                         Output usage information.

:::