# Vue2 响应式原理

## Vue2 官方阐述

https://v2.cn.vuejs.org/v2/guide/reactivity.html

在`Vue2.x`中响应式的实现是通过`Object.defineProperty`来完成的，手动将`data对象`中的所有属性进行`数据劫持`，将对象中的属性转换变成`getter/setter`形式,然后呢就形成了响应式数据，组件 `render` 函数会生成虚拟 `DOM` 树，影响到界面。`render` 运行的时候用到了响应式数据，于是收集了依赖，数据变化，会通知 `watcher`，`watcher` 会重新运行 `render` 函数。可参考此图。

<img src="/Images/v2Reactive.png"/>

单看这张图，大家可能看不明白。在 `vue2` 中是有几个核心模块的：

- Observer
- Dep
- Watcher
- Scheduler

## Observer

功能：负责把`data`选项中的属性转换成响应式数据，并且数据变化发送通知。

在组件生命周期中，数据响应式发生在 `beforeCreate` 之后，`created` 之前。具体实现上，它会递归遍历对象的所有属性，以完成深度的属性转换。

由于遍历时只能遍历到对象的当前属性，因此无法监测到将来动态增加或删除的属性，因此 `vue` 提供了`$set`和`$delete` 两个实例方法，让开发者通过这两个实例方法对已有响应式对象添加或删除属性。

```js
var obj = {
  a: 1,
  c: {
    d: 2,
  },
  f: [
    {
      a: 3,
      b: 4,
    },
    5,
  ],
};
Vue.observable(obj); //递归遍历
```

> 看到这里大家可能会有疑惑，那数组呢，Object.defineProperty 不能对数组进行数据劫持，那 vue 内部是怎么做的呐？
> Vue 能对数组进行监听的原因是，把数组的方法重写了。
>
> - 先获取原生 Array 的原型方法，拦截后还是需要原生的方法帮我们实现数组的变化
> - 对 Array 的原型方法使用 Object.defineProperty 做一些拦截操作
> - 把需要被拦截的 Array 类型的数据原型指向改造后原型

```js
// 给大家截图看看源码部分对数组的处理 地址：src/core/observer/index.js
// Vue 没有对数组的每个键设置响应式的过程，而是直接对值进行递归设置响应式
constructor (value: any) {
    this.value = value
    this.dep = new Dep()
    this.vmCount = 0
    def(value, '__ob__', this)
    if (Array.isArray(value)) {
      if (hasProto) {
        protoAugment(value, arrayMethods)
      } else {
        copyAugment(value, arrayMethods, arrayKeys)
      }
      this.observeArray(value)
    } else {
      this.walk(value)
    }
  }

  /**
   * Walk through all properties and convert them into
   * getter/setters. This method should only be called when
   * value type is Object.
   */
  walk (obj: Object) {
    const keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i])
    }
  }
```

## Dep

Dep 的含义是 Dependency，表示依赖的意思。 Vue 会为响应式对象中的每个属性、对象本身、数组本身创建一个 Dep 实例，

功能：收集依赖，添加观察者(`watcher`)，通知所有观察者(派发更新)。

<img src="/Images/v2Dep.png" />

> 这里我截取一段我仿写的代码仅供参考理解

```js
// 这是我mini_vue2中对Observer的仿写，供大家理解Observer和Dep的功能
class Observer {
  constructor(data) {
    this.walk(data);
  }
  walk(data) {
    if (!data || typeof data !== "object") {
      return;
    }
    Object.keys(data).forEach((key) => {
      this.defineReactive(data, key, data[key]);
    });
  }

  defineReactive(data, key, value) {
    let that = this;
    this.walk(value);
    let dep = new Dep();
    Object.defineProperty(data, key, {
      get() {
        // 记录依赖，addSub就是depend
        Dep.target && dep.addSub(Dep.target);
        return value;
      },
      set(newValue) {
        if (value === newValue) {
          return;
        }
        value = newValue;
        that.walk(newValue);
        // 派发更新，更新数据视图
        dep.notify();
      },
    });
  }
}
```

## Watcher

