# vusion-micro-app

used for vusion-micro client, work with webpack-micro

## usage

需要在 `webpack` 的 `entry` 新增配置

```js
{
    micro: './node_modules/vusion-micro-app/dist/index.js', // 打包完成后，在引入其他 script 之前引入该脚本
}
```

同时在 `plugin` 中新增配置

```js
import { wrap as WrapMicroPlugin } from  'webpack-micro';
const microName = 'MICRO_NAME'; // custom name
{
    plugins: [
        new webpack.DefinePlugin({
            MICRO_NAME: JSON.stringify(microName),
        }), // 必须定义微应用名称
        new WrapMicroPlugin({
            microName,
        }), // 微应用所有打包后的代码均被如下形式包裹，请注意：打包 micro 的时候，不要引入该 plugin
        /**
         * ;(function(window,console,setTimeout,setInterval){
         * // code
         * })(window.MICRO_NAME._window,window.MICRO_NAME._console,window.MICRO_NAME._setTimeout,window.MICRO_NAME._setInterval);
        */
    ]
}
```

## custom

自定义客户端的方法

```javascript
import proxyWindow, { _window as window, _console as console, _setTimeout as setTimeout, _setInterval as setInterval } from 'vusion-micro';
proxyWindow.atob = function (...args) {
    if (window.microApp.active) {
        console.log('test');
    }
    return window.$realWindow.atob(...args);
};
```

```javascript
window.atob(); // log 'test'
```

## support

+ console 相关方法调用会显示当前的 app 名称
+ createElement 方法会注入属性 `micro-app=${microName}`
+ setTimeout、setInterval 自动卸载
+ addEventListener 自动卸载

## note

+ 当 `window.__MICROAPP__` 为 `false` 的时候（即非微前端环境），相关功能关闭
+ 必须使用形如 `window.attr` 去使用全局方法属性，否则会存在部分方法无法代理的情况，可能会有意外错误
+ 真实的 `window` 对象可以通过 `window.$realWindow` 的方式获取
+ 可以通过 `window.microApp.active` 获取当前应用的状态
+ 可以通过 `window.microApp.quiet` 关闭打印微应用报错的信息，即不再显示如 `microApp[demo:log] webpack://microApp/./examples/index.js?:10:48` 等信息
+ 可以通过 `window.microApp.message`（`vusion-micro-data`） 进行通信
+ 在 `window` 对象上设置 `on` 开头的属性值，会被设置到原始的 `window` 对象上，因为形如 `onerror` 等属性是事件监听。
+ 如果需要执行第三方脚本或者脚本未被 webpack 打包，一般需要在代码头部和尾部包裹如下代码：

```js
;(function(window,console,setTimeout,setInterval){
    // code
})(window.MICRO_NAME._window,window.MICRO_NAME._console,window.MICRO_NAME._setTimeout,window.MICRO_NAME._setInterval);
```
