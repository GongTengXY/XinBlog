import{_ as s,o as n,c as a,a as l}from"./app.adce981a.js";const i=JSON.parse('{"title":"迭代器与生成器","description":"","frontmatter":{},"headers":[{"level":2,"title":"迭代器","slug":"迭代器","link":"#迭代器","children":[{"level":3,"title":"可迭代协议","slug":"可迭代协议","link":"#可迭代协议","children":[]},{"level":3,"title":"for-of 循环","slug":"for-of-循环","link":"#for-of-循环","children":[]},{"level":3,"title":"扩展运算符与可迭代对象","slug":"扩展运算符与可迭代对象","link":"#扩展运算符与可迭代对象","children":[]}]},{"level":2,"title":"生成器","slug":"生成器","link":"#生成器","children":[]},{"level":2,"title":"async 与 await","slug":"async-与-await","link":"#async-与-await","children":[]}],"relativePath":"JavaScript/迭代器与生成器.md","lastUpdated":1741225150000}'),o={name:"JavaScript/迭代器与生成器.md"},p=l(`<h1 id="迭代器与生成器" tabindex="-1">迭代器与生成器 <a class="header-anchor" href="#迭代器与生成器" aria-hidden="true">#</a></h1><h2 id="迭代器" tabindex="-1">迭代器 <a class="header-anchor" href="#迭代器" aria-hidden="true">#</a></h2><p>首先，该对象是一个有着 <strong>Symbol.iterator</strong> 这个标识属性，且该属性值就是迭代函数，该迭代函数执行会返回一个对象<br> 该对象有一个<code>next</code>属性函数,每调用 next 函数可以得到一个新对象，里面有两个属性：<strong>value</strong> 和 <strong>done</strong>；<strong>value</strong> 表示当前迭代的值，<strong>done</strong> 表示遍历是否完成状态（布尔值：true 表示—完成，false 表示—未完成）</p><p>大家都知道一个对象是不可迭代的，那我们怎么然后对象可迭代呢，结合刚才说的点，看下例子：</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">makeIterator</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">nextIndex</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">next</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">function</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">()</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">nextIndex</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">5</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">?</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> value</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">nextIndex</span><span style="color:#89DDFF;">++,</span><span style="color:#F07178;"> done</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#FF9CAC;">false</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> value</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">undefined,</span><span style="color:#F07178;"> done</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">};</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">};</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> obj </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">[</span><span style="color:#A6ACCD;">Symbol</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">iterator</span><span style="color:#F07178;">]</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> makeIterator</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span>
<span class="line"></span></code></pre></div><blockquote><p>上面例子中，makeIterator 函数返回的对象就是迭代器</p></blockquote><h3 id="可迭代协议" tabindex="-1">可迭代协议 <a class="header-anchor" href="#可迭代协议" aria-hidden="true">#</a></h3><p>大家看过上述的例子，估计应该也明白了。ES6 规定，如果一个对象具有标识符号属性<code>Symbol.iterator</code>，并且属性值是一个迭代器创建函数，则该对象是可迭代的（iterable），数组就是个可迭代对象</p><ul><li>可迭代器（iterator）：一个具有 next 方法的对象，next 方法返回下一个数据并且能指示是否迭代完成</li><li>迭代器创建函数（iterator creator）：一个返回迭代器的函数</li></ul><h3 id="for-of-循环" tabindex="-1">for-of 循环 <a class="header-anchor" href="#for-of-循环" aria-hidden="true">#</a></h3><p>for-of 循环用于遍历可迭代对象，它的原理：调用对象的<code>[Symbol.iterator]</code>方法，得到一个迭代器。不断调用 next 方法，只有返回的 done 为 false，则将返回的 value 传递给变量，然后进入循环体执行一次。格式如下:</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">//迭代完成后循环结束</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">for</span><span style="color:#A6ACCD;"> (</span><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> item </span><span style="color:#89DDFF;">in</span><span style="color:#A6ACCD;"> iterable) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">//iterable：可迭代对象</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">//item：每次迭代得到的数据</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><blockquote><p>再演示个例子</p></blockquote><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> arr </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> [</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">3</span><span style="color:#A6ACCD;">]</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> iterator </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> arr[Symbol</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">iterator]()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(iterator</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">next</span><span style="color:#A6ACCD;">())</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(iterator</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">next</span><span style="color:#A6ACCD;">())</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(iterator</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">next</span><span style="color:#A6ACCD;">())</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(iterator</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">next</span><span style="color:#A6ACCD;">())</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// //这里的iterator就是es6中的迭代器</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">for</span><span style="color:#A6ACCD;"> (</span><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> i </span><span style="color:#89DDFF;">of</span><span style="color:#A6ACCD;"> arr) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">i</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span><span style="color:#F07178;"> </span><span style="color:#676E95;font-style:italic;">// 可以得到数组的每个值(按照下标的顺序)</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// for of可以遍历迭代器，内部自动调用next方法。i就是for of遍历出来对象的value值</span></span>
<span class="line"></span></code></pre></div><p>在 ES6 中除了我们提到的<code>for of循环</code>，还有以下几点会默认调用<strong>Iterator</strong>接口（就是<strong>Symbol.iterator</strong>方法）</p><ul><li>数组解构</li><li>扩展运算符</li><li>yield*</li><li>隐式调用（如：new Set([&#39;a&#39;,&#39;b&#39;])、Promise.all()）</li></ul><blockquote><p>有的人就想问了，对象不是没有 Symbol.iterator 属性嘛，凭什么它可以结构？<br> 这个问题可以查看面试题 JS 专栏</p></blockquote><h3 id="扩展运算符与可迭代对象" tabindex="-1">扩展运算符与可迭代对象 <a class="header-anchor" href="#扩展运算符与可迭代对象" aria-hidden="true">#</a></h3><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>有的人就想问了，对象不是没有 Symbol.iterator 属性嘛，凭什么它可以解构。 接下来带着疑问看...</p></div><p>首先看过本文开头的，我们知道如何将一个对象变为可迭代对象，接下来就好办了，请大家看下例代码：</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> obj </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">age</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">18</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">nickname</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">工藤新一</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">base</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">china</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> age</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">...</span><span style="color:#A6ACCD;">rest </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> obj</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(obj)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 原封未动</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(age)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 18</span></span>
<span class="line"><span style="color:#A6ACCD;">age </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">22</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(obj)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 原封未动</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(age)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 22</span></span>
<span class="line"></span></code></pre></div><p>想必大家看到这里应该就已经明白了，对象为什么能解构。修改解构出来的值也并不会改变源对象的值,因为这已经是一个全新的值。</p><p>对象的解构就是: 创建新变量 -&gt; 枚举属性 -&gt; 复制属性并赋值。</p><h2 id="生成器" tabindex="-1">生成器 <a class="header-anchor" href="#生成器" aria-hidden="true">#</a></h2><p>生成器又叫做 <strong>Generator</strong> 函数，是 ES6 提供的一种异步编程解决方案，可以提到的一点就是 Generator 函数与我们平时使用的传统函数不同。</p><p>定义形式：</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// generator函数</span></span>
<span class="line"><span style="color:#C792EA;">function</span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">generatorFn</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{}</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 普通函数...</span></span>
<span class="line"></span></code></pre></div><p>在定义形式上，Generator 函数是一个普通函数，但是有两个特征。<br> 一是，<code>function</code>关键字与函数名之间有一个星号；<br> 二是，函数体内部可以使用<code>yield</code>关键字，定义不同的内部状态，执行 Generator 函数，函数本身不会执行，而是会返回一个<code>遍历器对象</code>，同时该对象也是<code>可遍历的</code>，因为在其原型链上也具有<code>Symbol.iterator</code>方法，并且该方法返回的对象就是该遍历器对象自身。Generator 函数返回的对象也可以被遍历，相当于每次调用此对象<code>next()</code>的<code>value</code>来作为遍历结果</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">generatorFn</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#F78C6C;">1</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> a </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">generatorFn</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">a[Symbol</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">iterator]() </span><span style="color:#89DDFF;">===</span><span style="color:#A6ACCD;"> a</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// true</span></span>
<span class="line"></span></code></pre></div><p>这里又回到了迭代器部分，只有执行了迭代器对象的 next()方法，Generator 函数才会执行。</p><div class="info custom-block"><p class="custom-block-title">INFO</p><p>最近有点懒惰，下面这个代码块给大家教会生成器的调用以及 next()的传参</p></div><p>看代码之前首先要明确了几点，生成器函数调用，不会立即执行函数体，而是返回一个 lterator 遍历器对象，调用 next()方法则继续往后执行。碰到 yield 关键字就暂停，调用一次 next 就会执行 yield 之前的代码以及返回一个对象<code>{value:yield后面的值，done:表示yield后面还有yield还可以继续遍历}</code>，跟迭代器一样请往上翻。</p><p>next()传参，next()中传参表示，参数覆盖掉上一条 yield 语句返回的值</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">g</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">a</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">b</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">2</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">*</span><span style="color:#F07178;"> (</span><span style="color:#89DDFF;font-style:italic;">yield</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">a</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">-</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">1</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">b</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">c</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;font-style:italic;">yield</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">b</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">/</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">4</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">a</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">-</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">b</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">+</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">c</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> genObj </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">g</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">3</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// genObj拿到迭代器且参数a为3</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(genObj</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">next</span><span style="color:#A6ACCD;">())</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 返回{value:2,done:false}, 还是那句话，调用一次next返回的对象value属性值就是yield关键字后面的值 3 - 1 = 2</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(genObj</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">next</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">6</span><span style="color:#A6ACCD;">))</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 返回{value:3,done:false}, 这一点也很好理解，传参为6，将a-1的值替代，然后执行到下一个yield，12 / 4 = 3</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(genObj</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">next</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">3</span><span style="color:#A6ACCD;">))</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 返回{value:-6,done:true}</span></span>
<span class="line"></span></code></pre></div><blockquote><p>yield 和 return：<br> 1、yield 命令是异步不同阶段的分界线，yield 和 return 是有本质上的不同<br> 2、yield 和 return 都有暂停返回的功能 return 表示函数已执行结束，yield 表示暂停此阶段，函数还没有执行完<br> 3、return 表示结束遍历 generator 函数</p></blockquote><p>为了方便快捷，ES6 同时也推出<code>yield*</code>表达式返回一个遍历器对象，用于 Generator 函数内部，调用另一个 Generator 函数。这个例子我就不写了，很简单。</p><h2 id="async-与-await" tabindex="-1">async 与 await <a class="header-anchor" href="#async-与-await" aria-hidden="true">#</a></h2><p>现在进行项目开发中，async 和 await 算是目前最好用的异步解决方案，太常用了。在这里跟大家说一下，async/await 就是 Generator 的语法糖。</p><p>可以理解一下 async 和 await 的特性，await 关键字的作用像不像 yield 的开关作用。</p><p>await 后面跟的代码需要考虑情况：<br> 1、如果后面跟的是是同步代码（例如函数调用），则该代码会立即执行<br> 2、如果后面跟的是异步代码（例如 Promise 或 setTimeout），则该代码会被添加到相应的队列</p><p>而 await 下一行的代码即便是同步任务也会在 await 后面的代码执行之后执行。</p><blockquote><p>我写了一个 generator 简易自动执行器，模拟一下 aysnc/await 的实现，大家可以尝试一下</p></blockquote><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> readFile </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">require</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">fs</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> path </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">require</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">path</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> file1 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> path</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">join</span><span style="color:#A6ACCD;">(__dirname</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">../txt/1.txt</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> file2 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> path</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">join</span><span style="color:#A6ACCD;">(__dirname</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">../txt/2.txt</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 编写Thunk函数</span></span>
<span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> Thunk </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">fileName</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">function</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">callback</span><span style="color:#89DDFF;">)</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">readFile</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">fileName</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">callback</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">};</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">function</span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">fn</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">000</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">data1</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;font-style:italic;">yield</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">Thunk</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">file1</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">读取了data1：</span><span style="color:#89DDFF;">\${</span><span style="color:#A6ACCD;">data1</span><span style="color:#89DDFF;">}\`</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">data2</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;font-style:italic;">yield</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">Thunk</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">file2</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">读取了data2：</span><span style="color:#89DDFF;">\${</span><span style="color:#A6ACCD;">data2</span><span style="color:#89DDFF;">}\`</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 编写一个自动执行器run函数</span></span>
<span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">run</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">fn</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">it</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">fn</span><span style="color:#F07178;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">function</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">nextStop</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">err</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;font-style:italic;">data</span><span style="color:#89DDFF;">)</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">result</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">it</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">next</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">data</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">result</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">done</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">result</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">done</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">result</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">value</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">nextStop</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#82AAFF;">nextStop</span><span style="color:#F07178;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">run</span><span style="color:#A6ACCD;">(fn)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre></div>`,43),e=[p];function t(c,r,y,F,D,A){return n(),a("div",null,e)}const d=s(o,[["render",t]]);export{i as __pageData,d as default};