每一个组件实例，都至少对应一个`watcher`，该 `watcher` 中记录了该组件的 `render` 函数。 `watcher` 首先会把 `render` 函数运行一次以收集依赖，于是那些在 `render` 中用到的响应式数据<span  style="color: rgb(100, 181, 135)">(就是那些在 Observer 中转换成响应式的数据，可参考仿写代码块)</span>就会记录这个`watcher`。 当数据变化时，`dep`就会通知该 `watcher`，而 `watcher` 将重新运行 `render` 函数，从而让界面重新渲染同时重新记录当前的依赖。

<img src="/Images/v2watcher.png" />

这就是 vue 巧妙的地方，利用观察者模式，设计 Dep 和 Watcher 来解决当某个使用到响应式数据时，响应式数据是无法知道是哪个地方在用自己的问题。

> 这里有个疑问给大家，vue 为什么是精准更新呢？

## Scheduler

::: warning
Dep 通知 watcher 之后，如果 watcher 执行属性对应的函数，就有可能导致函数频繁运行，从而导致效率低下,vue 内部是怎么解决的呢？
:::

example:如果一个交给 watcher 的函数，它里面用到了属性 a、b、c、d，那么 a、b、c、d 属性都会记录依赖，于是下面的代码将触发 4 次更新；

```js
data.a = "new data";
data.b = "new data";
data.c = "new data";
data.d = "new data";
```

大家可以看到这样如果真的这样做的话对性能是有非常大的开销，因此，watcher 收到派发更新的通知后，实际上不是立即执行对应函数，而是把自己交给一个叫**调度器**的东西

调度器维护一个执行队列，该队列同一个 watcher 仅会存在一次，队列中的 watcher 不是立即执行，它会通过一个叫做 nextTick 的工具方法，把这些需要执行的 watcher 放入到事件循环的微队列中，nextTick 的具体做法是通过 Promise 完成的。说到 **nextTick**，大家是不是想到了 **this.$nextTick()**，这个方法就是 nextTick 的封装，它会在当前的 watcher 结束后，在下一个事件循环中执行。

<p style="color: rgb(100, 181, 135)">具体来说，当数据发生改变时，Vue 会创建一个 Watcher，并将该 Watcher 的 nextTick 方法加入到一个任务队列中。在下一个 tick 时，scheduler 调度器会检查该任务队列是否为空，如果为空，则直接执行该队列中的所有任务；如果不为空，则将该队列中的任务加入到一个整体的任务队列中，并根据当前的性能情况来决定是否执行该队列中的任务。</p>

<p style="color: rgb(100, 181, 135)">通过这种方式，scheduler 调度器可以控制数据观察的执行时机，从而避免在数据改变时立即执行大量的数据观察任务，导致性能问题。同时，它也可以根据当前的性能情况来动态地调整任务的执行顺序，保证最重要的任务先得到执行。</p>

## 总结

总结：

1. <p style="color: rgb(100, 181, 135);font-weight:600; ">observer 对数据对象进行递归遍历，包括子属性对象的属性，都加上 setter 和 getter 这样的话，给这个对象的某个值赋值，就会触发 setter，那么就能监听到了数据变化</p>

2. <p style="color: rgb(100, 181, 135);font-weight:600;">compile 解析模板指令，将模板中的变量替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，更新视图</p>

3. <p style="color: rgb(100, 181, 135);font-weight:600;">Watcher 订阅者是 Observer 和 Compile 之间通信的桥梁，主要做的事情是:</p>

① 在自身实例化时往属性订阅器(dep)里面添加自己

② 自身必须有一个 update()方法

③ 当属性变动 dep.notice()通知时，能调用自身的 update()方法，并触发 Compile 中绑定给 watcher 的变更函数，从而更新视图

4. <p style="color: rgb(100, 181, 135);font-weight:600;">Dep 是一个用来保存订阅者的类，它主要做的事情是:</p>

① observer 转化响应式数据第一次访问数据时，添加订阅者到自身实例化时创建的 订阅者列表中

② 自身必须有一个 notify()方法

③ 当属性变动时，调用自身的 notify()方法，并触发 Watcher 订阅者的 update()方法，从而更新视图

> 不过要提醒大家的是 Vue2 中的 scheduler 调度器主要是用于控制数据观察的执行时机和性能，而不是用于实现响应式系统的核心逻辑。  
> Vue2 的响应式系统核心逻辑是通过 Object.defineProperty 来实现的,而 scheduler 调度器只是在此基础上进行了一些优化。拓展一下知识点就好。面试被问到可以回答一下，不提不说
