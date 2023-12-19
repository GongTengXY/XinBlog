import{_ as s,o as a,c as n,a as l}from"./app.31f566c8.js";const p="/v2Reactive.png",o="/v2Dep.png",e="/v2watcher.png",u=JSON.parse('{"title":"Vue2 响应式原理","description":"","frontmatter":{},"headers":[{"level":2,"title":"Vue2 官方阐述","slug":"vue2-官方阐述","link":"#vue2-官方阐述","children":[]},{"level":2,"title":"Observer","slug":"observer","link":"#observer","children":[]},{"level":2,"title":"Dep","slug":"dep","link":"#dep","children":[]},{"level":2,"title":"Watcher","slug":"watcher","link":"#watcher","children":[]},{"level":2,"title":"Scheduler","slug":"scheduler","link":"#scheduler","children":[]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"relativePath":"Vue/Vue2响应式原理.md","lastUpdated":1702879062000}'),t={name:"Vue/Vue2响应式原理.md"},c=l('<h1 id="vue2-响应式原理" tabindex="-1">Vue2 响应式原理 <a class="header-anchor" href="#vue2-响应式原理" aria-hidden="true">#</a></h1><h2 id="vue2-官方阐述" tabindex="-1">Vue2 官方阐述 <a class="header-anchor" href="#vue2-官方阐述" aria-hidden="true">#</a></h2><p><a href="https://v2.cn.vuejs.org/v2/guide/reactivity.html" target="_blank" rel="noreferrer">https://v2.cn.vuejs.org/v2/guide/reactivity.html</a></p><p>在<code>Vue2.x</code>中响应式的实现是通过<code>Object.defineProperty</code>来完成的，手动将<code>data对象</code>中的所有属性进行<code>数据劫持</code>，将对象中的属性转换变成<code>getter/setter</code>形式,然后呢就形成了响应式数据，组件 <code>render</code> 函数会生成虚拟 <code>DOM</code> 树，影响到界面。<code>render</code> 运行的时候用到了响应式数据，于是收集了依赖，数据变化，会通知 <code>watcher</code>，<code>watcher</code> 会重新运行 <code>render</code> 函数。可参考此图。</p><img src="'+p+`"><p>单看这张图，大家可能看不明白。在 <code>vue2</code> 中是有几个核心模块的：</p><ul><li>Observer</li><li>Dep</li><li>Watcher</li><li>Scheduler</li></ul><h2 id="observer" tabindex="-1">Observer <a class="header-anchor" href="#observer" aria-hidden="true">#</a></h2><p>功能：负责把<code>data</code>选项中的属性转换成响应式数据，并且数据变化发送通知。</p><p>在组件生命周期中，数据响应式发生在 <code>beforeCreate</code> 之后，<code>created</code> 之前。具体实现上，它会递归遍历对象的所有属性，以完成深度的属性转换。</p><p>由于遍历时只能遍历到对象的当前属性，因此无法监测到将来动态增加或删除的属性，因此 <code>vue</code> 提供了<code>$set</code>和<code>$delete</code> 两个实例方法，让开发者通过这两个实例方法对已有响应式对象添加或删除属性。</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> obj </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">a</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">c</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">d</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">f</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> [</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">a</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">3</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">b</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">4</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F78C6C;">5</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  ]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span>
<span class="line"><span style="color:#A6ACCD;">Vue</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">observable</span><span style="color:#A6ACCD;">(obj)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">//递归遍历</span></span>
<span class="line"></span></code></pre></div><blockquote><p>看到这里大家可能会有疑惑，那数组呢，Object.defineProperty 不能对数组进行数据劫持，那 vue 内部是怎么做的呐？ Vue 能对数组进行监听的原因是，把数组的方法重写了。</p><ul><li>先获取原生 Array 的原型方法，拦截后还是需要原生的方法帮我们实现数组的变化</li><li>对 Array 的原型方法使用 Object.defineProperty 做一些拦截操作</li><li>把需要被拦截的 Array 类型的数据原型指向改造后原型</li></ul></blockquote><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// 给大家截图看看源码部分对数组的处理 地址：src/core/observer/index.js</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// Vue 没有对数组的每个键设置响应式的过程，而是直接对值进行递归设置响应式</span></span>
<span class="line"><span style="color:#82AAFF;">constructor</span><span style="color:#A6ACCD;"> (value: any) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">value</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">value</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">dep</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">new</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">Dep</span><span style="color:#F07178;">()</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">vmCount</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">0</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">def</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">value</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">__ob__</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">this</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">Array</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">isArray</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">value</span><span style="color:#F07178;">)) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">hasProto</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#82AAFF;">protoAugment</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">value</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">arrayMethods</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;font-style:italic;">else</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#82AAFF;">copyAugment</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">value</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">arrayMethods</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">arrayKeys</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">this.</span><span style="color:#82AAFF;">observeArray</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">value</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;font-style:italic;">else</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">this.</span><span style="color:#82AAFF;">walk</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">value</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * Walk through all properties and convert them into</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * getter/setters. This method should only be called when</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * value type is Object.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   */</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#82AAFF;">walk</span><span style="color:#A6ACCD;"> (obj: Object) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">keys</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">Object</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">keys</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">obj</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">for</span><span style="color:#F07178;"> (</span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">i</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">i</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">keys</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">length</span><span style="color:#89DDFF;">;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">i</span><span style="color:#89DDFF;">++</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#82AAFF;">defineReactive</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">obj</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">keys</span><span style="color:#F07178;">[</span><span style="color:#A6ACCD;">i</span><span style="color:#F07178;">])</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h2 id="dep" tabindex="-1">Dep <a class="header-anchor" href="#dep" aria-hidden="true">#</a></h2><p>Dep 的含义是 Dependency，表示依赖的意思。 Vue 会为响应式对象中的每个属性、对象本身、数组本身创建一个 Dep 实例，</p><p>功能：收集依赖，添加观察者(<code>watcher</code>)，通知所有观察者(派发更新)。</p><img src="`+o+`"><blockquote><p>这里我截取一段我仿写的代码仅供参考理解</p></blockquote><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// 这是我mini_vue2中对Observer的仿写，供大家理解Observer和Dep的功能</span></span>
<span class="line"><span style="color:#C792EA;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Observer</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">constructor</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">data</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">this.</span><span style="color:#82AAFF;">walk</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">data</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">walk</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">data</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#89DDFF;">!</span><span style="color:#A6ACCD;">data</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">||</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">typeof</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">data</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">!==</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">object</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">Object</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">keys</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">data</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">forEach</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">key</span><span style="color:#89DDFF;">)</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">this.</span><span style="color:#82AAFF;">defineReactive</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">data</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">key</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">data</span><span style="color:#F07178;">[</span><span style="color:#A6ACCD;">key</span><span style="color:#F07178;">])</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">defineReactive</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">data</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">key</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">value</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">that</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">this;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">this.</span><span style="color:#82AAFF;">walk</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">value</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">dep</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">new</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">Dep</span><span style="color:#F07178;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">Object</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">defineProperty</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">data</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">key</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      get</span><span style="color:#89DDFF;">()</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#676E95;font-style:italic;">// 记录依赖，addSub就是depend</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#A6ACCD;">Dep</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">target</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">dep</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">addSub</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">Dep</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">target</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">value</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#F07178;">      set</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">newValue</span><span style="color:#89DDFF;">)</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">value</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">===</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">newValue</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">          </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#A6ACCD;">value</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">newValue</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#A6ACCD;">that</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">walk</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">newValue</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#676E95;font-style:italic;">// 派发更新，更新数据视图</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#A6ACCD;">dep</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">notify</span><span style="color:#F07178;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h2 id="watcher" tabindex="-1">Watcher <a class="header-anchor" href="#watcher" aria-hidden="true">#</a></h2><p>每一个组件实例，都至少对应一个<code>watcher</code>，该 <code>watcher</code> 中记录了该组件的 <code>render</code> 函数。 <code>watcher</code> 首先会把 <code>render</code> 函数运行一次以收集依赖，于是那些在 <code>render</code> 中用到的响应式数据<span style="color:rgb(100, 181, 135);">(就是那些在 Observer 中转换成响应式的数据，可参考仿写代码块)</span>就会记录这个<code>watcher</code>。 当数据变化时，<code>dep</code>就会通知该 <code>watcher</code>，而 <code>watcher</code> 将重新运行 <code>render</code> 函数，从而让界面重新渲染同时重新记录当前的依赖。</p><img src="`+e+`"><p>这就是 vue 巧妙的地方，利用观察者模式，设计 Dep 和 Watcher 来解决当某个使用到响应式数据时，响应式数据是无法知道是哪个地方在用自己的问题。</p><blockquote><p>这里有个疑问给大家，vue 为什么是精准更新呢？</p></blockquote><h2 id="scheduler" tabindex="-1">Scheduler <a class="header-anchor" href="#scheduler" aria-hidden="true">#</a></h2><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>Dep 通知 watcher 之后，如果 watcher 执行属性对应的函数，就有可能导致函数频繁运行，从而导致效率低下,vue 内部是怎么解决的呢？</p></div><p>example:如果一个交给 watcher 的函数，它里面用到了属性 a、b、c、d，那么 a、b、c、d 属性都会记录依赖，于是下面的代码将触发 4 次更新；</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">data</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">a </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">new data</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">data</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">b </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">new data</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">data</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">c </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">new data</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">data</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">d </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">new data</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre></div><p>大家可以看到这样如果真的这样做的话对性能是有非常大的开销，因此，watcher 收到派发更新的通知后，实际上不是立即执行对应函数，而是把自己交给一个叫<strong>调度器</strong>的东西</p><p>调度器维护一个执行队列，该队列同一个 watcher 仅会存在一次，队列中的 watcher 不是立即执行，它会通过一个叫做 nextTick 的工具方法，把这些需要执行的 watcher 放入到事件循环的微队列中，nextTick 的具体做法是通过 Promise 完成的。说到 <strong>nextTick</strong>，大家是不是想到了 <strong>this.$nextTick()</strong>，这个方法就是 nextTick 的封装，它会在当前的 watcher 结束后，在下一个事件循环中执行。</p><p style="color:rgb(100, 181, 135);">具体来说，当数据发生改变时，Vue 会创建一个 Watcher，并将该 Watcher 的 nextTick 方法加入到一个任务队列中。在下一个 tick 时，scheduler 调度器会检查该任务队列是否为空，如果为空，则直接执行该队列中的所有任务；如果不为空，则将该队列中的任务加入到一个整体的任务队列中，并根据当前的性能情况来决定是否执行该队列中的任务。</p><p style="color:rgb(100, 181, 135);">通过这种方式，scheduler 调度器可以控制数据观察的执行时机，从而避免在数据改变时立即执行大量的数据观察任务，导致性能问题。同时，它也可以根据当前的性能情况来动态地调整任务的执行顺序，保证最重要的任务先得到执行。</p><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-hidden="true">#</a></h2><p>总结：</p><ol><li><p style="color:rgb(100, 181, 135);font-weight:600;">observer 对数据对象进行递归遍历，包括子属性对象的属性，都加上 setter 和 getter 这样的话，给这个对象的某个值赋值，就会触发 setter，那么就能监听到了数据变化</p></li><li><p style="color:rgb(100, 181, 135);font-weight:600;">compile 解析模板指令，将模板中的变量替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，更新视图</p></li><li><p style="color:rgb(100, 181, 135);font-weight:600;">Watcher 订阅者是 Observer 和 Compile 之间通信的桥梁，主要做的事情是:</p></li></ol><p>① 在自身实例化时往属性订阅器(dep)里面添加自己</p><p>② 自身必须有一个 update()方法</p><p>③ 当属性变动 dep.notice()通知时，能调用自身的 update()方法，并触发 Compile 中绑定给 watcher 的变更函数，从而更新视图</p><ol start="4"><li><p style="color:rgb(100, 181, 135);font-weight:600;">Dep 是一个用来保存订阅者的类，它主要做的事情是:</p></li></ol><p>① observer 转化响应式数据第一次访问数据时，添加订阅者到自身实例化时创建的 订阅者列表中</p><p>② 自身必须有一个 notify()方法</p><p>③ 当属性变动时，调用自身的 notify()方法，并触发 Watcher 订阅者的 update()方法，从而更新视图</p><blockquote><p>不过要提醒大家的是 Vue2 中的 scheduler 调度器主要是用于控制数据观察的执行时机和性能，而不是用于实现响应式系统的核心逻辑。<br> Vue2 的响应式系统核心逻辑是通过 Object.defineProperty 来实现的,而 scheduler 调度器只是在此基础上进行了一些优化。拓展一下知识点就好。面试被问到可以回答一下，不提不说</p></blockquote>`,44),r=[c];function y(F,D,i,A,C,d){return a(),n("div",null,r)}const v=s(t,[["render",y]]);export{u as __pageData,v as default};
