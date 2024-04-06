## 基础知识

node 即然是服务器端环境，所以可以操作服务器文件的读写，这与基于浏览器的 JS 是有区别的。

我们需要使用 node.js 的 fs 模块操作文件和管理目录。

## 异步操作

同步文件操作会阻塞进程，所以使用异步文件操作拥有更好的性能，也是推荐的做法。

使用 readFile 与 writeFile 可以对文件进行异步操作，不阻塞进程拥有更好的性能。

Node.js以错误优先为思想，所以回调函数第一个参数为错误信息，没有错误时值为null


### 读取文件

```js
var fs = require('fs');

// console.log(fs);

fs.readFile('./a.txt', 'utf-8', function (err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
    }
});
```


### 写入文件

先擦除，后写入

```js
var fs = require('fs');

fs.writeFile('./a.txt', 'this is content', function (err) {
    console.log(err);
})
```

### 追加文件

先读取，后拼接，再写入

```js
var fs = require('fs');

fs.readFile('./a.txt', 'utf8', function (err, data) {
    if (!err) {
        var newData = data + 'this is new data';
        fs.writeFile('./a.txt', newData, function (err) {
            if (!err) {
                console.log('write success');
            }
        });
    }
});
```


## 同步操作

