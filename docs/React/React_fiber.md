# React Fiber

React Fiber 是 React 中绝对核心的一部分。Fiber 是 React 为了解决同步递归的局限，引入的一种可中断、可恢复、具优先级、链式遍历的虚拟 DOM 架构，有效支撑了并发特性、Suspense、Time Slicing等等能力。

接下来我将从以下几个方面来介绍 React Fiber：

- Fiber 架构的诞生背景
- Fiber 节点结构详解
- Fiber 的工作阶段（生命周期）
- Fiber 的时间切片调度机制
- 异步渲染与挂起机制（Suspense 支持）

## 一、Fiber 架构的诞生背景

### 1、React Stack 架构的局限性

React 在 16 以前的版本使用的是递归调用的 Stack Reconciler 架构。虽然写法简洁，但存在几个核心缺点：

**1.同步递归渲染，阻塞主线程**

```jsx
<App>
  <Header />
  <Main>
    <Article />
    <Comments />
  </Main>
</App>
```

当 App 更新时，React 会深度递归遍历所有子组件进行比较、生成新的 Virtual DOM。这个过程是同步进行的，一旦开始就不能中断。

如果组件树非常深、逻辑复杂（如列表+异步加载），会长时间阻塞主线程，使得用户无法滑动、点击，造成卡顿。

**2.无法中断 / 恢复 / 调度更新**

由于递归无法中断，React 也无法中途判断是否该先处理高优先级任务（如用户点击），也无法中止更新再恢复。这严重限制了性能优化。

**3.对异步渲染支持差**

比如一个懒加载组件 `<LazyComponent />`，如果需要异步加载模块（通过 import()），React 无法自然地暂停和等待该模块加载完成，只能重新触发更新。

### 2、Fiber 的目标和解决方案

React 团队提出 Fiber 架构，用来彻底重写协调（reconciliation）机制。

**Fiber 的目标：**

1. **可中断**：将更新过程拆成小任务（单个 Fiber 单元），可以中途中断，让出主线程；

2. **可恢复**：更新中断后可以从中断点继续；

3. **可调度**：根据任务的优先级，决定先更新谁；

4. **支持异步**：自然支持 `Suspense` / `Lazy` 等异步组件加载。

**核心做法：**

- 将每个虚拟 DOM 节点转换成 Fiber 节点（FiberNode）；

- 手动构建更新链表结构，模拟递归流程；

- 利用浏览器空闲时间（`requestIdleCallback` / Scheduler）执行任务片段；

- 遇到 `Suspense` 可以 “挂起”，后续恢复。

### 三、Fiber 的引入历程

| React 版本 | 核心特性                    | 架构底层              |
| -------- | ----------------------- | ----------------- |
| React 15 | 同步递归渲染                  | Stack             |
| React 16 | Fiber 引入，支持异步渲染         | Fiber             |
| React 17 | 无新特性，主要做升级过渡            | Fiber             |
| React 18 | 并发渲染默认启用、自动批处理、Suspense | Fiber + Scheduler |

> Fiber 是为了让 React 的更新流程“可控”，不再是同步不可中断的黑盒。它通过链表结构重构了协调流程，允许中断、恢复、调度与异步，支撑起并发模式、Suspense、Lazy 等高级能力。是 React 架构最关键的演进之一。

## 二、Fiber 节点结构详解

### 1、Fiber 是什么？

> Fiber 是 React 用于表示组件节点的 **数据结构**，也是 React 重新设计协调过程（Reconciliation）的 **核心单元**。

每个组件元素（无论是 DOM、函数组件、Class 组件）在 React 中都会对应一个 **Fiber 节点**（FiberNode）。这使得 React 可以用链表的方式处理组件树的遍历、构建和更新，而不是原来的递归调用。

Fiber 并不是新的虚拟 DOM，而是虚拟 DOM 的增强体。

### 2、FiberNode 的结构

