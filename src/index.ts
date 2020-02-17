
import isMicro from './isMicro';
import proxyWindow  from './proxyWindow';
import createElementHijack from './proxy/createElement';
import consoleHijack from './proxy/console';
import timerHijack from './proxy/timer';
import listenerHijack from './proxy/listener';
let _window = window;
if (isMicro) {
    consoleHijack(proxyWindow);
    createElementHijack(proxyWindow);
    const listenerFree = listenerHijack(proxyWindow);
    const timerFree = timerHijack(proxyWindow);
    proxyWindow.microName = '';
    proxyWindow.microFree = function (): void {
        listenerFree();
        timerFree();
    };
    _window = new Proxy(Object.create(null), {
        get(target, property): any {
            if (property === '$root') {
                return window;
            }
            if (property in proxyWindow) {
                return proxyWindow[property as string];
            }
            return window[property];
        },
        set(target, property, value): boolean {
            if (property === 'microName') {
                proxyWindow.microName = value;
            }
            if (typeof property === 'string' && property.startsWith('on')) {
                window[property] = value;
                if (process.env.NODE_ENV === 'development') {
                    console.warn(`set window.${property.toString()} maybe conflict, please use addEventListener`);
                }
            } else {
                proxyWindow[property as any] = value;
            }
            return true;
        }
    });

}
export const _document  = _window.document;
export const _console  = _window.console;
export const _setTimeout  = _window.setTimeout;
export const _setInterval  = _window.setInterval;
export {
    _window,
};
export default proxyWindow;