# vusion-micro

used for vusion-micro client, work with webpack-micro

## usage

重写客户端的方法

```javascript
import proxyWindow, { _window as window, _console as console, _setTimeout as setTimeout, _setInterval as setInterval } from 'vusion-micro';
proxyWindow.atob = function () {
    console.log('test');
};
```

```javascript
window.atob(); // log 'test'
```

## support

+ console 方法调用会显示当前的 app 名称
+ createElement 方法会注入属性 `micro-app=${microName}`
+ setTimeout、setInterval 可手动移除
+ addEventListener 可手动移除

## note

+ 当 `window.__MICROAPP__` 为 `false` 的时候，相关功能关闭
+ 必须在初始化阶段设置 `window.microName` 属性。否则部分特性出错
+ 必须使用形如 `window.attr` 去使用全局方法属性
+ 原始的 `window` 对象可以通过 `window.$root` 的方式获取
+ 可以通过 `window.$microApp` 获取当前应用的状态
+ 可以通过 `window.$message`（`vusion-micro-data`） 进行通信
+ 在 `window` 对象上设置 `on` 开头的属性值，会被设置到原始的 `window` 对象上，因为形如 `onerror` 等属性，一般此类是事件监听。另外推荐用 `addEventListener`， 因为 `onerror` 很容易冲突
