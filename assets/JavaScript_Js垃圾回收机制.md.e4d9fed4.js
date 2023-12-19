import{_ as s,o as n,c as a,a as l}from"./app.31f566c8.js";const p="/js回收1.png",o="/noticeFn1.png",e="/newOldMemory.png",t="/leisure.png",u=JSON.parse('{"title":"JS 垃圾回收机制","description":"","frontmatter":{},"headers":[{"level":2,"title":"什么是垃圾回收机制","slug":"什么是垃圾回收机制","link":"#什么是垃圾回收机制","children":[]},{"level":2,"title":"垃圾如何产生","slug":"垃圾如何产生","link":"#垃圾如何产生","children":[]},{"level":2,"title":"垃圾回收算法策略","slug":"垃圾回收算法策略","link":"#垃圾回收算法策略","children":[{"level":3,"title":"标记清除算法","slug":"标记清除算法","link":"#标记清除算法","children":[]},{"level":3,"title":"引用计数算法","slug":"引用计数算法","link":"#引用计数算法","children":[]}]},{"level":2,"title":"V8 引擎对 GC 的优化","slug":"v8-引擎对-gc-的优化","link":"#v8-引擎对-gc-的优化","children":[{"level":3,"title":"分代式垃圾回收","slug":"分代式垃圾回收","link":"#分代式垃圾回收","children":[]},{"level":3,"title":"新老生代","slug":"新老生代","link":"#新老生代","children":[]},{"level":3,"title":"更多","slug":"更多","link":"#更多","children":[]}]}],"relativePath":"JavaScript/Js垃圾回收机制.md","lastUpdated":1702879062000}'),c={name:"JavaScript/Js垃圾回收机制.md"},r=l(`<h1 id="js-垃圾回收机制" tabindex="-1">JS 垃圾回收机制 <a class="header-anchor" href="#js-垃圾回收机制" aria-hidden="true">#</a></h1><h2 id="什么是垃圾回收机制" tabindex="-1">什么是垃圾回收机制 <a class="header-anchor" href="#什么是垃圾回收机制" aria-hidden="true">#</a></h2><p><strong>垃圾回收</strong> 俗称<code>GC</code>全称<code>Garbage Collection</code>。代码程序在执行过程中会产生很多垃圾，<code>这些垃圾</code>是程序不用的内存或者是之前用过了，并且以后不会再用的内存空间。所以<code>GC</code>就是负责回收垃圾的，因为工作在<code>JS引擎</code>内部，所以对于我们前端来说，GC 过程是相对比较陌生的，这一套引擎执行而对我们又相对陌生的操作就是我们面试老说的<code>垃圾回收机制</code>。</p><h2 id="垃圾如何产生" tabindex="-1">垃圾如何产生 <a class="header-anchor" href="#垃圾如何产生" aria-hidden="true">#</a></h2><p>我们都知道在写代码时创建一个基本类型、对象、函数……吧啦吧啦都是需要占用内存的，但是我们并不关注这些，因为这是<code>JS引擎</code>为我们分配的，我们不需要自己去分配内存。</p><p><strong>提问环节</strong></p><p style="color:rgb(100, 181, 135);">大家想一想，当我们不再需要某个数据时？JavaScript 引擎又是如何发现并清理它的呢？</p><p>行了，想这么多也没啥意思。我们都知道 JavaScript 的引用数据类型是保存在堆内存中的，然后在栈内存中保存一个对堆内存中实际对象的引用(查找地址)，所以，JavaScript 中对引用数据类型的操作都是操作对象的引用而不是实际的对象。可以简单理解为，栈内存中保存了一个地址，这个地址和堆内存中的实际值是相关的。 直接看代码吧！</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// example</span></span>
<span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> test </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">工藤新一</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span>
<span class="line"><span style="color:#A6ACCD;">test </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> [</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">3</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">4</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">5</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">6</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">7</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">8</span><span style="color:#A6ACCD;">]</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre></div><p>首先我们声明了一个变量 test，它引用了对象 {name: &quot;工藤新一&quot;}，接着我们把这个变量重新赋值了一个数组对象，也就变成了该变量引用了一个数组，那么之前的对象引用关系就没有了。既然没了引用关系，也就是垃圾，这个时候假如把它放那不管，一个两个还行，多了的话内存那不得挤死啊，所以就需要被清理（回收）</p><img src="`+p+'" style="margin-left:5%;"><h2 id="垃圾回收算法策略" tabindex="-1">垃圾回收算法策略 <a class="header-anchor" href="#垃圾回收算法策略" aria-hidden="true">#</a></h2><p>JavaScript 垃圾回收机制的原理说白了也就是定期找出那些不再用到的内存（变量），然后释放其内存。但是把垃圾也没那么好找，所以嘞，怎么找出垃圾这个流程就会涉及到一些算法策略，这里就说两种大家面试老生常谈的。</p><ul><li>标记清除算法</li><li>引用计数算法</li></ul><h3 id="标记清除算法" tabindex="-1">标记清除算法 <a class="header-anchor" href="#标记清除算法" aria-hidden="true">#</a></h3><p><strong>标记清除</strong>（Mark-Sweep），目前在 <code>JavaScript引擎</code> 里这种算法是最常用的，到目前为止的大多数浏览器的 JavaScript 引擎 都在采用标记清除算法，只是各大浏览器厂商还对此算法进行了优化加工，且不同浏览器的 <code>JavaScript引擎</code> 在运行垃圾回收的频率上有所差异</p><blockquote><p>顾名思义，先标记后清除，分为两个阶段。</p></blockquote><ul><li><strong>标记阶段</strong>: 给所有被用到的对象做个标记</li><li><strong>清除阶段</strong>: 把那些没有标记的对象销毁</li></ul><p>整个标记清除算法的过程粗略 say 下：</p><ul><li>垃圾收集器在运行时会给内存中的所有变量都加上一个标记，假设内存中所有对象都是垃圾，全标记为 0</li><li>然后从各个根对象开始遍历，把不是垃圾的节点改成 1</li><li>清理所有标记为 0 的垃圾，销毁并回收它们所占用的内存空间</li><li>最后，把所有内存中对象标记修改为 0，等待下一轮垃圾回收</li></ul><p><strong>优点：</strong><br> 实现起来比较简单，打标记也无非打与不打两种情况，这样一位二进制位（0 和 1）就可以为其标记，这不是 so easy 嘛！</p><p><strong>缺点：</strong><br> 标记清除算法的问题倒是蛮大的，每次清除阶段执行之后，剩余的对象内存位置是不变的，也会导致空闲内存空间是不连续的，出现了<code>内存碎片</code>,并且由于剩余空闲内存不是一整块，它是由不同大小内存组成的内存列表，这就牵扯出了内存分配的问题 <img src="'+o+`"></p><blockquote><p>标记清除算法的缺点：</p></blockquote><ul><li>1、内存碎片化</li><li>2、大内存分配效率低</li></ul><h3 id="引用计数算法" tabindex="-1">引用计数算法 <a class="header-anchor" href="#引用计数算法" aria-hidden="true">#</a></h3><p><strong>引用计数</strong>(Reference Counting)，这也算是一款比较早的垃圾回收算法，它把<strong>标记清除</strong>中的<code>对象是否不再需要</code>简化定义为<code>对象有没有被其他对象引用到它</code>，如果没有引用指向该对象，那就是无引用，那这样的对象就会被垃圾回收机制回收了。But 问题有点多，所以用的不多了哈。</p><p>首先要搞清楚，引用计数算法它的思想是跟踪每个变量值被使用的次数。</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> a </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> []</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 首先a数组的引用计数 = 1</span></span>
<span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> b </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> a</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 我再把a赋值给b，数组的引用 = 2</span></span>
<span class="line"><span style="color:#A6ACCD;">a </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">null;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 我把变量a滞空，数组的引用 2 - 1 = 1，此时只有b还在引用着数组</span></span>
<span class="line"><span style="color:#A6ACCD;">b </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">null;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 我把变量b滞空，数组的应用 = 0</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 此时 GC就来回收啦！</span></span>
<span class="line"></span></code></pre></div><blockquote><p>上面的例子，看着好像没多大问题哈，那接下来看一下循环引用的示例</p></blockquote><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">XiaoXinTest</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">A</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{};</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">B</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">new</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">Object</span><span style="color:#F07178;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">A</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">b</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">B</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">B</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">a</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">A</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">XiaoXinTest</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 大家看，XiaoXinTest这个函数一旦执行完成，按道理来说里面的内存都应该被清除吧，</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 可是，函数内部的对象A、对象B通过各自的属性a、b相互引用着。所以那两个对象的引用不会变成0，</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 这样搞，不浪费内存鬼信！</span></span>
<span class="line"></span></code></pre></div><blockquote><p>那可以考虑一下，如何解决上述例子中循环引用的问题</p></blockquote><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">XiaoXinTest</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">A</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{};</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">B</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">new</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">Object</span><span style="color:#F07178;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// 从这里开始，造成了循环引用</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">A</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">b</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">B</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">B</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">a</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">A</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// 那我们统一给它引用制空</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">A</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">b</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">null;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">B</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">a</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">null;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">XiaoXinTest</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 这样不就切断了引用关系</span></span>
<span class="line"></span></code></pre></div><p><strong>优点：</strong><br> 引用计数算法相比标记清除算法看起来更加清晰，引用计数在引用值为 0 时，也就是在变成垃圾的那一刻就会被回收，它就可以立即回收垃圾。<br> 标记清除算法需要遍历堆里的活动以及非活动对象来清除，而引用计数则只需要在引用时计数就可以</p><p><strong>缺点：</strong><br> 得需要个计数器（不知上限所以会占空间），且循环引用的问题无法解决</p><h2 id="v8-引擎对-gc-的优化" tabindex="-1">V8 引擎对 GC 的优化 <a class="header-anchor" href="#v8-引擎对-gc-的优化" aria-hidden="true">#</a></h2><p>在上述中我提到了，现在很多浏览器用的都还是标记清除算法，当然 V8 也没有例外。不过哈，V8 在原有的基础上优化加工，接下来我要提到一个新名词 <span style="color:rgb(100, 181, 135);font-weight:700;">分代式垃圾回收</span></p><h3 id="分代式垃圾回收" tabindex="-1">分代式垃圾回收 <a class="header-anchor" href="#分代式垃圾回收" aria-hidden="true">#</a></h3><blockquote><p>提个问题，纯字面意思你觉得分代式拉圾回收是什么？</p></blockquote><p>算了不卖关子了，分代式就是新老生代，从上文大家就知道了一些内存存在的时间可能很长，一些内存刚用完就要被回收了。这样一来就演绎出了新老生代的说法。</p><h3 id="新老生代" tabindex="-1">新老生代 <a class="header-anchor" href="#新老生代" aria-hidden="true">#</a></h3><p>V8 的垃圾回收策略主要基于分代式垃圾回收机制，V8 中将堆内存分为新生代和老生代两区域，采用不同的垃圾回收器也就是不同的策略管理垃圾回收</p><p><strong>新生代</strong>的对象为存活时间较短的对象，简单来说就是新产生的对象，通常只支持 1 ～ 8M 的容量，而<strong>老生代</strong>的对象为存活事件较长或常驻内存的对象，简单来说就是经历过新生代垃圾回收后还存活下来的对象，容量通常比较大</p><p>V8 整个堆内存的大小就等于新生代加上老生代的内存（如下图）</p><img src="`+e+'"><p>对于新老两块内存区域的垃圾回收，V8 采用了两个垃圾回收器来管控，我们暂且将管理新生代的垃圾回收器叫做新生代垃圾回收器，同样的，我们称管理老生代的垃圾回收器叫做老生代垃圾回收器好了</p><h4 id="新、老生代垃圾回收" tabindex="-1">新、老生代垃圾回收 <a class="header-anchor" href="#新、老生代垃圾回收" aria-hidden="true">#</a></h4><p>新生代对象是通过一个名为 <strong>Scavenge</strong> 的算法进行垃圾回收，在 <strong>Scavenge</strong> 算法 的具体实现中，主要采用了一种复制式的方法即 <strong>Cheney</strong> 算法 ，我们细细道来 <strong>Cheney</strong> 算法 中将堆内存一分为二，一个是处于使用状态的空间我们暂且称之为 使用区，一个是处于闲置状态的空间我们称之为 空闲区，如下图所示</p><img src="'+t+'"><p>对于大多数占用空间大、存活时间长的对象会被分配到老生代里，因为老生代中的对象通常比较大，如果再如新生代一般分区然后复制来复制去就会非常耗时，从而导致回收执行效率不高，所以老生代垃圾回收器来管理其垃圾回收执行，它的整个流程就采用的就是上文所说的标记清除算法了</p><p>说这么多，我都要看糊涂了，我给大家总结一段话，来讲清楚分代式拉圾回收的工作流程。</p><blockquote><p>这个过程是这样的：<br> 首先新生代分使用区和空闲区，当使用区快满了，就要开始 GC 了， 然后开始对使用区做标记，标记后复制一份活动对象到空闲区（这里做了整理的操作，也就是排序，避免内存碎片）， 再然后清除使用区数据对象，把原来的使用区改称空闲区，把原来的空闲区改成使用区，这样的话新使用区就是空的。<br> 继续存数据，当快存满了开始下一轮 GC，再看第二轮 GC，还是重复上面的步骤，先标记，再把活动对象从使用区复制到空闲区，这个时候假如发现了上次就存在的对象这次还是活动对象，<code>那这个对象就会被晋级</code>，扔到老生代里去。接着说复制之后，使用区又被清空了，并且再次和空闲区转换，那每一轮 GC 过后，使用区就会变成空的。</p></blockquote><blockquote><p>我感觉说的挺明白了，听不明白的拉出去砍了！</p></blockquote><h3 id="更多" tabindex="-1">更多 <a class="header-anchor" href="#更多" aria-hidden="true">#</a></h3><p>其实 V8 对 GC 还有其他的优化，比如<strong>并行回收</strong>、<strong>增量标记</strong>、<strong>惰性清理</strong> 等等，这里就不一一说了，大家感兴趣可以去度娘看。</p><blockquote><p>学无止 尽！建议大家看个大概，理解其主要含义是最好的</p></blockquote>',55),i=[r];function y(F,D,C,A,d,h){return n(),a("div",null,i)}const b=s(c,[["render",y]]);export{u as __pageData,b as default};
