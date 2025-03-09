# React 运行机制

我将以从 URL 输入到页面状态更新过程中，React 底层发生的整个流程，来理解框架的运行机制与渲染流程。

## 1. 初始化加载（Mounting 阶段）

### 1、浏览器加载 HTML 与 JavaScript：

当用户在地址栏中输入 URL 并访问页面时，浏览器会加载 HTML 文件，该文件中包含了挂载 React 应用的容器以及引入的 React 相关的 JavaScript 代码（通常是打包后的 bundle）。

### 2、React 初始化与根 Fiber 创建：

React 在启动时，会为根组件创建一个 Fiber 节点。此时，React 会遍历组件树，根据组件的返回值构建出一个虚拟 DOM（Virtual DOM）的抽象表示，并同时生成对应的 Fiber 树。这棵 Fiber 树包含了组件的状态、属性、子组件信息以及副作用等信息。

### 3、初次 Reconciliation 与 Commit 阶段：

- **Reconciliation 阶段：** React 会根据虚拟 DOM 和 Fiber 树构建出当前的渲染树，此时所有组件的初始状态都已确定。
- **Commit 阶段：** 在这一阶段，React 会将 Fiber 树中记录的变化（对于初次渲染，就是整个树）转化为真实 DOM 元素，并挂载到页面的根容器中。

此时，用户看到的就是页面的初始渲染结果，也就是“当前树”（Current Tree）。

## 2. 用户操作触发状态更新

假设页面上有一个按钮，用户点击后触发了状态更新（例如调用了 setState 或者使用 Hooks 更新状态）。

### 1、事件触发与状态更新：

当用户点击按钮时，React 的合成事件系统捕获到该事件，然后调用相应的事件处理函数。在该函数中，调用 setState 或 Hooks 更新状态的函数，这会创建一个更新任务。

### 2、调度更新任务：

React 调度器根据当前任务的优先级（例如用户交互属于高优先级任务），将这个状态更新任务排入任务队列。由于更新任务通常不是同步执行的，React 会开始构建新的更新。

## 3. 更新过程（Reconciliation 与 Commit）

### 1、创建 Work-in-Progress 树：

- **Current Tree 与 Work-in-Progress Tree：** React 内部维护两棵树，一棵是当前已经提交的 Fiber 树（Current Tree），另一棵是正在构建的新 Fiber 树（Work-in-Progress Tree），两者之间通过每个 Fiber 节点的 alternate 属性相互关联。
- 当状态更新触发时，React 会基于当前树创建一棵新的 Work-in-Progress 树，用于存放本次更新的结果。

### 2、Diff 过程（Reconciliation）：

- React 通过比较新旧 虚拟 dom 对应节点（利用 Diff 算法），来找出哪些部分发生了变化。
- 在这个过程中，React 会标记出需要更新的节点，并生成一个“副作用列表”（Effect List），记录所有将要在 Commit 阶段应用的 DOM 变更。

### 3、Fiber 架构与时间切片：

- 任务拆分： Fiber 架构将整个更新任务拆分为一个个小的任务单元（Fiber 单元），可以在多个时间片中完成。
- 可中断执行： 如果在执行过程中检测到高优先级任务（如新的用户输入）到来，React 会暂停当前的更新任务，保存当前进度，然后稍后继续执行（这就保证了即使是大量更新也不会长时间阻塞主线程）。执行后的结果会应用到我们的 workInProgress Tree 上，来保存我们更新的结果。

### 4、Commit 阶段：

- 一旦 Work-in-Progress 树构建完成，并且所有差异都被确定，React 会进入 Commit 阶段。
- 在 Commit 阶段，React 会根据副作用列表把更新应用到真实 DOM 上，例如更新文本内容、属性变更、插入或删除节点等。
- 此时，新的 UI 状态呈现在用户眼前，Work-in-Progress 树正式替换当前树，成为新的 Current Tree。

## 4. 更新过程的整体流程总结

- **初始加载阶段：**
  浏览器加载 HTML 与 JS → React 创建根 Fiber 节点 → 构建初始虚拟 DOM 和 Fiber 树 → 进入 Commit 阶段，将真实 DOM 渲染到页面上 → 当前树构建完毕。

- **状态更新过程：**
  用户操作触发事件 → 调用 setState / Hooks 更新状态 → React 调度器将更新任务入队 → 基于当前树创建 Work-in-Progress 树 → 执行 Diff 过程（Reconciliation 协调阶段）生成副作用列表 → 任务可能通过时间切片分多次执行（支持中断与恢复） → 进入 Commit 阶段，将需要变更的项 应用到真实 DOM 上 → Work-in-Progress 树成为新的 Current Tree。

## 5. 相关概念的补充说明

- **合成事件系统：**
  React 通过合成事件封装原生事件，利用事件委托机制将事件绑定到根节点，统一处理跨浏览器兼容性问题。
  事件对象经过池化处理，降低内存分配成本。

- **虚拟 DOM 与 Fiber：**
  虚拟 DOM 为 React 提供了高效的树结构抽象，Diff 算法对比前后状态；而 Fiber 架构则细化了渲染过程，使其支持中断、调度与恢复，进一步提升响应性和用户体验。

- **Current Tree 与 Work-in-Progress Tree：**
  这种双树机制允许 React 在更新过程中始终保留当前已渲染的 UI，同时在后台构建新的更新，避免了不必要的重绘和性能损耗。

- **副作用链（Effect List）：**
  在 Reconciliation 过程中，React 会收集所有需要在 Commit 阶段执行的副作用（比如 DOM 更新、生命周期方法调用等），这使得更新过程更具可控性和一致性。

- **时间切片与调度器：**
  通过任务拆分和时间切片，React 能够灵活安排长任务，使得高优先级任务（如用户输入）能够及时得到响应，从而保证应用整体的流畅性。
