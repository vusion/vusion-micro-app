import * as Data from 'vusion-micro-data';
import createElementHijack from './proxy/createElement';
import consoleHijack from './proxy/console';
import timerHijack from './proxy/timer';
import listenerHijack from './proxy/listener';
import proxyWindow from './proxyWindow';

const userWindow = {};
const keys = Object.keys(window);
export default function (): typeof window {
    consoleHijack(proxyWindow);
    createElementHijack(proxyWindow);
    const listenerFree = listenerHijack(proxyWindow);
    const timerFree = timerHijack(proxyWindow);
    proxyWindow.microApp.message = Data;
    const _window = new Proxy(Object.create(null), {
        get(target, property): any {
            if (['top', 'window', 'self'].includes(property as string)) {
                return _window;
            }
            if (property in proxyWindow) {
                return proxyWindow[property as string];
            }
            if (property in userWindow) {
                return userWindow[property];
            }
            if (keys.includes(property as string) && typeof window[property] === 'function') {
                const value = window[property];
                const proxyValue = function(...args): any {
                    return window[property](...args);
                };
                Object.keys(value).forEach(key => (proxyValue[key] = value[key]));
                return proxyValue;
            }
            return window[property];
        },
        set(target, property, value): boolean {
            if (['$root', 'microApp'].includes(property as string)) {
                return false;
            }
            if (typeof property === 'string' && property.startsWith('on')) {
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
    const microApp = proxyWindow.microApp;
    const topic = 'app:' + microApp.microName;
    Data.subscribe(topic + ':mount', () => {
        microApp.active = true;
    });
    Data.subscribe(topic + ':unmount', () => {
        microApp.active = false;
    });
    Data.subscribe(topic + ':unmounted', () => {
        listenerFree();
        timerFree();
    });
    return _window;
}