Fiber 是一个 JS 对象，定义在 ReactInternalTypes.js 中。其核心结构如下（简化版）：

```ts
type Fiber = {
  tag: WorkTag;                // 节点类型，如 FunctionComponent、HostComponent 等
  key: null | string;          // key 属性，用于 diff
  elementType: any;            // JSX 类型
  type: any;                   // 对应的组件函数或类或字符串(div)
  stateNode: any;              // 保存对应真实 DOM 或 class 实例

  return: Fiber | null;        // 指向父节点
  child: Fiber | null;         // 指向第一个子节点
  sibling: Fiber | null;       // 指向兄弟节点
  alternate: Fiber | null;     // 上一次更新的 Fiber（双缓冲机制）

  pendingProps: any;           // 新传入的 props
  memoizedProps: any;          // 上次渲染使用的 props
  memoizedState: any;          // 状态（useState/useReducer 保存的数据）
  
  updateQueue: any;            // 更新队列（如 setState/useState）
  flags: Flags;                // 本次更新的副作用标记
  subtreeFlags: Flags;         // 子树的副作用标记
  ...                          // 其他属性
};
```

通过这种数据结构，React 可以：

- **模拟递归流程**（通过 child/sibling/return 指针）；

- **中断更新**（保存遍历状态）；

- **复用 Fiber**（alternate 指向旧 Fiber）；

- **标记需要更新的内容**（flags 标记副作用）。

### 3、双缓冲机制：current / workInProgress

React Fiber 中有两个树结构：

| 名称               | 含义              |
| ---------------- | --------------- |
| `current`        | 当前正在使用的 Fiber 树 |
| `workInProgress` | 本次更新构建的 Fiber 树 |

当 React 更新组件树时：

1. 复制一份 current → workInProgress；

2. 在 workInProgress 上构建新的子树（调和）；

3. 完成后将 workInProgress 提交（commit）；

4. 交替使用，两者互换。

这种机制称为**双缓冲（Double Buffering）**，用来支持中断和恢复。

### 4、tag类型（WorkTag）

Fiber 中的 `tag` 字段表示节点类型，它对应了不同的组件种类：

```ts
export const FunctionComponent = 0;  // 函数组件
export const ClassComponent = 1;     // 类组件
export const HostRoot = 3;           // ReactDOM.render 的根节点
export const HostComponent = 5;      // HTML 原生标签，例如 <div>
export const HostText = 6;           // 文本节点
export const SuspenseComponent = 13; // Suspense 组件
export const LazyComponent = 16;     // Lazy 组件
```

不同的 `tag` 会影响 `beginWork` 和 `completeWork` 阶段的处理逻辑。

### 5、Fiber 树结构示意图

假设我们有这样一棵组件树：

```jsx
<App>
  <Header />
  <Main>
    <Article />
    <Comments />
  </Main>
</App>
```

构建出的 Fiber 树大致如下：

```js
// 层级嵌套
App (HostRoot)
 └──Header (FunctionComponent)
 └── Main (FunctionComponent)
     └── Article (FunctionComponent)
     └── Comments (FunctionComponent)
```

通过 `child`, `sibling`, `return` 指针，React 用链表而不是递归的方式来遍历这棵树。

> Fiber 是 React 中表示组件单元的核心数据结构，它包含了组件的类型、状态、更新、副作用等信息，并通过链式结构实现可控的更新流程。Fiber 使得 React 能够支持中断、恢复、并发和异步渲染，支撑起后续诸如 Lazy、Suspense、时间切片、优先级调度等能力。

## 三、Fiber 的工作阶段（生命周期）

> 剖析 React 渲染的核心流程：从任务调度到 Fiber 构建，再到提交 DOM 更新，这样可以更好的了解 React 是如何逐步完成一次组件更新的。

### 1、Fiber 的工作阶段概览

React 的渲染流程被拆分为以下三大阶段：

