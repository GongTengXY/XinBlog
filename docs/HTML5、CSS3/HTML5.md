# HTML5 精简版

## HTML 规范

首先 **HTML** 超文本标记语言：是一个标记语言，是有对应的语法标准<br>这也就是为什么，我们在 html 文件中的最上方要加上 `<!DOCTYPE html> `这样的字样

顺便给大家展示一下早期麻烦的写法

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
```

对于 html 文件，浏览器的解析器是需要对其进行解析的。因此我们使用 DOCTYPE 即 Document Type（网页文件的文档类型标准）来告诉解析器我们使用的是 **HTML** 规范或 **XHTML** 规范来解析页面

这里对几种标记语言进行拓展一下：

> 1、HTML4 ：HTML 是先去实现，后面才制定规则。因此导致 HTML ⾮常混乱和松散，语法不严谨。<br>
> 2、XHTML ：XHTML 属于是加强版的 HTML，解决了 HTML 中混乱的问题，语法严谨。<br>
> 3、HTML5 ：HTML5 是在 HTML 的基础上拓展。也是目前的统一的标准。

## HTML 语义化

HTML5 规范提倡语义化标签，即使⽤恰当语义的 HTML 标签让⻚⾯具有良好的结构与含义。例如`<p>、<article>、<header>`等等具有很明显语义这样的标签。语义化有两点好处：

> 1、利于 SEO：带有语义的网页代码，利于搜索引擎爬⾍程序来爬取和提取出有效的信息<br>
> 2、利于 开发者：可读性增强，开发团队可以清晰看出网页机构，利于团队协作开发和后续维护

## meta 标签

meta 标签是 html 标记 head 区域的一个非常关键且重要的标签。它所提供的是整个文档的基本元信息。
在这里列举几个常见的：

```html
// 设置网页关键词（利用SEO）
<meta
  name="keywords"
  content="电商,好货,便宜"
/>
// 设置 http 响应头：Content-Type 网页内容类型
<meta charset="utf-8" />
// 设置网页视口（viewport）控制视⼝的⼤⼩、缩放和⽐例
<meta
  name="viewport"
  content="width=device-width, initial-scale=1, maximum-scale=1"
/>
```

## 浏览器内核

浏览器内核主要分为两部分：**渲染引擎**（Rendering Engine) 和 **JS 引擎** 。浏览器内核负责对网页语法的进行解释并且渲染网页。
但不同的浏览器，其内核也是有差别的。

| Trident 内核  | Gecko 内核        | Blink 内核          | Webkit 内核           |
| ------------- | ----------------- | ------------------- | --------------------- |
| IE、搜狗、360 | Netscape、FireFox | chrome、edge、opera | safari（chrome 以前） |

### 渲染引擎

渲染引擎会先通过浏览器网络层获得所请求文档的内容，然后开始解析 html 文件构建 DOM 树，（内部 css 文件、脚本下载解析就不说了），然后 CSSOM 树与 DOM 树关联和映射构建为 render 树，然后布局绘制

### JS 引擎

先解释一个概念，所有的高级编程语言最后都是需要转成为机器指令去执行。因此不管宿主环境是 node 还是浏览器，最后都是要被 CPU 执行的<br>
综上概念就是说：JS 引擎是将 javascript 代码转成为 CPU 指令去执行

能力有限，粗略的说一下这个过程

> JavaScript 被 Parser 解析后，会变成 AST 抽象语法树，经过 Ignition 转化树，将 AST 转为字节码，再由 V8 引擎将字节码转化成 CPU 需要的机器指令，进行执行。

## Audio 和 Video 播放器

`<audio>`和`<video>` 标签是 HTML5 的新标签即表示音频播放、视频播放。

```html
// 关于audio的属性可访问链接：https://www.runoob.com/tags/tag-audio.html
<audio
  src="/Images"
  controls="controls"
></audio>
// 关于video的属性可访问链接：https://www.runoob.com/tags/tag-video.html
<video
  src="/Images"
  controls="controls"
></video>
```

> 以上，都挺难看的且 video 有时候可能播放不出来（视频流格式问题）  
> 后续会整理出来

## localStorage

**localStorage** 本地存储也叫永久存储，非手动删除则一直存在。且与 cookie 都可以在所有同源窗口间共享。
优点：

- 兼容性较好，ie8+都可
- 存储容量 5M
- 永久存储，除手动删除（只能存储字符串）

```js
// 因只能存储字符串，所以需要使用JSON转化
const info = JSON.stringify({ username: "zs", age: 18 });
// 存储
localStorage.setItem("user", info);
// 读取
JSON.parse(localStorage.getItem("user"));
// 手动移除
localStorage.remove();
```

## Input

### 新增属性 placeholder

属性 placeholder 表示提示信息

```html
<input
  type="text"
  placeholder="请输入用户名"
/>
<input
  type="password"
  placeholder="请输入密码"
/>
```

### 新增 type

新增 type 属性类型：color、date、datetime、datetime-local、month、week、time、email、number、range、search、tel 和 url。这里挑个别说一下，详细见： [点击这里](https://www.runoob.com/tags/att-input-type.html)

```html
<!-- html5新增的这些type类型，但也存在一些兼容性的问题。 -->
// 拾色器
<input type="color" />
// date控件（包括年、月、日，不包括时间）
<input type="date" />
// 定义输入数字
<input type="number" />
// 定义输入url字段
<input type="url" />
// 自动提示历史搜索
<input type="search" />
```

## 自定义属性 data-

HTML5 增加了一项新功能是 自定义数据属性 ，也就是`data-*` 自定义属性。在 HTML5 中我们可以使用以 `data-` 为前缀来设置我们需要的自定义属性，来进行一些数据的存放。当然高级浏览器下可通过脚本进行定义和数据存取。在项目实践中非常有用。

HTML5 新增了个`dataset`属性来存取`data-* `自定义属性的值。这个`dataset`属性是 HTML5 JavaScript API 的一部分，用来返回一个所有选择元素 data- 属性的`DOMStringMap`对象

```html
<input
  type="button"
  value="按钮"
  index="10"
  data-index="10"
  data-index-color="red"
/>

<script>
  let btn = document.querySelector("input");
  // 使用dataset方法获取自定义属性值并进行修改
  console.log(btn.dataset.index); // 10
  console.log(btn.dataset.indexColor); // red
  btn.dataset.dataIndex = 20;
  console.log(btn.dataset.index); // 20
</script>
```

## Web Worker

**Web Worker** 是 HTML5 标准的一部分，这一规范定义了一套 API，允许我们在 js 主线程之外开辟新的 Worker 线程，并将一段 js 脚本运行其中，它赋予了开发者利用 js 操作多线程的能力。

```js
// 这里是main.js。此为主线程内。
// 初始化创建worker
const worker = new Worker(path); // path代表worker的js脚本地址
// 主线程与 worker 线程都是通过 postMessage 方法来发送消息，以及监听 message 事件来接收消息
worker.addEventListener("message", (e) => {
  // 接收消息
  console.log(e.data); // Greeting from Worker.js，worker线程返回的结果
});
// 主线程对worker线程发送消息
worker.postMessage("快点计算");
// 关闭worker线程
worker.terminate();
```

> worker 线程是独立的，不可以操作 dom，也没有 document 对象。worker 有一个全局对象 WorkerGlobalScope，window 上的很多属性方法存在 WorkerGlobalScope 中
