# CSS3 精简版

## 盒子模型

浏览器的渲染引擎在对网页文档进行布局时，会按照 “CSS 基础盒模型” （CSS Basic Box Model）标准，将文档中的所有元素都表示为一个个矩形的盒子，再用 CSS 去决定这些盒子的大小尺寸、显示位置、以及其他属性（如颜色、背景、边框等）。

在目前 CSS3 中，我们是可以通过 <span style="color: rgb(100, 181, 135);fontWeight:600">box-sizing</span> 去设置对应的属性  
`box-sizing:content-box;` **标准盒模型：**  
<img src="/Images/image-20210214150511841.png" style="zoom:35%; margin-left:5%"/>  
在标准盒模型下，元素的宽（width）和高（height）值即为盒模型中内容（content）的实际宽高值:  
<span style="color: rgb(100, 181, 135);fontWeight:600">盒子宽度 = border 边框+padding 内边距+width</span>  
<span style="color: rgb(100, 181, 135);fontWeight:600">页面占据宽度 = 盒子宽度+margin 外边距</span>

`box-sizing:border-box;` **怪异盒模型：**  
<img src="/Images/image-20210214151037552.png" style="zoom:35%; margin-left:5%"/>  
在怪异盒模型下，元素的 width 和 height 值却不是 content 的实际宽高，而是去除 margin 后剩下的元素占用区域的宽高:  
<span style="color: rgb(100, 181, 135);fontWeight:600">盒子宽度 = width</span>  
<span style="color: rgb(100, 181, 135);fontWeight:600">页面占据宽度 = width+margin 外边距</span>

## 定位

CSS 有五种基本的定位机制：`static`(正常文档流定位)、`relative`(相对定位)、`absolute`(绝对定位)、`fixed`(固定定位)、`sticky`(黏性定位)

**static**--正常文档流定位，static 中的元素的位置由元素在 (X)HTML 中的位置决定的。设置 top、right、bottom、left 以及 z-index 都无效

**relative**--相对定位，relative 是相对正常文档流进行定位的，不影响其他元素的偏移。

**absolute**--绝对定位，absolute 是相对于最近的已定位父元素，如果元素没有已定位的父元素，那么它的位置相对于`<html>`

**fixed**--固定定位，fixed 是相对于屏幕视口 viewport 来确定自己的位置。并且当屏幕滚动时，当前元素的位置也不会发生改变

**sticky**--黏性定位，sticky 有点像 relative 和 fixed 的结合。当它的父元素在视口区域、并进入 top 值给定的范围内时，当前元素就以 fixed 的方式进行定位，否则就以 relative 的方式进行定位。

## Flex 布局

在现在很多结构化布局中，都是在使用 flex 布局。基于 flex 精确灵活控制块级盒子的布局方式，避免浮动布局中脱离文档流现象发生。组成部分: 弹性容器 (父级)、弹性盒子 (子级)、主轴、侧轴、交叉轴。flex 语法如下：

**（1）主轴对齐方式:**  
使用`justify-content`属性调节元素在主轴的对齐方式
| 属性值 | 作用 |
|-------|--------------------|
|flex-start| 默认值, 起点开始依次排列|
|flex-end | 终点开始依次排列|
|center | 沿主轴居中排列|
|space-around | 弹性盒子沿主轴均匀排列, 空白间距均分在弹性盒子两侧|
|space-between | 弹性盒子沿主轴均匀排列, 空白间距均分在相邻盒子之间|
|space-evenly | 弹性盒子沿主轴均匀排列, 弹性盒子与容器之间间距相等|

**（2）侧轴对齐方式:**  
使用`align-items`调节元素在侧轴的对齐方式  
| 属性值 | 作用 |
|-------|--------------------|
|flex-start| 默认值, 起点开始依次排列|
|flex-end | 终点开始依次排列|
|center | 沿侧轴居中排列|
|stretch | 默认值, 弹性盒子沿着主轴线被拉伸至铺满容器|

**（3）伸缩比：**  
使用`flex`来表示元素在父元素中所占的剩于尺寸。`flex`属性是`flex-grow`，`flex-shrink`和`flex-basis`属性的简写。

`flex-grow`：定义项目的的放大比例，`flex-grow`属性定义项目的放大比例，默认为 0，即如果存在剩余空间，也不放大。flex-grow 的值只接受一个整数。为了更好理解 `flex` 属性，举个下列的例子：

> 如果有 3 个弹性盒子，其中 2 个弹性盒子分别设置了 flex：1、flex：2。那么属性为 flex：2 的盒子所占剩余空间是多少呢？  
> 因为其中一个盒子默认为 flex 为 0。所以计算公式就是： (2/0+1+2) \* 弹性容器中剩余宽度 + flex 为 2 的盒子宽度

**（4）主轴方向：**  
使用 `flex-direction` 改变元素排列方向。主轴默认是水平方向, 侧轴默认是垂直方向
| 属性值 | 作用 |
|-------|--------------------|
|row | 行, 水平(默认值)|
|column | 列, 垂直|
|row-reverse | 行, 从右向左|
|column-reverse | 列, 从下向上|

**（5）弹性盒子换行：**  
使用 `flex-wrap` 实现弹性盒子多行排列效果  
弹性盒子换行显示 : `flex-wrap: wrap;`
调整行对齐方式: 使用 `align-content` 属性取值与 `justify-content`基本相同

