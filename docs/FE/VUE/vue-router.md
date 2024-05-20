# vue-router

文档：<https://router.vuejs.org/zh/introduction.html>

## 快速开始

（1）安装 Vue Router

```bash
npm install vue-router@4  
# 或者  
yarn add vue-router@4
```

（2）创建组件
```vue
<template>  
  <div>  
    <h1>Home Page</h1>  
    <!-- 其他内容 -->  
  </div>  
</template>  
  
<script>  
export default {  
  name: 'Home'  
}  
</script>
```

（3）配置路由

在 src 目录下创建一个 router 目录，并在其中创建一个 index.js 文件来配置你的路由：

```js
import { createRouter, createWebHistory } from 'vue-router'  
import Home from '../views/Home.vue'  
  
const routes = [  
  {  
    path: '/',  
    name: 'Home',  
    component: Home  
  },  
  // 其他路由...  
]  
  
const router = createRouter({  
  history: createWebHistory(),  
  routes  
})  
  
export default router
```

（5）在 main 中引入并使用路由

```js
import { createApp } from 'vue'  
import App from './App.vue'  
import router from './router'  
  
const app = createApp(App)  
app.use(router)  
app.mount('#app')
```

（6）在 App.vue 中使用 < router-view >
```vue
<template>  
  <div id="app">  
    <router-view />  
  </div>  
</template>  
  
```

## 要点

### 路由跳转

```vue
 <RouterLink to="/about">Go to About</RouterLink>
```

```js
router.push('/About');
```