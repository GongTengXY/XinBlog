# React 并发模式（Concurrent Mode）

在传统的同步渲染模式下，React 会一次性处理整个组件树的更新，这意味着如果某个渲染任务耗时较长（例如大规模数据更新或复杂计算），主线程会一直被占用，直到所有任务完成。**这会导致页面在此期间无法响应用户的输入、点击等操作，造成明显的卡顿与延迟。**  
例如，当你在输入框中输入内容时，如果同时触发了大量同步渲染任务，浏览器可能无法及时响应输入事件，导致用户体验不佳。

React 并发模式正是为了解决这一问题而设计的，它将渲染任务拆分为多个小任务，允许在任务执行过程中插入更高优先级的操作，从而保证用户输入和交互的流畅性。

## 1. React 并发模式的核心概念

- **可中断渲染**：渲染任务被拆分成多个小任务（时间切片），可以在合适时机暂停、恢复或取消。
- **自动批处理与优先级调度**：内部调度器根据任务优先级动态安排任务执行，确保用户交互始终获得最高响应。
- **低优先级 API**：如 `useTransition` 与 `useDeferredValue`，允许开发者主动将某些更新标记为低优先级，从而不会阻塞高优先级的用户操作。

## 2. 并发模式如何工作

### 2.1 时间切片（Time Slicing）

**时间切片** 的思想是将大任务拆分成多个小任务，每个小任务的执行时间被限制在一定范围内。这样，在每个时间片结束后，浏览器都有机会处理其他任务，从而保证整体响应性。

核心原理：利用浏览器提供的空闲时间（通过 requestIdleCallback 或内部封装的 API）来决定是否继续执行当前任务。
实现要点：React 内部会不断检查剩余执行时间，通过 deadline.timeRemaining() 判断当前帧是否还有足够时间。
**示例代码：**

```js
// workLoop：负责执行渲染任务的小块
function workLoop(deadline) {
  // 当当前帧还有剩余时间，并且任务队列不为空时，继续执行
  while (deadline.timeRemaining() > 0 && workQueue.length > 0) {
    performUnitOfWork(); // 执行一个单元任务
  }
  // 如果时间不足，或者任务队列已空，则利用 requestIdleCallback 安排下次执行
  requestIdleCallback(workLoop);
}

// 开始任务调度
requestIdleCallback(workLoop);
```

> **注释说明：**
>
> - deadline.timeRemaining() 返回当前帧剩余的毫秒数。如果返回值很低，说明必须暂停以便浏览器有时间处理其他任务。
> - 通过将大任务分割为多个小任务，React 就能在两个小任务之间插入高优先级任务，确保用户交互不会被阻塞。

### 2.2 任务调度（Scheduling）

React 内部通过调度器（Scheduler）来管理任务执行顺序，确保高优先级任务（如用户输入、动画）能够即时响应，而低优先级任务则延后处理。

**主要调度工具：**

- `requestIdleCallback`
  利用浏览器空闲时间执行任务。尽管它的兼容性不是非常完美，但 React 对其做了封装，确保调度逻辑正常工作。

- `内部 Scheduler API`
  React 使用 unstable_scheduleCallback 来调度任务，并为任务分配不同的优先级。示例代码如下：

```js
import { unstable_scheduleCallback, unstable_NormalPriority } from "scheduler";

// 调度一个低优先级任务
unstable_scheduleCallback(unstable_NormalPriority, () => {
  console.log("执行低优先级任务");
});
```

> **注释说明：**
>
> - Scheduler 会根据任务的类型和优先级动态调整任务队列顺序。如果有紧急任务到来，当前任务会暂停或被重新调度。
> - 这种调度机制保证了即使在大量数据更新或复杂计算的场景下，也能保持 UI 的响应性。

## 3. React 如何暂停与恢复任务

在并发模式中，React 必须不断检测是否需要暂停当前任务，以及在适当的时候恢复任务。

### 3.1 暂停任务

React 通过内部的 shouldYield() 方法判断是否应当暂停当前任务。其基本逻辑为：

如果当前帧剩余时间不足，或者检测到有更高优先级的任务在等待处理，则返回 true，从而让当前任务暂停。
完整代码示例：

