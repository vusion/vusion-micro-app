import isMicro from './isMicro';
import proxyWindow from './proxyWindow';
import microApp from './microApp';
import proxy from './proxy';
let _window = window;
if (isMicro) {
    _window = proxy();
} else {
    _window.$realWindow = _window;
    Object.assign(microApp, {
        isMicro: false,
    });
    _window.microApp = microApp;
}
export const _console = _window.console;
export const _setTimeout = _window.setTimeout;
export const _setInterval = _window.setInterval;
export {
    _window,
};
window[MICRO_NAME] = {
    _window,
    _console,
    _setTimeout,
    _setInterval,
};
export default proxyWindow;