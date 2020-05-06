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
    Object.assign(microApp, {
        isMicro: false,
    });
    _window.microApp = microApp;
}
export var _console = _window.console;
export var _setTimeout = _window.setTimeout;
export var _setInterval = _window.setInterval;
export { _window, };
window[MICRO_NAME] = {
    _window: _window,
    _console: _console,
    _setTimeout: _setTimeout,
    _setInterval: _setInterval,
};
export default proxyWindow;
