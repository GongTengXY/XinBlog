# 重温 computed

## Vue2 computed 源码解读

在使用 Vue2 中写组件的时候，vue 都会对组件进行初始化。在 vue 中有一个`initState`函数。那我们就以此函数为例来讲解。

### 初始化

有了解过 vue 源码的同学都知道，vue 组件的初始化函数 `initState` 函数，在此函数中会对组件的 options 做对应的处理。首先会判别 options 中是否有 computed 属性。然后使用`initComputed`再对 computed 计算属性进行初始化。

```ts
function initState(vm: Component) {
  const opts = vm.$options;
  // 处理 data
  if (opts.data) {
    initData(vm);
  }
  // 省略........

  //如果有计算属性，则初始化计算属性
  if (opts.computed) {
    initComputed(vm, opts.computed);
  }
  // 省略........
}
```

那我们再看看 `initComputed` 函数

```ts
function initComputed(vm: Component, computed: Object) {
  // $flow-disable-line
  const watchers = (vm._computedWatchers = Object.create(null));
  // computed properties are just getters during SSR
  const isSSR = isServerRendering();

  for (const key in computed) {
    const userDef = computed[key];
    const getter = typeof userDef === "function" ? userDef : userDef.get;
    if (process.env.NODE_ENV !== "production" && getter == null) {
      warn(`Getter is missing for computed property "${key}".`, vm);
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      //为这个属性从创建一个观察者
      watchers[key] = new Watcher(
        vm,
        //这个getter就是这个的回调函数  当这个属性更新的时候,就会触发
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (process.env.NODE_ENV !== "production") {
      if (key in vm.$data) {
        warn(`The computed property "${key}" is already defined in data.`, vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(
          `The computed property "${key}" is already defined as a prop.`,
          vm
        );
      }
    }
  }
}
```

首先我们创建了一个 `watchers`，我们使用 `Object.create()` 创建的对象来存储计算数据的观察者，并且遍历 computed 对象属性，为每个 computed 对象属性创建一个 `Watcher` 观察者。再然后我们对每个属性都进行了判断，是都在 data 或者 props 里面定义过了，如果是，则抛出错误，如果不是则进行 `defineComputed(vm, key, userDef)`，这里的 userDef 就是那个函数或者包含 get 的对象，`defineComputed` 函数的代码看起来稍繁琐一些，我在这里说直接说结果吧，`defineComputed`先是会返回一个名为 `sharedPropertyDefinition`的对象。 ,最后 vue 通过 `Object.defineProperty` 会在组件实例中添加计算属性的 key。从而在模版中使用计算属性 key 值时拿到计算的数值。可以参考下列代码块理解。

```js
/* 
 sharedPropertyDefinition对象，用于vue通过Object.defineProperty的属性描述。
 Object.defineProperty(target, key, sharedPropertyDefinition)
*/

sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: createComputedGetter(key),
  set: userDef.set,
};

// 这里的 createComputedGetter 函数 就是后面我们要说的收集依赖阶段
```

### 收集依赖

上面基本上就是计算属性的初始化了，当我们要用到这个计算属性的时候,因为我们在实例上添加了这个属性嘛，所以会触发这个属性的 get 函数，而 get 我们重写了，返回的是一个函数，我们开看看 get 被重写成什么样子了

```js
function createComputedGetter(key) {
  //当我们获取计算属性的时候，就会返回这个computedGetter,然后取出计算属性的这个观察者，
  return function computedGetter() {
    const watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      //watcher.dirty就代表是否需要重新求值
      if (watcher.dirty) {
        //获取这个属性的时候就会触发evaluate把dirty改成false 在update的时候根据lazy改dirty为true  就触发get 触发get 就执行那个getter
        watcher.evaluate();
        //
      }
      //收集这个依赖
      if (Dep.target) {
        watcher.depend();
      }
      //这个watcher.value 就是get()的执行结果 也就是getter的执行结果也就是那个函数的执行结果
      //如果没有进行watcher.evaluate() 那么值就不会变。 就直接返回之前的value
      return watcher.value;
    }
  };
}
```

其中观察者 watcher 的 value 属性就是我们计算属性触发 get 函数获取的数据，其 evaluate 属性的结构如下

