# 虚拟 DOM

## 什么是虚拟 DOM

虚拟 DOM 是一种编程概念，其本质就是一个普通的 JavaScript 对象来描述一个 DOM 节点。因为不是真实的`DOM`对象，所以叫做`Virtual DOM(vNode)`

我们为什么用虚拟`DOM`来模拟真实的`DOM`呢？

## 为什么要使用虚拟 DOM

- 手动操作`Dom`比较麻烦，还需要考虑浏览器兼容性问题，虽然有`Jquery`等库简化`DOM`操作，但是随着项目的复杂度越来越高，`DOM`操作复杂提升，既要考虑`Dom`操作，还要考虑数据的操作。

- 为了简化`DOM`的复杂操作于是出现了各种的`MVVM`框架，`MVVM`框架解决了视图和状态的同步问题，也就是当数据发生变化，更新视图，当视图发生变化更新数据。

- 为了简化视图的操作我们可以使用模板引擎，但是模板引擎没有解决跟踪状态变化的问题（当数据发生了变化后，无法获取上一次的状态，只有将页面上的元素删除，然后在重新创建，这时页面有刷新的问题，同时频繁操作`Dom`,性能也会非常低），于是`Virtual Dom`出现了。

- `Virtual Dom`的好处就是当状态改变时不需要立即更新`DOM`，只需要创建一个虚拟树来描述`DOM`，`Virtual Dom`内部将弄清楚如何有效(`diff`)的更新`DOM`.(例如：向用户添加列表中添加一个用户，只添加新的内容，原有的结构会被重用)

虽然在使用`jquery`时代这种方式是可行的，我们点击按钮，它就可以从小到大的排序，但是它比较暴力，它会将之前的`dom`全部删除，然后重新渲染新的`dom`节点，我们知道，操作`DOM`会影响页面的性能，并且有时候数据根本就没有发生改变，我们希望未更改的数据不需要重新渲染操作。

<p style="color: rgb(100, 181, 135);font-weight:600;">因此虚拟 DOM 的思想就出来了，就是先控制数据再到视图，但是数据状态是通过 diff 比对，它会比对新旧虚拟 DOM 节点，然后找出两者之前的不同，然后再把不同的节点再发生渲染操作。</p>
<img src="/Images/VNode1.png" style="zoom:35%;"/>

## 虚拟 DOM 怎样为转换真实 DOM

首先，在一个组件实例首次被渲染时，首先会生成虚拟 dom 树，然后根据根据虚拟 dom 树创建真实 dom，并把真实 dom 挂载到页面中合适的位置，此时，每个虚拟 dom 便会对应一个真实的 dom。这时候虚拟 dom 多一个创建虚拟 dom 树的过程，所以效率比真实 dom 低。

> 这就是我们常问，使用虚拟 dom 一定性能更好、速度更快吗？

当组件收到了响应式数据变化的影响时，就会重新渲染，此时会调用`render`方法，通过`render`方法中的`h`函数来，创建新的虚拟 dom 树，然后将新 VNode tree 与 旧 VNode tree 进行 diff 算法对比，通过对比 vue 会找到最小更新差异量，然后更新必要的 虚拟 dom 节点。最后这些更新过的`虚拟 dom 节点`，会去修改他们对应的`真实 dom 节点`。
<img src="/Images/VNode2.png" />

组件实例首次被渲染时，首先会生成虚拟 dom 树中，最后虚拟 dom 树会生成真实的 DOM 树，这个过程叫 **渲染**。当数据发生变化时，Vue 会先生成新的虚拟 DOM 树，然后通过比较新旧虚拟 DOM 树的差异来找出需要更新的部分,从而将虚拟 DOM 的变更操作转换为真实 DOM 的变更操作。

## 模版和虚拟 dom 的关系

`vue` 框架中有一个`compile模块`，它主要负责将模板(实际上是字符串)转换为`render函数`，而`render函数`调用后将得到`虚拟 dom`。在这里我借鉴了很多大佬的意思加上我自己理解，大概说一下吧。

主要的流程刚才已经说了。首先要先获取模版

### 获取模版

`Vue`会根据传入的`options`，然后判断获取`template`。首先要判断，`options`中无`render`函数，正常的顺序就是获取到`template`之后，调用`compileToFunctions`函数传参 template 来获取`render函数`。

```js
// 这里截取一段源码给大家看看
`/src/platforms/web/entry-runtime-with-compiler.js`;
Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  el = el && query(el);
  //省略。。。。
  const options = this.$options;
  // resolve template/el and convert to render function
  if (!options.render) {
    let template = options.template;
    if (template) {
      if (typeof template === "string") {
        if (template.charAt(0) === "#") {
          template = idToTemplate(template);
        }
      } else if (template.nodeType) {
        template = template.innerHTML;
      } else {
        //省略
      }
    } else if (el) {
      template = getOuterHTML(el);
    }
    if (template) {
      //根据template获取render函数。
      const { render, staticRenderFns } = compileToFunctions(
        template,
        {
          //省略
        },
        this
      );
      options.render = render;
    }
    return mount.call(this, el, hydrating);
  }
};

function getOuterHTML(el: Element): string {
  if (el.outerHTML) {
    return el.outerHTML;
  } else {
    const container = document.createElement("div");
    container.appendChild(el.cloneNode(true));
    return container.innerHTML;
  }
}
```

### 编译模版

从 template 到 render 的过程中，首先要将 template 解析成 AST 树，这里的源码很复杂。给大家说一下过程就是调用`parse`方法将 `template` 转化为 `ast`。

```js
constast = parse(template.trim(), options);
```

::: info AST 是什么？
使用 js 树形结构描述原始代码
:::

编译的过程：

- 如果使用传统的引入方式(script 的 src)，则编译时间发生在组件第一次加载时，这称之为运行时编译。
- 如果是在`vue-cli`的默认配置下，编译发生在打包时，这称之为模板预编译。（打包的时候编译完成
- 编译是一个极其耗费性能的操作，预编译可以有效的提高运行时的性能，而且，由于运行的时候已不需要编译，`vue-cli`在打包时会排除掉 vue 中的`compile`模块，以减少打包体积

刚刚提到的模版预编译就是在`vue-cli`进行打包时，会直接把组件中的模板转换为`render`函数。这样做是有好处的：

- 运行时就不再需要编译模板了，提高了运行效率
- 打包结果中不再需要 vue 的编译代码，减少了打包体积

> 感兴趣的同学可以看看前面给大家截取的源码片段，可以看到优先级是 render -> template -> ast 的。这样做就是为了在 vue 中，如果有模板和 render，则 render 优先。当然在`vue-cli`打包存在预编译，发现有模板，会覆盖 render。这两点不要搞混哈。

```js
//vue config.js
module.export = {
  runtimeCompiler: true, //打包的时候要不要包含运行时候编译，默认false，不建议使用true
};
```

> 模板的存在，仅仅是为了让开发人员更加方便的书写界面代码。  
> vue 最终运行的时候，最终需要的是 render 函数，而不是模板，因此，模板中的各种语法，在虚拟 dom 中都是不存在的，它们都会变成虚拟 dom 的配置