| 阶段名          | 对应方法                       | 作用说明                      |
| ------------ | -------------------------- | ------------------------- |
| 调度阶段         | `scheduleUpdateOnFiber`    | 收集更新任务，调度优先级，触发渲染流程       |
| 渲染阶段（Render） | `beginWork→completeWork` | 构建 Fiber 树，生成更新计划，可中断     |
| 提交阶段（Commit） | `commitRoot`               | 一次性应用所有更新到 DOM，执行副作用，不能中断 |

其中，**渲染阶段是可中断的**，Fiber 在这个阶段体现出其强大的可恢复、可暂停特性；而提交阶段必须一次性完成。

### 2、渲染阶段的工作流程

> 为了理解连贯，我们讲调度阶段并入渲染阶段来说

1. **入口函数**：`scheduleUpdateOnFiber`

当你调用 `setState` 或 `useState` 的 `setXxx()`，React 会调用：

```js
scheduleUpdateOnFiber(fiber, lane, eventTime);
```

这一步做了三件事：

- 标记本次更新的 Fiber 所属优先级（lane）；

- 找到 Fiber 的根节点；

- 将其放入调度队列，交由 `ensureRootIsScheduled` 执行异步调度。

**2. 异步调度与任务执行**

调度器会在浏览器空闲时间内调用：

```js
workLoopConcurrent()
```

这是一个循环方法，会一直调用：

```js
performUnitOfWork(fiber)
```

每次执行一个 Fiber 节点，先执行 beginWork：

```ts
function performUnitOfWork(unitOfWork) {
  const next = beginWork(unitOfWork); // 处理当前 Fiber
  if (next) {
    return next; // 继续处理子节点
  } else {
    completeUnitOfWork(unitOfWork); // 没有子节点，转向 sibling
  }
}
```

::: tip 提示：
`completeUnitOfWork` 和 `completeWork` 不是一个函数，但 `completeUnitOfWork` 中调用了 `completeWork`，去生成DOM并收集副作用。
:::

**3. beginWork 构建子树**

这个阶段的作用：

- 比较 `pendingProps` 和 `memoizedProps`；

- 判断是否需要更新；

- 根据 JSX 返回值创建子 Fiber 节点；

- 设置子节点的 child 指针。

不同组件类型的处理逻辑由 `Fiber.tag` 决定，比如：

```ts
switch (fiber.tag) {
  case FunctionComponent:
    return updateFunctionComponent(...);
  case HostComponent:
    return updateHostComponent(...);
}
```

**4. completeWork 收尾操作**

`completeWork` 在子节点构建完成后回溯触发：

为 `HostComponent` 创建 DOM；

将子节点的 DOM 拼接到当前 DOM 上；

收集副作用（flags）以供 commit 使用。

最终在整个 Fiber 树构建完毕后，React 会进入 commit 阶段。

### 3、提交阶段的操作流程

提交阶段入口为：

```ts
commitRoot(root);
```

这一步不可中断，一气呵成：

1. `beforeMutation`阶段：执行`commitBeforeMutationEffects()`

作用：触发 `getSnapshotBeforeUpdate`，处理一些视觉前同步任务收集 DOM 变更前的状态（比如 Scroll）

2. `mutation`阶段：执行`commitMutationEffects()`  **真正操作DOM的阶段**

作用：挂载/更新/卸载 DOM 节点，更新 class/style 等属性，插入、移动真实 DOM 节点

   - `appendChild`, `insertBefore`, `removeChild`, `updateProps`

3. `layout`阶段：执行`commitLayoutEffects()`

作用：执行 `useLayoutEffect` 回调、调用 `ref.current = DOMNode`;

### 4、工作阶段流程图