## 单位

`px`：px 像素，绝对单位。代表像素数量，页面会按照给出的精确像素进行展示

`rem`：rem 是 CSS3 中新增单位，一般用于做移动端适配。它是相对单位。可以理解为 `root em`，即基准点为根元素`<html>`的字体大小

`em`：em 是相对单位。默认的基准点为父元素的字体大小，而如果自身定义了字体大小则按自身的来算。所以即使在同一个页面内，1em 可能不是一个固定的值

`vw`：vw 是相对于视口的宽度。视口被均分为 100 单位的 vw

`vh`：vh 是相对视口的高度。视口被均分为 100 单位的 vh

`vmax`：vmax 相对于视口的宽度或高度中较大的那个。其中最大的那个被均分为 100 单位的 vmax

`vmin`：vmin 相对于视口的宽度或高度中较小的那个。其中最小的那个被均分为 100 单位的 vmin

## 过渡

**transition** 允许 css 的属性值在一定时间区间内平滑的过渡。例在鼠标点击，鼠标滑过或对元素任何改变中触发，并圆滑地以动画形式改变 css 的属性值。过渡要设置给元素本身。

简写版过渡属性：`transition: property duration timing-function delay;`

| 属性            | 说明                                    | 属性值                                                                                         |
| --------------- | --------------------------------------- | ---------------------------------------------------------------------------------------------- |
| property        | 过渡效果时将会启动指定的 CSS 属性的变化 | all(所有属性)、none(都不)、property(属性列表)                                                  |
| duration        | 属性规定完成过渡效果需要花费的时间      | 数字（以秒或毫秒计,默认是 0，意味无效果）                                                      |
| timing-function | 属性指定切换效果的速度                  | linear（匀速）,[详细见](https://www.runoob.com/cssref/css3-pr-transition-timing-function.html) |
| delay           | 指定何时将开始切换(启动)效果            | 数字（以秒或毫秒计，默认为 0）                                                                 |

> 以上属性，单个写(非简写)的话需要再前面加上 `transition-`

## 动画

**animation** 使元素从一种样式逐渐变化到另外一种样式的效果。

使用 animation 要先设定@keyframes 规则：keyframes 关键帧，用来决定动画变化的关键位置

```css
/* 使用from和to来代表阶段 */
@keyframes 动画名称 {
  from {
  }
  to {
  }
}
/* 还可以用百分比 */
@keyframes 动画名称 {
  0% {
  }
  10% {
  }
  50% {
  }
  100% {
  }
}
```

animation 缩写：`animation：name duration timing-function delay iteration-count direction fill-mode play-state;`

| 属性            | 说明                     | 属性值                                                                                                                              |
| --------------- | ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| name            | 动画名称                 | @keyframes 定义的名字(随意)                                                                                                         |
| duration        | 动画完成的时长           | 数字(以秒或毫秒计)                                                                                                                  |
| timing-function | 速度曲线                 | linear(匀速)、[剩余详情见](https://www.runoob.com/cssref/css3-pr-animation-timing-function.html)                                    |
| delay           | 延迟时间                 | 数字(以秒或毫秒计)                                                                                                                  |
| iteration-count | 重复次数                 | infinite 值是永远运行、数字                                                                                                         |
| direction       | 是否应该轮流反向播放动画 | normal(默认值，正常播放)、[剩余详情见](https://www.runoob.com/cssref/css3-pr-animation.html)                                        |
| fill-mode       | 执行完毕时状态           | forwards(设置对象状态为动画结束时候)、backwards(设置对象状态为动画开始时候第一帧)、both(设置对象状态为动画结束和开始的状态的综合体) |
| play-state      | 动画是否正在运行或已暂停 | paused(指定暂停动画)、running(指定正在运行的动画)                                                                                   |

> 以上属性，单个写(非简写)的话需要再前面加上 `animation-`

```css
.box {
  width: 200px;
  height: 100px;
  background-color: pink;

  /* 拆分写法 */
  animation-name: change;
  animation-duration: 1s;
  animation-iteration-count: 2;
  animation-fill-mode: forwards;

  /* 简写写法 */
  /* animation: change 1s 2 forwards; */
}

.box:hover {
  /* 鼠标移入的时候暂停动画 */
  animation-play-state: paused;
}

@keyframes change {
  from {
    width: 200px;
  }
  to {
    width: 600px;
  }
}
```

## opacity

**opacity** 属性是设置元素的透明度(通俗来讲就是指定元素后面的背景的被覆盖程度)。当 opacity 属性的值应用于某个元素上时，是把这个元素（包括它的内容）当成一个整体看待，即使这个值没有被子元素继承。因此，一个元素和它包含的子元素都会具有和元素背景相同的透明度，哪怕这个元素和它的子元素有不同的 opacity 属性值。  
语法：`opacity: value|inherit;`
| 值 | 说明 |
|-----|-------|
|value|规定不透明度，取值为 0.0(完全透明) ~ 1.0(完全不透明)|
|inherit|从父元素继承 opacity 属性的值|

### opacity 和 rgba 的区别

> 1.opacity 和 rgba 都能实现透明效果。但 opacity 是属性而 rgba 是属性值  
> 2.opacity 可以被后代继承，rgba 不继承  
> 3.opacity 作用的元素会连带子元素的所有内容透明度都进行改变。rgba 只会对作用元素的背景色进行改变
