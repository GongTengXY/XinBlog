# React Suspense、Lazy 原理

---

React 的 Suspense 和 lazy 是用于组件懒加载（Code Splitting）和异步渲染管理的工具，能帮助我们实现更优雅的异步 UI 加载体验。

先举个例子吧
```jsx
import React, { Suspense, lazy } from 'react';

const MyComponent = lazy(() => import('./MyComponent'));

export default function App() {
  return (
    <Suspense fallback={<div>加载中...</div>}>
      <MyComponent />
    </Suspense>
  );
}
```

🌟 一句话理解
- `React.lazy()`：让你“懒加载”一个组件，也就是动态 import。

- `Suspense`：用来包裹懒加载组件，指定加载时的 fallback（兜底 UI）。

- 它们的底层依赖于 React 的 Fiber 架构 和 异步渲染机制。

## 一、React.lazy 解析

先来看看`React.lazy(fn)`都帮我们做了些什么？

```jsx
const MyComponent = lazy(() => import('./MyComponent'));
```

`React.lazy`内部相当于返回了一个「占位组件」，并记录这个 import()的 thenable。React 会根据这个 thenable 是否 resolve 来决定：

- **还没 resolve**：不渲染组件内容，挂起（suspend）渲染。

- **发生错误**：走 error boundary。

- **resolve 完成**：真正加载这个组件，重新渲染。

我们再看看Lazy内部是什么？

```jsx
function lazy(ctor) {
  return {
    $$typeof: REACT_LAZY_TYPE,
    _ctor: ctor,
    _status: -1,
    _result: null,
  };
}
```

`React.lazy`返回的对象，包含三个属性：

- `$$typeof`：标识这是一个 lazy 组件。

- `_ctor`：记录这个组件的 import() thenable。

- `_status` 和 `_result`：用于记录这个组件的加载状态和加载结果。

组件加载状态说明：

| 状态码 | 含义               |
|--------|--------------------|
| -1     | 未初始化（initial） |
| 0      | 正在加载中（pending） |
| 1      | 已加载完成（resolved） |
| 2      | 加载失败（rejected）  |

当这个组件首次被渲染时，React 会调用 _ctor() 开始加载模块，把 thenable 存到 _result，并挂起当前 Fiber 节点。

这里我写一段伪代码，来模拟 `React.lazy` 的行为：

```jsx
function lazyInitializer(payload) {
  if (payload._status === -1) {
    // 第一次初始化
    const ctor = payload._ctor;
    const thenable = ctor(); // 执行 import()
    payload._status = 0;     // 设置为 pending
    payload._result = thenable;

    thenable.then(
      module => {
        if (payload._status === 0) {
          payload._status = 1;              // 标记为 resolved
          payload._result = module.default; // 存储导出的组件
        }
      },
      error => {
        if (payload._status === 0) {
          payload._status = 2;
          payload._result = error;
        }
      }
    );
  }

  if (payload._status === 1) {
    return payload._result; // 返回真正的组件
  } else {
    throw payload._result;  // 抛出 thenable 或 Error
  }
}
```

## 二、Suspense 解析

先来看看`Suspense`都帮我们做了些什么？

- 当 lazy 加载的组件还没加载完成，会 **“挂起”当前的渲染流程（throw Promise）**。

- React 向上查找最近的 `Suspense 组件`，然后渲染它的 fallback。

- thenable resolve 后，重新触发渲染。


## 三、Suspense、lazy流程解析   

我们先梳理一下Suspense、lazy流程：

1、当 lazy 组件首次加载时，会调用 `lazyInitializer()`，如果组件还没加载完成，会（throw）抛出 thenable；  
2、此时 React 渲染流程会中断，会捕获到这个 `thenable`，此时会触发 `renderRootSuspend()` 流程，开始查找`Suspense边界`；   
3、其中会沿着 Fiber 向上查找最近的 `SuspenseBoundary`，根据 return链 直到找到 tag === 13 的节点，就是最近的 `<Suspense/>`，然后渲染它的 fallback；    
4、当 thenable resolve 后，React 会重新触发渲染，渲染真正的组件。

我参考`renderRootSuspend`的逻辑写了个`handleSuspension`，其伪代码如下：

```jsx
function handleSuspension(fiber, promise) {
  let parent = fiber.return;
  while (parent !== null) {
    if (isSuspenseComponent(parent)) {
      attachPromiseToSuspense(parent, promise);
      return;
    }
    parent = parent.return; // 向上查找
  }
  // 没找到 Suspense 边界，触发全局错误
}

const SuspenseComponent = 13;

function isSuspenseComponent(fiber) {
  return fiber.tag === SuspenseComponent;
}
```

