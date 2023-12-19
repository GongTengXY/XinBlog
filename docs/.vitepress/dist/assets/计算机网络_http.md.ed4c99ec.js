import{_ as e,o as t,c as o,a as p}from"./app.7754c15c.js";const l="/computer1.png",c="/computer2.png",i="/computer3.png",_=JSON.parse('{"title":"HTTP 历程","description":"","frontmatter":{},"headers":[{"level":2,"title":"网络分层","slug":"网络分层","link":"#网络分层","children":[{"level":3,"title":"1、物理层：","slug":"_1、物理层","link":"#_1、物理层","children":[]},{"level":3,"title":"2、数据链路层：","slug":"_2、数据链路层","link":"#_2、数据链路层","children":[]},{"level":3,"title":"3、网络层：","slug":"_3、网络层","link":"#_3、网络层","children":[]},{"level":3,"title":"4、传输层：","slug":"_4、传输层","link":"#_4、传输层","children":[]},{"level":3,"title":"5、应用层：","slug":"_5、应用层","link":"#_5、应用层","children":[]},{"level":3,"title":"http 请求流程：","slug":"http-请求流程","link":"#http-请求流程","children":[]}]},{"level":2,"title":"HTTP 0.9","slug":"http-0-9","link":"#http-0-9","children":[]},{"level":2,"title":"HTTP 1.0","slug":"http-1-0","link":"#http-1-0","children":[]},{"level":2,"title":"HTTP 1.1","slug":"http-1-1","link":"#http-1-1","children":[]},{"level":2,"title":"HTTP 2.0","slug":"http-2-0","link":"#http-2-0","children":[]},{"level":2,"title":"HTTP 3.0","slug":"http-3-0","link":"#http-3-0","children":[]}],"relativePath":"计算机网络/http.md","lastUpdated":1702890600000}'),d={name:"计算机网络/http.md"},r=p('<h1 id="http-历程" tabindex="-1">HTTP 历程 <a class="header-anchor" href="#http-历程" aria-hidden="true">#</a></h1><p>大家都知道在<code>http://www.baidu.com/</code>输入的过程，实际上就是一个 HTTP 请求。很明显这串网址的开头使用的是 http 协议名。那我们就好好讲一下 http 协议的历程吧。</p><div class="info custom-block"><p class="custom-block-title">OSI 7 层模型</p><p>想要理解 http 的历程，首先需要了解计算机网络分层</p></div><h2 id="网络分层" tabindex="-1">网络分层 <a class="header-anchor" href="#网络分层" aria-hidden="true">#</a></h2><p>网络分层的基本作用，来看看网络分层的几种方式。<strong>标准的七层网络分层，也就是 OSI 七层模型。TCP/IP 五层模型和 TCP/IP 四层模型是从 OSI 七层优化而来</strong>。</p><p>首先看一下网络层级模型： <img src="'+l+'" style="zoom:40%;margin-left:5%;"></p><p>我们将 7 层中每个层对应的协议看一下：</p><img src="'+c+'" style="zoom:40%;margin-left:5%;"><h3 id="_1、物理层" tabindex="-1">1、物理层： <a class="header-anchor" href="#_1、物理层" aria-hidden="true">#</a></h3><p>主要作用是定义物理设备如何传输数据（就像我们使用的光缆、网线、网线端口）</p><h3 id="_2、数据链路层" tabindex="-1">2、数据链路层： <a class="header-anchor" href="#_2、数据链路层" aria-hidden="true">#</a></h3><p>通讯实体间建立数据链路进行连接。数据链路层的功能就是通过规定一套协议来定义电信号的分组方式，以及规定不同的组代表什么意思，从而双方计算机都能够进行识别，这个协议就是“以太网协议”。</p><p><strong>以太网协议规定</strong>：一组电信号构成一个数据包，我们把这个数据包称之为帧。</p><h3 id="_3、网络层" tabindex="-1">3、网络层： <a class="header-anchor" href="#_3、网络层" aria-hidden="true">#</a></h3><p>为数据在各节点之间传输创建逻辑链路（其意思就是说，输入网址然后解析域名查找 ip，这就是一个逻辑关系。而我们的网络层也就是为它们创建逻辑关系）</p><h3 id="_4、传输层" tabindex="-1">4、传输层： <a class="header-anchor" href="#_4、传输层" aria-hidden="true">#</a></h3><p>数据传输都是定义在这一层（传输层的功能就是建立端口到端口的通信，使得数据能够正确的传送给不同的应用程序。）</p><p><strong>TCP</strong> :一种面向连接的、可靠的、基于字节流的传输层通信协议</p><p><strong>UDP</strong> :一种无连接的传输层协议，提供面向事务的简单不可靠信息传送服务</p><div class="tip custom-block"><p class="custom-block-title">两者的区别</p><p>1、TCP 有连接、UDP 无连接</p><p>2、TCP 走的全双工的可靠信道，UDP 走得多是不可靠信道</p><p>3、TCP 只能一对一，UDP 可以一对一、多对一、多对多的交互通信</p></div><h3 id="_5、应用层" tabindex="-1">5、应用层： <a class="header-anchor" href="#_5、应用层" aria-hidden="true">#</a></h3><p>为应用软件提供很多服务（应用层的功能就是规定了应用程序的数据格式）</p><h3 id="http-请求流程" tabindex="-1">http 请求流程： <a class="header-anchor" href="#http-请求流程" aria-hidden="true">#</a></h3><p><strong>从 TCP/IP 五层模型上分析：</strong></p><p>以 HTTP 请求为例，来梳理一下整个网络分层中各种的职责与处理流程。在整个通信过程中，就像俄罗斯套娃一样，一层层的包装起来，然后再一层层的打开。</p><img src="'+i+'" style="margin-bottom:5%;"><div class="tip custom-block"><p class="custom-block-title">经典面试题：从输入 url 地址到浏览器呈现分析</p><p>1、对输入的 url 地址进行 DNS 域名解析获取 IP，先在浏览器本身的 DNS 缓存查找=&gt;系统自身的 DNS 缓存=&gt;电脑系统的 hosts 文件中查找=&gt;递归地去域名服务器去查找。</p><p>2、根据找到的 IP 地址，找到对应的服务器，发起 TCP 三次握手。</p><p>3、建立了 TCP 后，发起 http 请求</p><p>4、服务器响应 http 请求，浏览器得到返回的 html 资源</p><p>5、浏览器解析 html 资源，并根据 html 代码获取其中的资源。</p><p>6、解析 html 文件生成 DOM 树，解析 css 文件生成 CSSOM 规则树</p><p>7、根据 DOM 树和 CSSOM 规则树，生成 render tree（渲染树），进行布局绘制，最后将渲染好的页面呈现出来。</p></div><h2 id="http-0-9" tabindex="-1">HTTP 0.9 <a class="header-anchor" href="#http-0-9" aria-hidden="true">#</a></h2><p>HTTP0.9 协议，是最早的 HTTP 协议，它是一种无状态的协议，也就是说，服务器不知道客户端的状态。由于没有协议头，造成 HTTP/0.9 只支持传输纯文本和 HTML 文件（不能插入图片、视频等其他格式）。</p><p>HTTP0.9 协议的特点是：</p><ul><li>无状态：服务器不知道客户端的状态，每次请求都是独立的。</li><li>简单快速：客户向服务器请求一个页面，服务器返回一个完整的 HTML 页面。</li></ul><h2 id="http-1-0" tabindex="-1">HTTP 1.0 <a class="header-anchor" href="#http-1-0" aria-hidden="true">#</a></h2><p>HTTP1.0 协议，是 HTTP0.9 的升级版，它在 HTTP0.9 的基础上进行改进。</p><p>HTTP1.0 协议的特点是：</p><ul><li><p>丰富了请求方式：post</p></li><li><p>增加 HTTP 头的概念：无论对请求还是响应，允许传输元数据，使协议变得非常灵活，更具扩展性。在 HTTP 头的帮助下，具备除传输文本 HTML 以外其他类型文档的能力</p></li><li><p>增加状态码：使客户端了解请求执行成功或失败，并相应调整行为（如更新或使用本地缓存）。</p></li><li><p>增加缓存机制：强缓存中的 expires 字段和协商缓存中的 last-modified 字段</p></li></ul><p><strong>缺陷</strong></p><div class="warning custom-block"><p class="custom-block-title">存在问题</p><p>1、短链接：TCP 连接无法复用，即每次请求都需要与服务器建立 TCP 连接，完成请求处理后立刻断开连接。</p><p>2、带宽浪费：客户端无法请求某个对象的一部分。</p><p>3、队头阻塞：即当页面需请求多资源时，队头阻塞会导致请求达到阈值时，剩余资源需等待先前资源完成后才可发起请求，带宽无法被充分利用。</p><p>因为在 http1.0 的时候，每个 TCP 连接只能发送一个请求，连接完就关闭。还想请求别的，就需要重新建立连接。建立 TCP 连接的成本很高，都知道建立 TCP 连接是需要进行 3 次握手的。后来就有人使用<code>Connection：keep-alive</code>进行长连接，复用之前建立的 TCP 连接（但这个字段是非标准的）</p></div><h2 id="http-1-1" tabindex="-1">HTTP 1.1 <a class="header-anchor" href="#http-1-1" aria-hidden="true">#</a></h2><p>HTTP1.1 协议，是 HTTP1.0 协议的升级版，主要改进如下：</p><ul><li><p><strong>缓存处理</strong>：http1.0 的时候使用的强缓存是 expires，所以新增了 <code>cache-control</code> 字段。当未命中强缓存的时候，使用协商缓存 <code>Last-Modified/If-modified-since</code>，所以新增了 <code>Etag/If-None-Match</code> 这样的字段。</p></li><li><p><strong>带宽优化</strong>：HTTP1.0 中，存在一些浪费带宽的现象，例如客户端只是需要某个对象的一部分，而服务器却将整个对象送过来了，并且不支持断点续传功能，HTTP1.1 则在请求头引入了**<code>range</code>**头域，它允许只请求资源的某个部分，即返回码是 206，这样就方便了开发者自由的选择以便于充分利用带宽和连接。</p></li><li><p><strong>Host 头处理</strong>：在 HTTP1.0 中认为每台服务器都绑定一个唯一的 IP 地址，因此，请求消息中的 URL 并没有传递主机名（hostname）。但随着虚拟主机技术的发展，在一台物理服务器上可以存在多个虚拟主机（Multi-homed Web Servers），并且它们共享一个 IP 地址。HTTP1.1 的请求消息和响应消息都应支持 Host 头域，且请求消息中如果没有 Host 头域会报告一个错误（400 Bad Request）。</p></li><li><p><strong>持久连接（长连接）</strong>：HTTP/1.1 默认开启长连接（<code>Connection：keep-alive</code>），可在一个 TCP 连接上传送多个 HTTP 请求和响应，减少建立、关闭连接的消耗和延迟。<code>keep-alive</code> 是有时间限制的，这个时间可通过设置 HTTP 进程的配置文件来修改，这个时间很短，超出时间后，又需要重新建立连接，所以还是无状态的。</p></li></ul><p><strong>长连接使 TCP 连接可复用，但是当非常多请求时进行并发连接，也就是同时对一个域名建立多个 TCP 长连接来解决同时发起多个请求造成堵塞的问题</strong></p><div class="warning custom-block"><p class="custom-block-title">存在问题</p><p>1、队头阻塞：当顺序发送的请求序列中的一个请求因为某种原因被阻塞时，在后面排队的所有请求也一并被阻塞，会导致客户端迟迟收不到数据</p><p>2、无状态性：协议对于连接状态没有记忆能力，<code>Header里携带的内容过大，在一定程度上增加了传输的成本</code>。更要命的是，请求响应报文里有大量字段值都是重复的，非常浪费。</p><p>3、明文传输（不安全性）：HTTP/1.1 在传输数据时，所有传输的内容都是<code>明文</code>，客户端和服务器端都无法验证对方的身份，这在一定程度上无法保证数据的安全性。(报文的头信息必须是文本（ASCII 编码），数据体可以是文本，也可以是二进制。)</p></div><h2 id="http-2-0" tabindex="-1">HTTP 2.0 <a class="header-anchor" href="#http-2-0" aria-hidden="true">#</a></h2><p>HTTP2.0 协议，是 HTTP1.1 协议的升级版，主要改进如下：</p><ul><li><p><strong>二进制传输</strong>：HTTP/2 采用二进制格式传输数据，而非 HTTP/1.x 里纯文本形式的报文 ，二进制协议解析起来更高效。HTTP/2 将请求和响应数据分割为更小的帧，并且它们采用<strong>二进制编码</strong>。</p></li><li><p><strong>多路复用</strong>：HTTP2.0 同个域名只需要占用一个 TCP 连接，使用一个连接并行发送多个请求和响应,这样整个页面资源的下载过程只需要一次慢启动，同时也避免了多个 TCP 连接竞争带宽所带来的问题。</p></li><li><p><strong>Header 压缩</strong>：HTTP/2 并没有使用传统的压缩算法，而是开发了专门的<code>HPACK</code>算法，在客户端和服务器两端建立“字典”，用索引号表示重复的字符串，还采用**<code>哈夫曼编码</code>**来压缩整数和字符串，可以达到 50%~90 %的高压缩率</p></li><li><p><strong>服务端主动推送</strong>：允许服务器主动向客户推送数据。除最初请求的响应外，服务器还可以额外向浏览器端推送资源，无需浏览器端再次请求。<code>HTTP2.0</code> 出现不能代替 <code>WebSocket</code>，因其无法将数据传输到客户端 APP 本身。</p></li></ul><div class="warning custom-block"><p class="custom-block-title">存在问题</p><p>HTTP2.0 解决了应用层对头阻塞的问题,但是 TCP 本身的对头阻塞问题没有解决</p><p>在 HTTP/2 中，多个请求是跑在一个 TCP 管道中的。但当出现了丢包时，HTTP/2 的表现反倒不如 HTTP/1 了。因为 TCP 为了保证可靠传输，有个特别的“<code>丢包重传</code>”机制，<code>丢失的包必须要等待重新传输确认</code>，HTTP/2 出现丢包时，整个 TCP 都要开始等待重传，那么就会阻塞该 TCP 连接中的所有请求。而对于 HTTP/1.1 来说，可以开启多个 TCP 连接，出现这种情况反到只会影响其中一个连接，剩余的 TCP 连接还可以正常传输数据。</p></div><blockquote><p>其实对于现在市场协议使用，大多都还是 http1.1，http2.0 的市场只有大约不到 40%</p></blockquote><h2 id="http-3-0" tabindex="-1">HTTP 3.0 <a class="header-anchor" href="#http-3-0" aria-hidden="true">#</a></h2><p><strong>HTTP3.0</strong>，也称作 HTTP over QUIC。HTTP3.0 的核心是 <code>QUIC</code>(读音 quick)协议，由 Google 在 2015 年提出的 SPDY v3 演化而来的新协议，传统的 <code>HTTP</code> 协议是基于传输层 <code>TCP </code>的协议，而 <code>QUIC</code> 是基于传输层 <code>UDP</code> 上的协议，可以定义成：HTTP3.0 基于 UDP 的安全可靠的 HTTP2.0 协议。</p><p>其优点如下：</p><ul><li><p><strong>减少了 TCP 三次握手及 TLS 握手时间：</strong> 不管是<code>HTTP1.0/1.1</code>还是 <code>HTTPS</code>，<code>HTTP2.0</code>，都使用了<code>TCP</code>进行传输。<code>HTTPS</code>和<code>HTTP2</code>还需要使用<code>TLS协议</code>来进行安全传输。这就出现了两个握手延迟，而基于<code>UDP协议</code>的 QUIC，因为<code>UDP</code> 本身没有连接的概念，连接建立时只需要一次交互，半个握手的时间</p></li><li><p><strong>多路复用丢包时的线头阻塞问题：</strong> <code>QUIC</code>保留了<code>HTTP2.0</code>多路复用的特性，但是即使在多路复用过程中，同一个 TCP 连接上有多个<code>stream</code>，假如其中一个 stream 丢包，在重传前后续的 stream 都会受到影响，而 QUIC 中一个连接上的多个 stream 之间没有依赖。所以当发生丢包时，只会影响当前的 stream，也就避免了线头阻塞问题。</p></li></ul><blockquote><p>到此为止 http 的历程就讲完了，重在理解吧，实在不行只能老老实实背。加油</p></blockquote>',52),s=[r];function a(T,n,h,P,g,H){return t(),o("div",null,s)}const m=e(d,[["render",a]]);export{_ as __pageData,m as default};
