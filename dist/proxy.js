var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import proxyWindow from './proxyWindow';
import bootstrap from './bootstrap';
var userWindow = {};
var keys = Object.keys(window);
var properties = Object.keys(Object.getOwnPropertyDescriptors(window));
var hasOwnProperty = Object.prototype.hasOwnProperty;
export default function () {
    var _window = new Proxy(Object.create(null), {
        get: function (target, property) {
            if (['top', 'window', 'self'].includes(property)) {
                return _window;
            }
            if (property in proxyWindow) {
                return proxyWindow[property];
            }
            if (property in userWindow) {
                return userWindow[property];
            }
            if (property === 'hasOwnProperty') {
                return function (key) { return hasOwnProperty.call(userWindow, key) || hasOwnProperty.call(proxyWindow, key) || hasOwnProperty.call(window, key); };
            }
            if (keys.includes(property) && typeof window[property] === 'function') {
                var value_1 = window[property];
                if (!value_1.__micro__) {
                    var proxyFunction_1 = value_1.bind(window);
                    Object.keys(value_1).forEach(function (key) { return (proxyFunction_1[key] = value_1[key]); });
                    Object.defineProperty(value_1, '__micro__', { enumerable: false, value: proxyFunction_1 });
                }
                return value_1.__micro__;
            }
            return window[property];
        },
        set: function (target, property, value) {
            if (['$realWindow', 'microApp'].includes(property)) {
                return false;
            }
            if (properties.includes(property)) {
                window[property] = value;
                if (process.env.NODE_ENV === 'development') {
                    console.warn("set window[\"" + property.toString() + "\"] maybe conflict");
                }
            }
            else {
                userWindow[property] = value;
            }
            return true;
        },
        // window.a = 1;  // in other files visit a
        has: function (target, property) {
            return property in userWindow || property in proxyWindow || property in window;
        },
        // delete window.a
        deleteProperty: function (target, property) {
            if (property in userWindow) {
                return delete userWindow[property];
            }
            else {
                return delete window[property];
            }
        },
        ownKeys: function () {
            return Array.from(new Set(__spreadArrays(Reflect.ownKeys(window), Reflect.ownKeys(userWindow), Reflect.ownKeys(proxyWindow))));
        },
    });
    bootstrap();
    return _window;
}
