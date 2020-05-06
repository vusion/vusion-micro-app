import proxyWindow from './proxyWindow';
import bootstrap from './bootstrap';
const userWindow = {};
type Window = typeof window;
const keys = Object.keys(window);
const properties = Object.keys(Object.getOwnPropertyDescriptors(window));
const hasOwnProperty = Object.prototype.hasOwnProperty;
export default function (): Window {
    const _window = new Proxy(Object.create(null) as Window, {
        get(target: Window, property: any): any {
            if (['top', 'window', 'self'].includes(property as string)) {
                return _window;
            }
            if (['micro'].includes(property as string)) {
                return window.micro;
            }
            if (property in proxyWindow) {
                return proxyWindow[property as string];
            }
            if (property in userWindow) {
                return userWindow[property];
            }
            if (property === 'hasOwnProperty') {
                return (key: any): any => hasOwnProperty.call(userWindow, key) || hasOwnProperty.call(proxyWindow, key) || hasOwnProperty.call(window, key);
            }
            if (keys.includes(property as string) && typeof window[property] === 'function') {
                const value = window[property] as any;
                if (!value.__micro__) {
                    const proxyFunction = value.bind(window);
                    Object.keys(value).forEach(key => (proxyFunction[key] = value[key]));
                    Object.defineProperty(value, '__micro__', { enumerable: false, value: proxyFunction });
                }
                return value.__micro__;
            }
            return window[property];
        },
        set(target: Window, property: any, value: any): boolean {
            if (['$realWindow', 'microApp', 'micro'].includes(property as string)) {
                return false;
            }
            if (typeof property === 'string' && property.startsWith('on')) {
                window[property] = value;
                if (process.env.NODE_ENV === 'development') {
                    console.warn(`set window["${property.toString()}"] maybe conflict`);
                }
            } else {
                userWindow[property] = value;
            }
            return true;
        },
        // window.a = 1;  // in other files visit a
        has(target: Window, property: any): boolean {
            return property in userWindow || property in proxyWindow || property in window;
        },
        // delete window.a
        deleteProperty(target: Window, property: any): boolean {
            if (property in userWindow) {
                return delete userWindow[property];
            } else {
                return delete window[property];
            }
        },
        ownKeys(): any[] {
            return Array.from(new Set([...Reflect.ownKeys(window), ...Reflect.ownKeys(userWindow), ...Reflect.ownKeys(proxyWindow)]));
        },
    });
    bootstrap();
    return _window;
}