```js
function shouldYield() {
  // 这里模拟判断逻辑，真实实现会更复杂，涉及优先级和时间检测
  return performance.now() % 16 < 1; // 简化示例：若当前毫秒数取余后小于1则暂停
}

function performUnitOfWork() {
  console.log("执行一个渲染单元");
  if (shouldYield()) {
    // 如果 shouldYield() 返回 true，则暂停任务
    console.log("暂停渲染，等待空闲时间...");
    return;
  }
  // 否则，继续执行下一个渲染任务单元
}
```

> **注释说明：**
>
> - shouldYield() 内部会检测 deadline.timeRemaining()（在真实的调度器中）以及任务队列状态。
> - 当暂停时，当前任务的进度会被保存，下次恢复时能从中断的位置继续执行。

### 3.2 恢复任务

被暂停的任务将在浏览器空闲时通过 requestIdleCallback 恢复执行。React 调度器会从上一次暂停的位置继续执行任务单元。

完整代码示例：

```js
function resumeWork() {
  // 使用 requestIdleCallback 在浏览器空闲时恢复任务
  requestIdleCallback((deadline) => {
    // 只要有足够时间就继续执行任务
    while (deadline.timeRemaining() > 0 && workQueue.length > 0) {
      performUnitOfWork();
    }
    // 如果任务尚未完成，继续安排下一次恢复
    requestIdleCallback(resumeWork);
  });
}

// 启动任务恢复机制
resumeWork();
```

> **注释说明：**
>
> - resumeWork 方法不断调用 requestIdleCallback，使得任务可以在未来的空闲时间片段中得以继续。
> - 当高优先级任务不再阻塞时，暂停的任务便能顺利恢复执行，最终完成整个渲染过程。

## 4. 并发模式中的低优先级 API

React 提供了几个 API 来帮助开发者明确指定低优先级更新，从而避免高优先级任务被阻塞。

### 4.1 useTransition

**useTransition** 允许你将某些状态更新标记为低优先级任务，从而在这些更新进行时，React 会优先响应其他高优先级任务（如用户输入）。

示例代码：

```jsx
import { useState, useTransition } from "react";

function App() {
  const [isPending, startTransition] = useTransition();
  const [count, setCount] = useState(0);

  // 点击按钮时，将状态更新标记为低优先级任务
  const handleClick = () => {
    startTransition(() => {
      setCount((prevCount) => prevCount + 1);
    });
  };

  return (
    <div>
      <button
        onClick={handleClick}
        disabled={isPending}
      >
        Count: {count}
      </button>
      {isPending && <p>更新中...</p>}
    </div>
  );
}
```

### 4.2 useDeferredValue

**useDeferredValue** 允许你将某些计算密集型或更新频繁的值延迟到空闲时计算，从而降低对主渲染流程的干扰。

示例代码：

```jsx
import { useState, useDeferredValue } from "react";

function SearchResults({ results }) {
  // 假设 results 是需要经过复杂计算的列表
  const deferredResults = useDeferredValue(results);
  return (
    <ul>
      {deferredResults.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
```

## 5. 并发模式的优势与实际应用

通过时间切片和调度机制，React 并发模式实现了以下优势：

- **防止 UI 卡顿**：长任务被拆分为多个小任务，保证用户输入和动画得到及时响应。
- **提高渲染效率**：调度器根据任务优先级动态安排任务顺序，减少了不必要的重复渲染。
- **流畅的用户体验**：即使在大量数据更新场景下，页面也能保持高响应性和流畅性。

在实际开发中，对于渲染复杂列表、大量数据更新或动画效果场景，合理利用 useTransition 与 useDeferredValue 可以显著提升应用性能与用户体验。

## 6. 总结

React 并发模式通过时间切片和任务调度机制，实现了可中断、可恢复的渲染过程。其核心在于将大任务拆分为小任务，利用浏览器空闲时间恢复执行，确保高优先级任务（如用户输入）始终得到快速响应。同时，React 提供的 useTransition 与 useDeferredValue API 让开发者能够主动控制更新优先级，从而在实际项目中获得更流畅的交互体验。

### 知识链路总结：

- **同步渲染的问题**：长任务会阻塞主线程，导致用户输入响应缓慢。
- **时间切片**：将任务分解成小块，利用 deadline.timeRemaining() 判断是否继续执行。
- **任务调度**：内部调度器根据优先级安排任务执行，并通过 requestIdleCallback 恢复暂停任务。
- **低优先级 API**：useTransition 与 useDeferredValue 帮助开发者主动控制任务优先级，确保用户交互不受影响。