到这里是不是会有疑问呐？

- thenable是什么，不应该是Promise吗？

- attachPromiseToSuspense这个函数是干嘛用的？

- 如果 Suspense 中有多个 lazy，React 是如何 批量 lazy 加载和调度 的？


### 1、thenable是什么，不应该是Promise吗？

React 在处理挂起逻辑时（比如 lazy()、use()、suspense cache）不强依赖标准的原生 Promise，它只关心是否有`.then() 方法`，React 就认为它是一个“可以被挂起等待”的对象 —— 这就叫 `thenable`。

在 `React.lazy` 里，thenable 就是 `() => import() `执行后返回的 Promise

为什么不是Promise呢， 是因为比如 **React Cache、Server Components** 可能用自定义对象，所以需要更宽泛、兼容性更强的 thenable。

### 2、attachPromiseToSuspense这个函数是干嘛用的？

`attachPromiseToSuspense`函数的作用是，把 thenable 挂载到 Suspense 组件的 Fiber 节点，用于后续的重新挂载和恢复操作。

这个函数的主要作用有两点：

**1. 将 thenable 加入 SuspenseFiber 的 wakeables 列表**

Suspense 边界上的fiber节点，内部的 memoizedState中 维护了一个集合（通常是 wakeables Set），用于记录有哪些 thenable 让它处于“挂起”状态。  
这样做的目的是：一旦thenable resolved，就可以知道是哪个 Suspense 正在等待它。

**2. 监听 thenable 的 .then 回调，重新调度组件更新**

```ts
suspenseFiber.memoizedState = {
  ...,
  wakeables: Set<Thenable>
}

thenable.then(() => {
  // 组件懒加载完成，Promise resolved
  // 重新调度该 suspense 组件渲染
  ......
  retrySuspenseBoundary(suspenseFiber);
});
```

**你可以把这看作是**：

“在 Suspense 上挂一个钩子，钩住所有让它挂起的 Promise，只要这些 Promise 中任何一个完成，就重新尝试渲染。”

### 3、如果 Suspense 中有多个 lazy，React 是如何 批量 lazy 加载和调度 的？

你可能有多个 lazy() 组件，比如：

```jsx
const LazyA = lazy(() => import('./A')); // tenable A
const LazyB = lazy(() => import('./B')); // tenable B

<Suspense fallback={<Loading />}>
  <LazyA />
  <LazyB />
</Suspense>
```

当这两个组件的模块都未加载完成，React 不会一个个单独处理，而是一次性挂起整个子树。

其**调度核心**就是 优先级 + 批处理， React 使用的是一个异步调度器 `Scheduler` + `Fiber work loop`。

```ts
// 在前面提到的这一代码块中，其中的retrySuspenseBoundary会重新被调度更新。
thenable.then(() => {
  retrySuspenseBoundary(suspenseFiber);
  // suspenseFiber 就是触发 suspend 的 Lazy 组件
});
```

> 总结一下：你用了多个懒加载子组件lazy() 同时挂起  
> 1.暂停当前执行的分支  
> 2.把所有 未 resolve 的 thenable 挂到同一个 `Suspense boundary` 上  
> 3.为这些 Promise 统一注册回调（batch retry）  
> 4.等待它们 resolve 后，整个 Suspense 边界重新进入调度渲染流程  

**不必担心会触发多次retry，每个thenable都注册.then()各自监听，但都指向相同的 suspenseFiber，retrySuspenseBoundary 最终触发同一个组件树的重新渲染，并且由调度器自动将多个 retry 合并执行（参考优先级/任务并发哈，这就是react中的一个内部优化。**

因此表现上就是：只会显示一次 fallback，然后所有懒加载组件一起加载完毕后一起展示。

## 面试大白话总结

**请讲一下你理解的Suspense&Lazy执行流程：**

1. react 在遍历节点时，会遇到 `lazy`懒加载组件，此时还没加载 `lazy` 中 `import 的组件`，所以会 `throw promise`，然后 `fiber` 会不断 return 根据 `tag === 13` 判断去找到最近的 `Suspense`，然后执行 `fallback`；

2. 然后等待 `lazy` 中组件加载，其内部有 `status状态`，以及 `result` 用来存储 `() => import(...)` 的执行结果。加载的过程中，因为还没加载完成，此时 status 会变成 0，直到加载以后 status 变为 1，加载完成，此时 return加载好的组件。  

3. 然后 `Promise resolve` 后，React 会通过 `attachPingListener` -> `retrySuspenseBoundary` -> `scheduleUpdateOnFiber()` 把挂起的组件重新加入到调度队列中，然后由调度器（`React Scheduler`）根据优先级和空闲时间 异步地 重新执行渲染流程。