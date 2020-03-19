import * as Data from 'vusion-micro-data';
import createElementHijack from './proxy/createElement';
import consoleHijack from './proxy/console';
import timerHijack from './proxy/timer';
import listenerHijack from './proxy/listener';
import proxyWindow from './proxyWindow';

let userWindow = {};
const keys = Object.keys(window);
export default function (): typeof window {
    consoleHijack(proxyWindow);
    createElementHijack(proxyWindow);
    const listenerFree = listenerHijack(proxyWindow);
    const timerFree = timerHijack(proxyWindow);
    proxyWindow.microName = '';
    const micro = {
        message: Data,
        active: false,
    };
    const saveMap = {
        $root: window,
        $micro: micro,
    };
    const saveKeys = Object.keys(saveMap);
    const _window = new Proxy(Object.create(null), {
        get(target, property): any {
            if (saveKeys.includes(property as string)) {
                return saveMap[property];
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
            if (saveKeys.includes(property as string)) {
                return false;
            }
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
        const topic = 'app:' + proxyWindow.microName;
        Data.subscribe(topic + ':mounted', () => {
            micro.active = true;
        });
        Data.subscribe(topic + ':unmounted', () => {
            userWindow = {};
            listenerFree();
            timerFree();
            const elements = Array.from(document.querySelectorAll(`[micro-app="${proxyWindow.microName}"]`));
            elements.forEach((element) => {
                element.parentNode.removeChild(element);
            });
            micro.active = false;
        });
    }, 0);
    return _window;
}