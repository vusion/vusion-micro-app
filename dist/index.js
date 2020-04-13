var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import isMicro from './isMicro';
import proxyWindow from './proxyWindow';
import microApp from './microApp';
import proxy from './proxy';
var _window = window;
if (isMicro) {
    _window = proxy();
}
else {
    _window.$realWindow = _window;
    _window.microApp = __assign(__assign({}, microApp), { active: true, isWrapRunning: true });
}
export var _console = _window.console;
export var _setTimeout = _window.setTimeout;
export var _setInterval = _window.setInterval;
export { _window, };
export default proxyWindow;
