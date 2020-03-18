import { subscribe } from 'vusion-micro-data';
import isMicro from './isMicro';
import proxyWindow from './proxyWindow';
import createElementHijack from './proxy/createElement';
import consoleHijack from './proxy/console';
import timerHijack from './proxy/timer';
import listenerHijack from './proxy/listener';
let _window = window;
let userWindow = {};
const keys = Object.keys(window);
if (isMicro) {
    consoleHijack(proxyWindow);
    createElementHijack(proxyWindow);
    const listenerFree = listenerHijack(proxyWindow);
    const timerFree = timerHijack(proxyWindow);
    proxyWindow.microName = '';
    _window = new Proxy(Object.create(null), {
        get(target, property): any {
            if (property === '$root') {
                return window;
            }
            if (property in proxyWindow) {
                return proxyWindow[property as string];
            }
            if (property in userWindow) {
                return userWindow[property];
            }
            if (keys.includes(property as string) && typeof window[property] === 'function') {
                return function(...args): any {
                    return window[property](...args);
                };
            }
            return window[property];
        },
        set(target, property, value): boolean {
            if (property === 'microName') {
                proxyWindow.microName = value;
            } else if (typeof property === 'string' && property.startsWith('on')) {
                window[property] = value;
                if (process.env.NODE_ENV === 'development') {
                    console.warn(`set window.${property.toString()} maybe conflict, please use addEventListener`);
                }
            } else if (window[property] === value) {
                return true;
            } else {
                userWindow[property as any] = value;
            }
            return true;
        }
    });
    setTimeout(() => { // wait for set proxyWindow.microName
        subscribe('app:' + proxyWindow.microName + ':unmounted', () => {
            userWindow = {};
            listenerFree();
            timerFree();
            const elements = Array.from(document.querySelectorAll(`[micro-app=${proxyWindow.microName}]`));
            elements.forEach((element) => {
                element.parentNode.removeChild(element);
            });
        });
    }, 0);
}
export const _document = _window.document;
export const _console = _window.console;
export const _setTimeout = _window.setTimeout;
export const _setInterval = _window.setInterval;
export {
    _window,
};
export default proxyWindow;