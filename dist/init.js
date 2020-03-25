import * as Data from 'vusion-micro-data';
import createElementHijack, { reBuildCSS } from './proxy/createElement';
import consoleHijack from './proxy/console';
import timerHijack from './proxy/timer';
import listenerHijack from './proxy/listener';
import proxyWindow from './proxyWindow';
var userWindow = {};
var keys = Object.keys(window);
export default function () {
    consoleHijack(proxyWindow);
    createElementHijack(proxyWindow);
    var listenerFree = listenerHijack(proxyWindow);
    var timerFree = timerHijack(proxyWindow);
    proxyWindow.microApp.message = Data;
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
            if (keys.includes(property) && typeof window[property] === 'function') {
                var value_1 = window[property];
                var proxyValue_1 = function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    return window[property].apply(window, args);
                };
                Object.keys(value_1).forEach(function (key) { return (proxyValue_1[key] = value_1[key]); });
                return proxyValue_1;
            }
            return window[property];
        },
        set: function (target, property, value) {
            if (['$root', 'microApp'].includes(property)) {
                return false;
            }
            if (typeof property === 'string' && property.startsWith('on')) {
                window[property] = value;
                if (process.env.NODE_ENV === 'development') {
                    console.warn("set window." + property.toString() + " maybe conflict, please use addEventListener");
                }
            }
            else if (window[property] === value) {
                return true;
            }
            else {
                userWindow[property] = value;
            }
            return true;
        }
    });
    var microApp = proxyWindow.microApp;
    var topic = 'app:' + microApp.microName;
    Data.subscribe(topic + ':mount', function () {
        microApp.active = true;
        reBuildCSS.mount(proxyWindow);
    });
    Data.subscribe(topic + ':unmount', function () {
        microApp.active = false;
    });
    Data.subscribe(topic + ':unmounted', function () {
        listenerFree();
        timerFree();
        reBuildCSS.unmounted(proxyWindow);
    });
    return _window;
}
