# vite

### vue 封装 svg

地址 6-7.8：<https://coding.imooc.com/learn/list/577.html>

相似内容：<https://blog.csdn.net/weixin_43288600/article/details/130586827>

封装一个通用组件 svg-icon：用于显示 svg 矢量图

1 创建 src/libs/svg-icon/index.vue

```vue
<template>
  <svg aria-hidden="true">
    <use :class="fillClass" :xlink:href="symbolId" :fill="color" />
  </svg>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  // 显示的 svg 图标名称（剔除 icon-）
  name: {
    type: String,
    required: true,
  },
  // 直接指定 svg 图标的颜色
  color: {
    type: String,
  },
  // 通过 tailwind 指定 svg 颜色的类名
  fillClass: {
    type: String,
  },
});
// 网页真实显示的 svg 图标名（拼接 #icon-）
const symbolId = computed(() => `#icon-${props.name}`);
</script>
```

2 创建 src/libs/index.js ，完成通用组件注册

```js
import svgIcon from "./svg-icon/index.vue";

export default {
  install(app) {
    app.component("m-svg-icon", svgIcon);
  },
};
```

3 在 main.js 中导入，并利用 use 注册

```js
import mLibs from "./libs";
createApp(App).use(mLibs);
```

4 最后在 src/views/main/components/navigation/mobile/index.vue 中使用组件

```vue
<!-- 汉堡按钮 -->
<li class="z-20 fixed top-0 right-[-1px] h-4 px-1 flex items-center bg-white">
  <m-svg-icon class="w-1.5 h-1.5" name="hamburger"></m-svg-icon>
</li>
```

5 安装 vite-plugin-svg-icons 到项目中

```
npm i --save-dev vite-plugin-svg-icons
```

6 在 vite.config.js 中注册

```js
import path, { join } from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      // 指定symbolId格式
      symbolId: 'icon-[name]'
    })
  ],
  ...
})
```

7 在 main.js 中完成注册

```js
import "virtual:svg-icons-register";
```
