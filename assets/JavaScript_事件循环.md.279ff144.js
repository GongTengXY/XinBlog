import{_ as e,o as a,c as t,a as i}from"./app.adce981a.js";const v=JSON.parse('{"title":"事件循环","description":"","frontmatter":{},"headers":[{"level":2,"title":"同步任务","slug":"同步任务","link":"#同步任务","children":[]},{"level":2,"title":"异步任务","slug":"异步任务","link":"#异步任务","children":[{"level":3,"title":"宏任务","slug":"宏任务","link":"#宏任务","children":[]},{"level":3,"title":"微任务","slug":"微任务","link":"#微任务","children":[]}]}],"relativePath":"JavaScript/事件循环.md","lastUpdated":1741225150000}'),l={name:"JavaScript/事件循环.md"},r=i('<h1 id="事件循环" tabindex="-1">事件循环 <a class="header-anchor" href="#事件循环" aria-hidden="true">#</a></h1><div class="info custom-block"><p class="custom-block-title">前方引言</p><p>在讲解事件循环之前，我们先回顾一下相关知识点</p></div><p>JavaScript 是一门单线程执行的编程语言。也就是说，同一时间只能做一件事情。单线程执行任务队列的问题: 如果前一个任务非常耗时，则后续的任务就不得不一直等待，从而导致程序假死的问题。为了防止某个耗时任务导致程序假死的问题，JavaScript 把待执行的任务分为了两类:</p><h2 id="同步任务" tabindex="-1">同步任务 <a class="header-anchor" href="#同步任务" aria-hidden="true">#</a></h2><p>又叫做非耗时任务，指的是在<strong>主线程</strong>上排队执行的那些任务，只有前一个任务执行完毕，才能执行后一个任务</p><h2 id="异步任务" tabindex="-1">异步任务 <a class="header-anchor" href="#异步任务" aria-hidden="true">#</a></h2><p>不直接在主线程上执行的任务，它们会先被放入任务队列中，等到主线程空闲时才执行。</p><p><strong>异步任务的分类:</strong></p><p>异步任务又分为<strong>宏任务</strong>、<strong>微任务</strong>，</p><ul><li>宏任务：常见的宏任务包括： <ul><li>setTimeout</li><li>setInterval</li><li>I/O 操作</li><li>UI 事件等等</li></ul></li><li>微任务：常见的微任务包括： <ul><li>Promise.then</li><li>MutationObserver</li><li>process.nextTick 等等</li></ul></li></ul><h3 id="宏任务" tabindex="-1">宏任务 <a class="header-anchor" href="#宏任务" aria-hidden="true">#</a></h3><h3 id="微任务" tabindex="-1">微任务 <a class="header-anchor" href="#微任务" aria-hidden="true">#</a></h3>',12),s=[r];function n(c,d,o,h,p,_){return a(),t("div",null,s)}const f=e(l,[["render",n]]);export{v as __pageData,f as default};
