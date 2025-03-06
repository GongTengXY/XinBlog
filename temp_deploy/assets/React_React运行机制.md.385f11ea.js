import{_ as s,o as l,c as n,a}from"./app.2305f01b.js";const D=JSON.parse('{"title":"React 的运行机制","description":"","frontmatter":{},"headers":[{"level":2,"title":"1. 初始加载与挂载（Mounting 阶段）","slug":"_1-初始加载与挂载-mounting-阶段","link":"#_1-初始加载与挂载-mounting-阶段","children":[{"level":3,"title":"1.1 浏览器加载","slug":"_1-1-浏览器加载","link":"#_1-1-浏览器加载","children":[]},{"level":3,"title":"1.2 React 初始化","slug":"_1-2-react-初始化","link":"#_1-2-react-初始化","children":[]},{"level":3,"title":"1.3 首次 Reconciliation 与 Commit","slug":"_1-3-首次-reconciliation-与-commit","link":"#_1-3-首次-reconciliation-与-commit","children":[]}]},{"level":2,"title":"2. 用户交互与状态更新","slug":"_2-用户交互与状态更新","link":"#_2-用户交互与状态更新","children":[{"level":3,"title":"2.1 用户操作触发更新","slug":"_2-1-用户操作触发更新","link":"#_2-1-用户操作触发更新","children":[]},{"level":3,"title":"2.2 调度更新任务","slug":"_2-2-调度更新任务","link":"#_2-2-调度更新任务","children":[]}]},{"level":2,"title":"3. 更新过程详解","slug":"_3-更新过程详解","link":"#_3-更新过程详解","children":[{"level":3,"title":"3.1 双树结构：Current Tree 与 WorkInProgress Tree","slug":"_3-1-双树结构-current-tree-与-workinprogress-tree","link":"#_3-1-双树结构-current-tree-与-workinprogress-tree","children":[]},{"level":3,"title":"3.2 Diff 算法与 Reconciliation","slug":"_3-2-diff-算法与-reconciliation","link":"#_3-2-diff-算法与-reconciliation","children":[]},{"level":3,"title":"3.3 Fiber 架构与时间切片","slug":"_3-3-fiber-架构与时间切片","link":"#_3-3-fiber-架构与时间切片","children":[]},{"level":3,"title":"3.4 Commit 阶段","slug":"_3-4-commit-阶段","link":"#_3-4-commit-阶段","children":[]}]},{"level":2,"title":"4. 其他关键概念","slug":"_4-其他关键概念","link":"#_4-其他关键概念","children":[{"level":3,"title":"4.1 虚拟 DOM","slug":"_4-1-虚拟-dom","link":"#_4-1-虚拟-dom","children":[]},{"level":3,"title":"4.2 Hooks 与状态管理","slug":"_4-2-hooks-与状态管理","link":"#_4-2-hooks-与状态管理","children":[]},{"level":3,"title":"4.3 合成事件系统","slug":"_4-3-合成事件系统","link":"#_4-3-合成事件系统","children":[]},{"level":3,"title":"4.4 批处理与调度器","slug":"_4-4-批处理与调度器","link":"#_4-4-批处理与调度器","children":[]}]},{"level":2,"title":"5. 总结","slug":"_5-总结","link":"#_5-总结","children":[]}],"relativePath":"React/React运行机制.md","lastUpdated":null}'),e={name:"React/React运行机制.md"},o=a(`<h1 id="react-的运行机制" tabindex="-1">React 的运行机制 <a class="header-anchor" href="#react-的运行机制" aria-hidden="true">#</a></h1><p>React 是目前最流行的前端库之一，其高效渲染和优异的用户体验源自于多层次的底层设计。我将从多个方面介绍 React 的运行机制，从最初加载页面到用户交互引发状态更新，再到最终更新 DOM 的整个过程，同时解析<strong>虚拟 DOM</strong>、<strong>Fiber 架构</strong>、<strong>Current Tree</strong> 与 <strong>WorkInProgress Tree</strong>、以及更新流程中的关键技术细节。</p><h2 id="_1-初始加载与挂载-mounting-阶段" tabindex="-1">1. 初始加载与挂载（Mounting 阶段） <a class="header-anchor" href="#_1-初始加载与挂载-mounting-阶段" aria-hidden="true">#</a></h2><h3 id="_1-1-浏览器加载" tabindex="-1">1.1 浏览器加载 <a class="header-anchor" href="#_1-1-浏览器加载" aria-hidden="true">#</a></h3><ul><li>用户在地址栏输入 URL 后，浏览器加载 HTML 文件和 JavaScript Bundle。</li><li>HTML 中包含 React 挂载的容器（如 <code>&lt;div id=&quot;root&quot;&gt;&lt;/div&gt;</code>）。</li></ul><h3 id="_1-2-react-初始化" tabindex="-1">1.2 React 初始化 <a class="header-anchor" href="#_1-2-react-初始化" aria-hidden="true">#</a></h3><ul><li>React 启动时，为根组件创建一个 Fiber 节点，生成整个组件树的虚拟 DOM 表示。</li><li><strong>虚拟 DOM</strong>：React 用 JavaScript 对象描述 UI 结构，降低了直接操作真实 DOM 的代价。</li></ul><h3 id="_1-3-首次-reconciliation-与-commit" tabindex="-1">1.3 首次 Reconciliation 与 Commit <a class="header-anchor" href="#_1-3-首次-reconciliation-与-commit" aria-hidden="true">#</a></h3><ul><li><strong>Reconciliation 阶段</strong>：React 根据组件返回的虚拟 DOM 构建 Fiber 树，并记录初始状态。</li><li><strong>Commit 阶段</strong>：将 Fiber 树转换为真实 DOM 元素并挂载到页面上，形成当前的 UI（称为 Current Tree，也叫当前树）。</li></ul><h2 id="_2-用户交互与状态更新" tabindex="-1">2. 用户交互与状态更新 <a class="header-anchor" href="#_2-用户交互与状态更新" aria-hidden="true">#</a></h2><h3 id="_2-1-用户操作触发更新" tabindex="-1">2.1 用户操作触发更新 <a class="header-anchor" href="#_2-1-用户操作触发更新" aria-hidden="true">#</a></h3><ul><li>页面上的交互（例如按钮点击）会触发事件，由 React 的合成事件系统捕获。</li><li>事件处理函数中调用 <code>setState</code> 或 Hooks 更新状态，从而创建更新任务。</li></ul><h3 id="_2-2-调度更新任务" tabindex="-1">2.2 调度更新任务 <a class="header-anchor" href="#_2-2-调度更新任务" aria-hidden="true">#</a></h3><ul><li>React 调度器根据任务优先级（例如用户输入为高优先级）将更新任务入队。</li><li>更新任务不会立即同步执行，而是进入调度队列等待处理。</li></ul><h2 id="_3-更新过程详解" tabindex="-1">3. 更新过程详解 <a class="header-anchor" href="#_3-更新过程详解" aria-hidden="true">#</a></h2><h3 id="_3-1-双树结构-current-tree-与-workinprogress-tree" tabindex="-1">3.1 双树结构：Current Tree 与 WorkInProgress Tree <a class="header-anchor" href="#_3-1-双树结构-current-tree-与-workinprogress-tree" aria-hidden="true">#</a></h3><ul><li><strong>Current Tree</strong>：当前已经渲染在屏幕上的 Fiber 树。</li><li><strong>WorkInProgress Tree</strong>：基于当前树构建的新 Fiber 树，用于存放本次更新的中间状态。</li><li>每个 Fiber 节点通过 <code>alternate</code> 属性关联当前树和工作树，实现双缓存机制。</li></ul><h3 id="_3-2-diff-算法与-reconciliation" tabindex="-1">3.2 Diff 算法与 Reconciliation <a class="header-anchor" href="#_3-2-diff-算法与-reconciliation" aria-hidden="true">#</a></h3><ul><li>React 利用 Diff 算法比较新旧虚拟 DOM（以及 Fiber 节点）的差异，精确定位需要更新的部分。</li><li>在 Reconciliation 过程中，React 收集副作用（Effect List），记录哪些节点需要更新、插入或删除。</li></ul><h3 id="_3-3-fiber-架构与时间切片" tabindex="-1">3.3 Fiber 架构与时间切片 <a class="header-anchor" href="#_3-3-fiber-架构与时间切片" aria-hidden="true">#</a></h3><ul><li><strong>Fiber 架构</strong>：将渲染任务拆分为多个小的工作单元（Fiber），支持中断与恢复。</li><li><strong>时间切片</strong>：通过将长任务拆分成多个小任务，使得渲染过程可以在浏览器空闲时继续执行，避免主线程长时间被占用。</li><li><strong>任务调度</strong>：内部调度器（Scheduler）利用 <code>requestIdleCallback</code>（react 内部根据该 API 的思想自己实现，这里代指一下） 或 Scheduler API 动态安排任务优先级，确保高优先级任务（如用户输入）能及时执行。</li></ul><p><strong>示例代码：</strong></p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// 模拟任务队列（Fiber 单元列表）</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> workQueue </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> [</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;">/* 一系列 Fiber 任务 */</span></span>
<span class="line"><span style="color:#A6ACCD;">]</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 模拟 shouldYield 判断函数（真实实现依据 deadline.timeRemaining()）</span></span>
<span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">shouldYield</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">performance</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">now</span><span style="color:#F07178;">() </span><span style="color:#89DDFF;">%</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">16</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">;</span><span style="color:#F07178;"> </span><span style="color:#676E95;font-style:italic;">// 简化示例：时间片不足则返回 true</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 执行一个 Fiber 单元任务</span></span>
<span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">performUnitOfWork</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">执行一个 Fiber 单元任务</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#82AAFF;">shouldYield</span><span style="color:#F07178;">()) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">暂停任务，等待空闲时间...</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#89DDFF;">;</span><span style="color:#F07178;"> </span><span style="color:#676E95;font-style:italic;">// 暂停当前任务</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// 继续执行下一个任务单元...</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 使用 requestIdleCallback 模拟任务调度与恢复</span></span>
<span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">workLoop</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">deadline</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">while</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">deadline</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">timeRemaining</span><span style="color:#F07178;">() </span><span style="color:#89DDFF;">&gt;</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">0</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">workQueue</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">length</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&gt;</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">0</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">performUnitOfWork</span><span style="color:#F07178;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#82AAFF;">requestIdleCallback</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">workLoop</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 启动任务调度</span></span>
<span class="line"><span style="color:#82AAFF;">requestIdleCallback</span><span style="color:#A6ACCD;">(workLoop)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre></div><h3 id="_3-4-commit-阶段" tabindex="-1">3.4 Commit 阶段 <a class="header-anchor" href="#_3-4-commit-阶段" aria-hidden="true">#</a></h3><ul><li>一旦 WorkInProgress Tree 构建完成，React 进入 Commit 阶段。</li><li>根据副作用列表，将所有变更应用到真实 DOM 上（更新属性、插入或删除节点等）。</li><li>新的工作树替换当前树，成为新的 Current Tree，页面随之更新。</li></ul><h2 id="_4-其他关键概念" tabindex="-1">4. 其他关键概念 <a class="header-anchor" href="#_4-其他关键概念" aria-hidden="true">#</a></h2><h3 id="_4-1-虚拟-dom" tabindex="-1">4.1 虚拟 DOM <a class="header-anchor" href="#_4-1-虚拟-dom" aria-hidden="true">#</a></h3><ul><li>轻量级抽象真实 DOM，描述 UI 结构与状态。</li><li>通过 Diff 算法计算新旧状态差异，降低直接操作 DOM 的开销。</li></ul><h3 id="_4-2-hooks-与状态管理" tabindex="-1">4.2 Hooks 与状态管理 <a class="header-anchor" href="#_4-2-hooks-与状态管理" aria-hidden="true">#</a></h3><ul><li>Hooks（如 useState、useEffect）通过组件内部维护的 hook 链表，实现函数组件中的状态管理与副作用处理。</li><li>保证组件每次渲染时 Hook 调用顺序一致，避免状态混乱。</li></ul><h3 id="_4-3-合成事件系统" tabindex="-1">4.3 合成事件系统 <a class="header-anchor" href="#_4-3-合成事件系统" aria-hidden="true">#</a></h3><ul><li>React 通过合成事件封装原生事件，利用事件委托机制将事件绑定到根节点，统一处理跨浏览器兼容性问题。</li><li>事件对象经过池化处理，降低内存分配成本。</li></ul><h3 id="_4-4-批处理与调度器" tabindex="-1">4.4 批处理与调度器 <a class="header-anchor" href="#_4-4-批处理与调度器" aria-hidden="true">#</a></h3><ul><li>状态更新通常不会立即同步执行，而是批量处理，合并多个更新到同一渲染周期内。</li><li>调度器根据任务优先级和系统空闲时间，安排任务顺序，确保高优先级任务能及时响应。</li></ul><h2 id="_5-总结" tabindex="-1">5. 总结 <a class="header-anchor" href="#_5-总结" aria-hidden="true">#</a></h2><p>最后总结一下吧！React 从初始加载到用户交互引发状态更新，再到最终将变更应用到真实 DOM 的整个过程，经历了以下几个阶段：</p><ol><li><strong>初始加载与挂载</strong></li></ol><ul><li>浏览器加载 HTML 与 JavaScript</li><li>React 初始化并创建根 Fiber 树</li><li>首次 Reconciliation 和 Commit，将初始 UI 渲染到页面上</li></ul><ol start="2"><li><strong>用户交互与状态更新</strong></li></ol><ul><li>用户操作触发事件，调用 setState 或 Hooks 更新状态</li><li>更新任务入队，由调度器根据优先级安排处理</li></ul><ol start="3"><li><strong>更新过程（Reconciliation 与 Commit）</strong></li></ol><ul><li>基于当前树创建 WorkInProgress Tree</li><li>Diff 算法比较新旧 Fiber 树，生成副作用列表</li><li>Fiber 架构利用时间切片将更新任务拆分为小单元，支持中断与恢复</li><li>Commit 阶段将所有变更同步到真实 DOM，新树替换旧树</li></ul><ol start="4"><li><strong>其他辅助机制</strong></li></ol><ul><li>虚拟 DOM、Hooks、合成事件系统、批处理与调度器共同构成了 React 高效渲染的底层支柱</li></ul><blockquote><p>这种设计使得 React 能够在保持高性能的同时，确保用户交互得到及时响应，为复杂应用提供了稳定高效的运行机制。</p></blockquote>`,45),t=[o];function r(i,c,p,d,F,h){return l(),n("div",null,t)}const u=s(e,[["render",r]]);export{D as __pageData,u as default};
