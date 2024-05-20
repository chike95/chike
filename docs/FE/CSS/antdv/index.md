# Ant Design Vue

官网：<https://www.antdv.com/components/overview-cn>

## 快速开始

安装
```bash
npm i --save ant-design-vue

npm install --save @ant-design/icons-vue
```

全局注册

```js
import { createApp } from 'vue'
import './style.css'
import Antd from 'ant-design-vue'
import App from './App.vue'
import 'ant-design-vue/dist/reset.css';

const app = createApp(App)

app.use(Antd)
app.mount('#app')
```