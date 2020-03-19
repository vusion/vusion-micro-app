import * as Data from 'vusion-micro-data';
import createElementHijack from './proxy/createElement';
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
    proxyWindow.microName = '';
    var micro = {
        message: Data,
        active: false,
    };
    var saveMap = {
        $root: window,
        $micro: micro,
    };
    var saveKeys = Object.keys(saveMap);
    var _window = new Proxy(Object.create(null), {
        get: function (target, property) {
            if (saveKeys.includes(property)) {
                return saveMap[property];
            }
            if (property in proxyWindow) {
                return proxyWindow[property];
            }
            if (property in userWindow) {
                return userWindow[property];
            }
            if (keys.includes(property) && typeof window[property] === 'function') {
                return function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    return window[property].apply(window, args);
                };
            }
            return window[property];
        },
        set: function (target, property, value) {
            if (saveKeys.includes(property)) {
                return false;
            }
            if (property === 'microName') {
                proxyWindow.microName = value;
            }
            else if (typeof property === 'string' && property.startsWith('on')) {
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
    setTimeout(function () {
        var topic = 'app:' + proxyWindow.microName;
        Data.subscribe(topic + ':mounted', function () {
            micro.active = true;
        });
        Data.subscribe(topic + ':unmounted', function () {
            userWindow = {};
            listenerFree();
            timerFree();
            var elements = Array.from(document.querySelectorAll("[micro-app=\"" + proxyWindow.microName + "\"]"));
            elements.forEach(function (element) {
                element.parentNode.removeChild(element);
            });
            micro.active = false;
        });
    }, 0);
    return _window;
}
