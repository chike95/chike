# VUE 知识点

### 输出变量

{{ variable}}

### 数据绑定 ref



ref.value



```vue
<template>
  <a-layout-content
      :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
  >
    {{ resData }}
  </a-layout-content>
</template>
<script setup lang="ts">
import axios from "axios";
import {onMounted, ref} from "vue";

const resData = ref();
console.log('setup');

onMounted(()=>{
  axios.get("/api/hello").then((res)=>{
    resData.value = res.data;
    console.log(res)}
  )}
)

</script>
```

### 数据绑定 reactive

vue3 新增
```ts
const resData = reactive({name:''})

resData.name = 'lxm'
```

### 生命周期 mounted

初始化方法

vue2：mounted

vue3：onMounted