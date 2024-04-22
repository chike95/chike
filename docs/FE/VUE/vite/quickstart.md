# 快速开始

::: code-group

```bash [npm]
npm create vite@latest
```

```bash [pnpm]
pnpm create vite
```

```bash [vite + vue]
# npm 7+, 需要额外加 --:

npm create vite@latest my-vue-app -- --template vue

# yarn

yarn create vite my-vue-app --template vue

# pnpm

pnpm create vite my-vue-app --template vue
```

:::

## 开启跨域

在 vite.config.js 文件中添加代理配置：

```js
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      // 选项写法
      "/api": {
        target: "http://localhost:3000", // 目标地址
        changeOrigin: true, // 开启代理，在本地创建一个虚拟服务器，然后发送请求的数据，同时会收到请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        rewrite: (path) => path.replace(/^\/api/, ""), // 路径重写，移除路径中的/api
      },
    },
  },
});

```

