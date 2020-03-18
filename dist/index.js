import { subscribe } from 'vusion-micro-data';
import isMicro from './isMicro';
import proxyWindow from './proxyWindow';
import createElementHijack from './proxy/createElement';
import consoleHijack from './proxy/console';
import timerHijack from './proxy/timer';
import listenerHijack from './proxy/listener';
var _window = window;
var userWindow = {};
if (isMicro) {
    consoleHijack(proxyWindow);
    createElementHijack(proxyWindow);
    var listenerFree_1 = listenerHijack(proxyWindow);
    var timerFree_1 = timerHijack(proxyWindow);
    proxyWindow.microName = '';
    _window = new Proxy(Object.create(null), {
        get: function (target, property) {
            if (property === '$root') {
                return window;
            }
            if (property in proxyWindow) {
                return proxyWindow[property];
            }
            if (property in userWindow) {
                return userWindow[property];
            }
            return window[property];
        },
        set: function (target, property, value) {
            if (property === 'microName') {
                proxyWindow.microName = value;
            }
            if (typeof property === 'string' && property.startsWith('on')) {
                window[property] = value;
                if (process.env.NODE_ENV === 'development') {
                    console.warn("set window." + property.toString() + " maybe conflict, please use addEventListener");
                }
            }
            else {
                userWindow[property] = value;
            }
            return true;
        }
    });
    setTimeout(function () {
        subscribe('app:' + proxyWindow.microName + ':unmounted', function () {
            userWindow = {};
            listenerFree_1();
            timerFree_1();
            var elements = Array.from(document.querySelectorAll("[micro-app=" + proxyWindow.microName + "]"));
            elements.forEach(function (element) {
                element.parentNode.removeChild(element);
            });
        });
    }, 0);
}
export var _document = _window.document;
export var _console = _window.console;
export var _setTimeout = _window.setTimeout;
export var _setInterval = _window.setInterval;
export { _window, };
export default proxyWindow;
