import proxyWindow from './proxyWindow';
import bootstrap from './bootstrap';
const userWindow = {};
const keys = Object.keys(window);
type Window = typeof window;
export default function (): Window {
    const _window = new Proxy(Object.create(null) as Window, {
        get(target: Window, property: keyof Window): any {
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
        set(target: Window, property: any, value: any): boolean {
            if (['$realWindow', 'microApp'].includes(property as string)) {
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
    bootstrap();
    return _window;
}