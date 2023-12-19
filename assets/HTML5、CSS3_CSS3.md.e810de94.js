import{_ as s,o as t,c as a,a as n}from"./app.31f566c8.js";const o="/Images/image-20210214150511841.png",e="/Images/image-20210214151037552.png",A=JSON.parse('{"title":"CSS3 精简版","description":"","frontmatter":{},"headers":[{"level":2,"title":"盒子模型","slug":"盒子模型","link":"#盒子模型","children":[]},{"level":2,"title":"定位","slug":"定位","link":"#定位","children":[]},{"level":2,"title":"Flex 布局","slug":"flex-布局","link":"#flex-布局","children":[]},{"level":2,"title":"单位","slug":"单位","link":"#单位","children":[]},{"level":2,"title":"过渡","slug":"过渡","link":"#过渡","children":[]},{"level":2,"title":"动画","slug":"动画","link":"#动画","children":[]},{"level":2,"title":"opacity","slug":"opacity","link":"#opacity","children":[{"level":3,"title":"opacity 和 rgba 的区别","slug":"opacity-和-rgba-的区别","link":"#opacity-和-rgba-的区别","children":[]}]}],"relativePath":"HTML5、CSS3/CSS3.md","lastUpdated":1702994340000}'),l={name:"HTML5、CSS3/CSS3.md"},p=n('<h1 id="css3-精简版" tabindex="-1">CSS3 精简版 <a class="header-anchor" href="#css3-精简版" aria-hidden="true">#</a></h1><h2 id="盒子模型" tabindex="-1">盒子模型 <a class="header-anchor" href="#盒子模型" aria-hidden="true">#</a></h2><p>浏览器的渲染引擎在对网页文档进行布局时，会按照 “CSS 基础盒模型” （CSS Basic Box Model）标准，将文档中的所有元素都表示为一个个矩形的盒子，再用 CSS 去决定这些盒子的大小尺寸、显示位置、以及其他属性（如颜色、背景、边框等）。</p><p>在目前 CSS3 中，我们是可以通过 <span style="color:rgb(100, 181, 135);font-weight:600;">box-sizing</span> 去设置对应的属性<br><code>box-sizing:content-box;</code> <strong>标准盒模型：</strong><br><img src="'+o+'" style="zoom:35%;margin-left:5%;"><br> 在标准盒模型下，元素的宽（width）和高（height）值即为盒模型中内容（content）的实际宽高值:<br><span style="color:rgb(100, 181, 135);font-weight:600;">盒子宽度 = border 边框+padding 内边距+width</span><br><span style="color:rgb(100, 181, 135);font-weight:600;">页面占据宽度 = 盒子宽度+margin 外边距</span></p><p><code>box-sizing:border-box;</code> <strong>怪异盒模型：</strong><br><img src="'+e+`" style="zoom:35%;margin-left:5%;"><br> 在怪异盒模型下，元素的 width 和 height 值却不是 content 的实际宽高，而是去除 margin 后剩下的元素占用区域的宽高:<br><span style="color:rgb(100, 181, 135);font-weight:600;">盒子宽度 = width</span><br><span style="color:rgb(100, 181, 135);font-weight:600;">页面占据宽度 = width+margin 外边距</span></p><h2 id="定位" tabindex="-1">定位 <a class="header-anchor" href="#定位" aria-hidden="true">#</a></h2><p>CSS 有五种基本的定位机制：<code>static</code>(正常文档流定位)、<code>relative</code>(相对定位)、<code>absolute</code>(绝对定位)、<code>fixed</code>(固定定位)、<code>sticky</code>(黏性定位)</p><p><strong>static</strong>--正常文档流定位，static 中的元素的位置由元素在 (X)HTML 中的位置决定的。设置 top、right、bottom、left 以及 z-index 都无效</p><p><strong>relative</strong>--相对定位，relative 是相对正常文档流进行定位的，不影响其他元素的偏移。</p><p><strong>absolute</strong>--绝对定位，absolute 是相对于最近的已定位父元素，如果元素没有已定位的父元素，那么它的位置相对于<code>&lt;html&gt;</code></p><p><strong>fixed</strong>--固定定位，fixed 是相对于屏幕视口 viewport 来确定自己的位置。并且当屏幕滚动时，当前元素的位置也不会发生改变</p><p><strong>sticky</strong>--黏性定位，sticky 有点像 relative 和 fixed 的结合。当它的父元素在视口区域、并进入 top 值给定的范围内时，当前元素就以 fixed 的方式进行定位，否则就以 relative 的方式进行定位。</p><h2 id="flex-布局" tabindex="-1">Flex 布局 <a class="header-anchor" href="#flex-布局" aria-hidden="true">#</a></h2><p>在现在很多结构化布局中，都是在使用 flex 布局。基于 flex 精确灵活控制块级盒子的布局方式，避免浮动布局中脱离文档流现象发生。组成部分: 弹性容器 (父级)、弹性盒子 (子级)、主轴、侧轴、交叉轴。flex 语法如下：</p><p><strong>（1）主轴对齐方式:</strong><br> 使用<code>justify-content</code>属性调节元素在主轴的对齐方式</p><table><thead><tr><th>属性值</th><th>作用</th></tr></thead><tbody><tr><td>flex-start</td><td>默认值, 起点开始依次排列</td></tr><tr><td>flex-end</td><td>终点开始依次排列</td></tr><tr><td>center</td><td>沿主轴居中排列</td></tr><tr><td>space-around</td><td>弹性盒子沿主轴均匀排列, 空白间距均分在弹性盒子两侧</td></tr><tr><td>space-between</td><td>弹性盒子沿主轴均匀排列, 空白间距均分在相邻盒子之间</td></tr><tr><td>space-evenly</td><td>弹性盒子沿主轴均匀排列, 弹性盒子与容器之间间距相等</td></tr></tbody></table><p><strong>（2）侧轴对齐方式:</strong><br> 使用<code>align-items</code>调节元素在侧轴的对齐方式</p><table><thead><tr><th>属性值</th><th>作用</th></tr></thead><tbody><tr><td>flex-start</td><td>默认值, 起点开始依次排列</td></tr><tr><td>flex-end</td><td>终点开始依次排列</td></tr><tr><td>center</td><td>沿侧轴居中排列</td></tr><tr><td>stretch</td><td>默认值, 弹性盒子沿着主轴线被拉伸至铺满容器</td></tr></tbody></table><p><strong>（3）伸缩比：</strong><br> 使用<code>flex</code>来表示元素在父元素中所占的剩于尺寸。<code>flex</code>属性是<code>flex-grow</code>，<code>flex-shrink</code>和<code>flex-basis</code>属性的简写。</p><p><code>flex-grow</code>：定义项目的的放大比例，<code>flex-grow</code>属性定义项目的放大比例，默认为 0，即如果存在剩余空间，也不放大。flex-grow 的值只接受一个整数。为了更好理解 <code>flex</code> 属性，举个下列的例子：</p><blockquote><p>如果有 3 个弹性盒子，其中 2 个弹性盒子分别设置了 flex：1、flex：2。那么属性为 flex：2 的盒子所占剩余空间是多少呢？<br> 因为其中一个盒子默认为 flex 为 0。所以计算公式就是： (2/0+1+2) * 弹性容器中剩余宽度 + flex 为 2 的盒子宽度</p></blockquote><p><strong>（4）主轴方向：</strong><br> 使用 <code>flex-direction</code> 改变元素排列方向。主轴默认是水平方向, 侧轴默认是垂直方向</p><table><thead><tr><th>属性值</th><th>作用</th></tr></thead><tbody><tr><td>row</td><td>行, 水平(默认值)</td></tr><tr><td>column</td><td>列, 垂直</td></tr><tr><td>row-reverse</td><td>行, 从右向左</td></tr><tr><td>column-reverse</td><td>列, 从下向上</td></tr></tbody></table><p><strong>（5）弹性盒子换行：</strong><br> 使用 <code>flex-wrap</code> 实现弹性盒子多行排列效果<br> 弹性盒子换行显示 : <code>flex-wrap: wrap;</code> 调整行对齐方式: 使用 <code>align-content</code> 属性取值与 <code>justify-content</code>基本相同</p><h2 id="单位" tabindex="-1">单位 <a class="header-anchor" href="#单位" aria-hidden="true">#</a></h2><p><code>px</code>：px 像素，绝对单位。代表像素数量，页面会按照给出的精确像素进行展示</p><p><code>rem</code>：rem 是 CSS3 中新增单位，一般用于做移动端适配。它是相对单位。可以理解为 <code>root em</code>，即基准点为根元素<code>&lt;html&gt;</code>的字体大小</p><p><code>em</code>：em 是相对单位。默认的基准点为父元素的字体大小，而如果自身定义了字体大小则按自身的来算。所以即使在同一个页面内，1em 可能不是一个固定的值</p><p><code>vw</code>：vw 是相对于视口的宽度。视口被均分为 100 单位的 vw</p><p><code>vh</code>：vh 是相对视口的高度。视口被均分为 100 单位的 vh</p><p><code>vmax</code>：vmax 相对于视口的宽度或高度中较大的那个。其中最大的那个被均分为 100 单位的 vmax</p><p><code>vmin</code>：vmin 相对于视口的宽度或高度中较小的那个。其中最小的那个被均分为 100 单位的 vmin</p><h2 id="过渡" tabindex="-1">过渡 <a class="header-anchor" href="#过渡" aria-hidden="true">#</a></h2><p><strong>transition</strong> 允许 css 的属性值在一定时间区间内平滑的过渡。例在鼠标点击，鼠标滑过或对元素任何改变中触发，并圆滑地以动画形式改变 css 的属性值。过渡要设置给元素本身。</p><p>简写版过渡属性：<code>transition: property duration timing-function delay;</code></p><table><thead><tr><th>属性</th><th>说明</th><th>属性值</th></tr></thead><tbody><tr><td>property</td><td>过渡效果时将会启动指定的 CSS 属性的变化</td><td>all(所有属性)、none(都不)、property(属性列表)</td></tr><tr><td>duration</td><td>属性规定完成过渡效果需要花费的时间</td><td>数字（以秒或毫秒计,默认是 0，意味无效果）</td></tr><tr><td>timing-function</td><td>属性指定切换效果的速度</td><td>linear（匀速）,<a href="https://www.runoob.com/cssref/css3-pr-transition-timing-function.html" target="_blank" rel="noreferrer">详细见</a></td></tr><tr><td>delay</td><td>指定何时将开始切换(启动)效果</td><td>数字（以秒或毫秒计，默认为 0）</td></tr></tbody></table><blockquote><p>以上属性，单个写(非简写)的话需要再前面加上 <code>transition-</code></p></blockquote><h2 id="动画" tabindex="-1">动画 <a class="header-anchor" href="#动画" aria-hidden="true">#</a></h2><p><strong>animation</strong> 使元素从一种样式逐渐变化到另外一种样式的效果。</p><p>使用 animation 要先设定@keyframes 规则：keyframes 关键帧，用来决定动画变化的关键位置</p><div class="language-css"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">/* 使用from和to来代表阶段 */</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">@keyframes</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">动画名称</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">to</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">/* 还可以用百分比 */</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">@keyframes</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">动画名称</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">0%</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">10%</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">50%</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">100%</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>animation 缩写：<code>animation：name duration timing-function delay iteration-count direction fill-mode play-state;</code></p><table><thead><tr><th>属性</th><th>说明</th><th>属性值</th></tr></thead><tbody><tr><td>name</td><td>动画名称</td><td>@keyframes 定义的名字(随意)</td></tr><tr><td>duration</td><td>动画完成的时长</td><td>数字(以秒或毫秒计)</td></tr><tr><td>timing-function</td><td>速度曲线</td><td>linear(匀速)、<a href="https://www.runoob.com/cssref/css3-pr-animation-timing-function.html" target="_blank" rel="noreferrer">剩余详情见</a></td></tr><tr><td>delay</td><td>延迟时间</td><td>数字(以秒或毫秒计)</td></tr><tr><td>iteration-count</td><td>重复次数</td><td>infinite 值是永远运行、数字</td></tr><tr><td>direction</td><td>是否应该轮流反向播放动画</td><td>normal(默认值，正常播放)、<a href="https://www.runoob.com/cssref/css3-pr-animation.html" target="_blank" rel="noreferrer">剩余详情见</a></td></tr><tr><td>fill-mode</td><td>执行完毕时状态</td><td>forwards(设置对象状态为动画结束时候)、backwards(设置对象状态为动画开始时候第一帧)、both(设置对象状态为动画结束和开始的状态的综合体)</td></tr><tr><td>play-state</td><td>动画是否正在运行或已暂停</td><td>paused(指定暂停动画)、running(指定正在运行的动画)</td></tr></tbody></table><blockquote><p>以上属性，单个写(非简写)的话需要再前面加上 <code>animation-</code></p></blockquote><div class="language-css"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">box</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">width</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">200px</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">height</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">100px</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">background-color</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> pink</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;">/* 拆分写法 */</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">animation-name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> change</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">animation-duration</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1s</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">animation-iteration-count</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">animation-fill-mode</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> forwards</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;">/* 简写写法 */</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;">/* animation: change 1s 2 forwards; */</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">box</span><span style="color:#89DDFF;">:</span><span style="color:#C792EA;">hover</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;">/* 鼠标移入的时候暂停动画 */</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">animation-play-state</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> paused</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">@keyframes</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">change</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#B2CCD6;">width</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">200px</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">to</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#B2CCD6;">width</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">600px</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h2 id="opacity" tabindex="-1">opacity <a class="header-anchor" href="#opacity" aria-hidden="true">#</a></h2><p><strong>opacity</strong> 属性是设置元素的透明度(通俗来讲就是指定元素后面的背景的被覆盖程度)。当 opacity 属性的值应用于某个元素上时，是把这个元素（包括它的内容）当成一个整体看待，即使这个值没有被子元素继承。因此，一个元素和它包含的子元素都会具有和元素背景相同的透明度，哪怕这个元素和它的子元素有不同的 opacity 属性值。<br> 语法：<code>opacity: value|inherit;</code></p><table><thead><tr><th>值</th><th>说明</th></tr></thead><tbody><tr><td>value</td><td>规定不透明度，取值为 0.0(完全透明) ~ 1.0(完全不透明)</td></tr><tr><td>inherit</td><td>从父元素继承 opacity 属性的值</td></tr></tbody></table><h3 id="opacity-和-rgba-的区别" tabindex="-1">opacity 和 rgba 的区别 <a class="header-anchor" href="#opacity-和-rgba-的区别" aria-hidden="true">#</a></h3><blockquote><p>1.opacity 和 rgba 都能实现透明效果。但 opacity 是属性而 rgba 是属性值<br> 2.opacity 可以被后代继承，rgba 不继承<br> 3.opacity 作用的元素会连带子元素的所有内容透明度都进行改变。rgba 只会对作用元素的背景色进行改变</p></blockquote>`,50),r=[p];function c(d,i,y,C,D,h){return t(),a("div",null,r)}const g=s(l,[["render",c]]);export{A as __pageData,g as default};
