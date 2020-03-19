import isMicro from './isMicro';
import proxyWindow from './proxyWindow';
import init from './init';
var _window = window;
if (isMicro) {
    _window = init();
}
export var _document = _window.document;
export var _console = _window.console;
export var _setTimeout = _window.setTimeout;
export var _setInterval = _window.setInterval;
export { _window, };
export default proxyWindow;
