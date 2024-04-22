# Element-plus

官网：<https://element-plus.org/zh-CN/guide/quickstart.html>

安装
```bash
npm install element-plus --save
```

完整引入

```js
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'

const app = createApp(App)

app.use(ElementPlus)
app.mount('#app')
```