```js
/*
 这里的get函数就是观察者的get()函数
*/

  evaluate () {
    this.value = this.get()
    //更新过后 dirty变成了false
    this.dirty = false
  }

// ----------------------------------

/*
 观察者的get函数
*/

 get () {
    pushTarget(this)
    let value
    const vm = this.vm
    try {
      //getter就是那个更新函数 对于渲染函数而言 getter就是 updateComponent 里面执行_update
      //如果是渲染函数 value就是undefined

      //对于其他watcher而言 getter就是获取那个的值的函数 会触发get
      //如果是计算属性  那么触发a.get  a就会收集这个计算属性的watcher 当a变化的时候 就通知到这个watcher
      value = this.getter.call(vm, vm)
    } catch (e) {
      if (this.user) {
        handleError(e, vm, `getter for watcher "${this.expression}"`)
      } else {
        throw e
      }
    } finally {
      // "touch" every property so they are all tracked as
      // dependencies for deep watching
      //如果是深度观察
      if (this.deep) {
        traverse(value)
      }
      popTarget()
      this.cleanupDeps()
    }
    return value
  }

```

get() 函数中重要的就是将计算属性的观察者存储到 `Dep.target`。  
上述 get 函数中的 `this.getter.call(vm, vm)` 中的 getter 函数就是我们在 `computed` 中传入的函数，获取里面依赖的属性值，获取计算的结果。在获取计的过程中触发 `computed` 中函数所依赖的属性自带的 get 函数（也就是 initState 时给每个 data 属性响应式的 getter 函数），然后将计算属性的观察者 watcher 添加到那些依赖的属性自带的 dep 中，以此来完成依赖收集

所得结论就是。**在渲染函数完成后，初始化计算属性这些配置项，所以计算属性的观察者的 dep 收集的就是渲染函数中的观察者。**

### 触发依赖

当计算属性中的观察者发现所需的依赖发生改变时，就会触发这些依赖自己本身的 set 函数，修改自己的值。这样一来，发生变更的依赖会执行 `dep.notify()` 来通知 dep 里面所有的 watcher 实例发生更新，当然这就包括计算属性的 watcher，因此就会重新计算结果。

## 总结

当组件实例触发生命周期函数 `beforeCreate` 后，它会做一系列事情，其中就包括对 computed 的处理

它会遍历 computed 配置中的所有属性，为每一个属性创建一个 `Watcher` 对象，并传入一个函数，该函数的本质其实就是 `computed` 配置中的 getter，这样一来，getter 运行过程中就会收集依赖

但是和渲染函数不同，为计算属性创建的 Watcher 不会立即执行，因为要考虑到该计算属性是否会被渲染函数使用，如果没有使用，就不会得到执行。因此，在创建 Watcher 的时候，它使用了 `lazy` 配置，lazy 配置可以让 Watcher 不会立即执行。

收到 lazy 的影响，Watcher 内部会保存两个关键属性来实现缓存，一个是 `value`，一个是`dirty`

`value` 属性用于保存 `Watcher` 运行的结果，受`lazy`的影响，该值在最开始是`undefined`

dirty 属性用于指示当前的 value 是否已经过时了，即是否为脏值，受 lazy 的影响，该值在最开始是 true

`Watcher` 创建好后，vue 会使用代理模式，将计算属性挂载到组件实例中

当读取计算属性时，vue 检查其对应的 Watcher 是否是脏值，如果是，则运行函数，计算依赖，并得到对应的值，保存在 `Watcher` 的 value 中，然后设置 `dirty` 为 false，然后返回。

如果 `dirty` 为 false，则直接返回 watcher 的 value，即为缓存的原理 巧妙的是，在依赖收集时，被依赖的数据不仅会收集到计算属性的 Watcher，还会收集到组件的 Watcher

当计算属性的依赖变化时，会先触发计算属性的 Watcher 执行，此时，它只需设置**dirty**为 true 即可，不做任何处理。

由于依赖同时会收集到组件的`Watcher`，因此组件会重新渲染，而重新渲染时又读取到了计算属性，由于计算属性目前已为 dirty，因此会重新运行 `getter` 进行运算

而对于计算属性的 `setter`，则极其简单，当设置计算属性时，直接运行 `setter` 即可
