import isMicro from './isMicro';
import proxyWindow from './proxyWindow';
import init from './init';
let _window = window;
if (isMicro) {
    _window = init();
}
export const _document = _window.document;
export const _console = _window.console;
export const _setTimeout = _window.setTimeout;
export const _setInterval = _window.setInterval;
export {
    _window,
};
export default proxyWindow;