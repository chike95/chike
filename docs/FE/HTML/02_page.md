# 页面结构

#### 语义标签

HTML 标签都有具体语义，虽然技术上可以使用 div 标签表示大部分内容，但选择清晰的语义标签更容易让人看明白。比如 h1表示标题、p标签表示内容、强调内容使用em标签。

#### 嵌套关系

元素可以互相嵌套包裹，即元素存在父子级关系。
```html
<article>
  <h1>标题</h1>
  <div>
    <p>个人网站</p>
    <span>yefenglin.cn</span>
  </div>
</article>
```

## 基础结构

下面是 HTML 文档的基本组成部分

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
</body>
</html>
```

| 标签 | 说明 |
| :------: | :------: |
|DOCTYPE| 声明为 HTML 文档|
|html|	lang:网页的语言，如 en/zh 等，非必选项目
|head|	文档说明部分，对搜索引擎提供信息或加载 CSS、JS 等|
|title|	网页标题|
|viewport|	视图窗口|
|description|	向搜索引擎描述网页内容的摘要信息|
|body|	页面主体内容|

## 页眉页脚

#### header

header 标签用于定义文档的页眉

#### footer

footer 标签定义文档或节的页脚，页脚通常包含文档的作者、版权信息、使用条款链接、联系信息等等。

## 导航元素

在 HTML 中使用nav设置导航链接

## 主要区域

HTML5 中使用 main 标签表示页面主要区域，一个页面中main元素最好只出现一次。

## 内容区域

使用 article 标签规定独立的自包含内容区域。不要被单词的表面意义所局限，article 标签表示一个独立的内容容器。

## 区块定义

使用 section 定义一个区块，一般是一组相似内容的排列组合。

## 附加区域

使用 aside 用于设置与主要区域无关的内容，比如侧面栏的广告等。

## 通用容器

div 通用容器标签是较早出现的，也是被大多数程序员使用最多的容器。不过我们应该更倾向于使用有语义的标签如article/section/aside/nav 等。

有些区域这些有语义的容器不好表达，这时可以采用div容器，比如轮播图效果中的内容。



