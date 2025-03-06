# Vue 3 响应式原理解析

Vue 3 采用了基于 Proxy 的响应式系统，相比 Vue 2 的 `Object.defineProperty` 方式，提供了更高效、更强大的能力。本文将深入解析 Vue 3 响应式原理，探讨其核心实现。

## 1. Vue 3 响应式系统概述

Vue 3 使用 `reactive` 和 `ref` 这两个 API 来创建响应式数据，其底层依赖 `Proxy` 拦截对象的操作，实现数据的自动追踪和依赖收集。

- `reactive`：用于创建对象的响应式代理。
- `ref`：用于创建基本数据类型的响应式引用。

## 2. Proxy 介绍

`Proxy` 是 ES6 提供的 API，允许我们拦截对象的基本操作，如读取（`get`）、赋值（`set`）、删除（`deleteProperty`）等。

示例：

```js
const obj = new Proxy(
  {},
  {
    get(target, key) {
      console.log(`获取 ${key}`);
      return target[key];
    },
    set(target, key, value) {
      console.log(`设置 ${key} 为 ${value}`);
      target[key] = value;
      return true;
    },
  }
);

obj.name = "Vue3"; // 设置 name 为 Vue3
console.log(obj.name); // 获取 name
```

Vue 3 的响应式系统正是基于 `Proxy` 实现的。

## 3. `reactive` 的实现原理

Vue 3 中的 `reactive` 通过 `Proxy` 对对象进行代理，并结合 `WeakMap` 进行缓存，避免重复代理。

> **为什么要使用 WeakMap 进行缓存？**
>
> 1. **避免重复代理**：如果一个对象已经被 `reactive` 处理过，就不需要再次代理，直接返回之前的响应式对象。
> 2. **自动垃圾回收**：`WeakMap` 的 key 是弱引用，当原对象没有被引用时，垃圾回收机制会自动回收它，避免内存泄漏。
> 3. **提升性能**：通过缓存代理对象，减少不必要的 `Proxy` 创建，提高运行效率。

### `reactive` 代码示意：

```js
const reactiveMap = new WeakMap();

function reactive(target) {
  if (!target || typeof target !== "object") return target;

  // 处理已被代理的对象
  if (reactiveMap.has(target)) {
    return reactiveMap.get(target);
  }

  const proxy = new Proxy(target, {
    get(target, key, receiver) {
      console.log(`获取 ${key}`);
      return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver) {
      console.log(`设置 ${key} 为 ${value}`);
      return Reflect.set(target, key, value, receiver);
    },
  });

  reactiveMap.set(target, proxy);
  return proxy;
}
```

这样，所有 `reactive` 处理的对象都能被正确代理，且不会重复代理。

## 4. `ref` 的实现原理

`ref` 适用于基本数据类型，Vue 3 通过 `Object.defineProperty` 在 `value` 访问时进行拦截。

示例代码：

```js
function ref(value) {
  return {
    get value() {
      console.log(`获取值: ${value}`);
      return value;
    },
    set value(newValue) {
      console.log(`设置值: ${newValue}`);
      value = newValue;
    },
  };
}
```

使用方式：

```js
const count = ref(0);
console.log(count.value); // 获取值: 0
count.value = 10; // 设置值: 10
```

## 5. 依赖收集与触发

Vue 3 的响应式核心在于 **依赖收集（track）** 和 **触发更新（trigger）**。

### **依赖收集 track**

- 在 `get` 访问时，记录当前依赖。

### **触发更新 trigger**

- 在 `set` 赋值时，通知相关依赖进行更新。

**示例代码：**

```js
let activeEffect = null;
const targetMap = new WeakMap();

function track(target, key) {
  if (!activeEffect) return;
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    depsMap = new Map();
    targetMap.set(target, depsMap);
  }
  let deps = depsMap.get(key);
  if (!deps) {
    deps = new Set();
    depsMap.set(key, deps);
  }
  deps.add(activeEffect);
}

function trigger(target, key) {
  const depsMap = targetMap.get(target);
  if (!depsMap) return;
  const effects = depsMap.get(key);
  if (effects) {
    effects.forEach((effect) => effect());
  }
}
```

**示例使用：**

```js
function effect(fn) {
  activeEffect = fn;
  fn(); // 立即执行一次，进行依赖收集
  activeEffect = null;
}

const state = reactive({ count: 0 });

effect(() => {
  console.log(`count: ${state.count}`);
});

state.count = 1; // 触发更新
```

## 6. 结论

Vue 3 采用 `Proxy` 进行数据劫持，并结合 `WeakMap`、`Set` 进行依赖管理，实现了高效的响应式系统。其核心包含：

1. `reactive` 代理对象，`ref` 代理基本类型。
2. 通过 `track` 进行依赖收集，`trigger` 触发更新。
3. 结合 `effect` 机制，自动更新视图。

了解 Vue 3 响应式原理，可以帮助我们更好地理解 Vue 的工作机制，并在开发中做出更好的优化选择。
