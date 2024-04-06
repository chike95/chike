## 基础知识

node.js使用common.js模块管理，common.js 是2009年制定的模块标准。

ESM: 之所以不使用ES6 module，因为node.js推出时javascript还没有ES6 Module。

#### 模块特点

代码拆分

相互独立

导入导出

#### 模块规范

CommonJS: 同步加载，加载一个文件时，必须等待文件加载完成，才能执行后面的代码。

AMD: 异步加载，加载一个文件时，不会阻塞后面的代码。

CMD: 异步加载，加载一个文件时，不会阻塞后面的代码。

ES6 Module: 异步加载，加载一个文件时，不会阻塞后面的代码。

### ESM

$ node im.js

(node:7688) Warning: To load an ES module, set "type": "module" in the package.json or use the .mjs extension.

(Use `node --trace-warnings ...` to show where the warning was created)

方法一：修改文件后缀名



方法二：修改配置文件