```md
    setState/useState
          ↓
  scheduleUpdateOnFiber       
          ↓             
  workLoopConcurrent    
          ↓
  performUnitOfWork(fiber)
          ↓
    beginWork(fiber)
          ↓
    构建子 Fiber 节点
          ↓
  completeUnitOfWork
          ↓
    回溯、收集副作用
          ↓
      commitRoot
          ↓
    应用所有 DOM 更新
```

> React 的 Fiber 协调机制是一个三阶段的完整流程：调度 → 构建 → 提交。渲染阶段是可中断的，允许在用户操作频繁时让出主线程，而提交阶段保证一致性，是不可中断的。Fiber 架构的核心价值正体现在这一灵活调度的中间阶段，它构建的是一棵“可暂停的更新计划树”。

## 四、Fiber 的时间切片调度机制

### 1、为什么需要时间切片调度？

在 React 15 之前，更新是同步执行的：

- 一旦开始更新，直到整棵组件树重新渲染完毕，主线程都无法响应用户输入；

- 在复杂页面或低性能设备上，会出现卡顿、掉帧等问题；

- 浏览器通常每 16.6ms（60fps）渲染一次，如果任务过长，用户体验受损。

**时间切片调度机制的目标：**   

⭐️ 允许 React 将渲染工作分成多个小任务，在浏览器空闲时执行，避免长时间占用主线程。

### 2、调度流程概览

React Fiber 的调度阶段，核心流程可分为以下几个步骤：

1. **scheduleUpdateOnFiber**
2. **ensureRootIsScheduled**
3. **scheduleCallback（来自 scheduler）**
4. **performConcurrentWorkOnRoot**
5. **renderRootConcurrent（开始构建 Fiber 树）**

- 每当触发更新（如 setState），就从 `scheduleUpdateOnFiber` 开始；

- 在调度阶段调用 `scheduleCallback`，将任务加入调度队列；

- 最终进入 `performConcurrentWorkOnRoot`，开启分片构建任务。

### 3、时间切片调度的核心（Scheduler 调度器）

React 内部使用一个独立的调度器模块 scheduler，模拟 requestIdleCallback 提供的空闲调度能力。调度器通过以下几个 API 协调任务执行：  

| API                                    | 功能                 |
| -------------------------------------- | ------------------ |
| `scheduleCallback(priority, callback)` | 将任务按优先级加入调度队列      |
| `shouldYield()`                        | 判断当前是否要让出控制权（时间到了） |
| `performWorkUntilDeadline`             | 一轮任务执行入口           |
| `cancelCallback(task)`                 | 取消任务               |

在执行任务的过程中，React 会不断调用 shouldYield() 检查时间片是否耗尽，如果超时就中断当前任务。

### 4、优先级机制（Lane）

Fiber 中通过 **Lane 模型** 表示任务的优先级：

```ts
// Lane 是一个 31 位的 bit 表，每一位表示一个优先级通道
type Lane = number;
```

**常见 Lane 类型（简化）**

| Lane 名称             | 含义                | 优先级  |
| ---------------------| ----------------- | ---- |
| SyncLane            | 同步更新              | 最高   |
| InputContinuousLane | 输入中更新（如 onChange） | 中等   |
| DefaultLane         | 默认更新（setState）    | 中等偏低 |
| IdleLane            | 空闲任务              | 最低   |

当有多个任务在排队时，React 会先处理优先级高的任务。

**Lane 的调度流转：**

1. Fiber 上的 update 被标记为某个 lane；

2. Root fiber 收集所有待处理的 lanes；

3. 调度器根据优先级选择其中最高的；

4. 分配任务、调度执行、commit、清除 lane。

### 5、工作循环流程详解（中断与恢复）

> 因 [《React并发模式》](./React并发模式.md) 的文章已详细描述，所以这里不展开讲了。

## 五、异步渲染与挂起机制（Suspense 支持）

> 因 [《React_Suspense&Lazy》](./React_Suspense&Lazy.md) 的文章已详细讲解了Suspense&Lazy，所以这里就提一些Fiber