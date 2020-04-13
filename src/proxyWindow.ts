import microApp from './microApp';
declare global {
    interface Window {
        $realWindow: typeof window;
    }
}
const win = window as Window; // fix typescript error
export interface ProxyWindow {
    [props: string]: any;
    $realWindow: typeof window;
    microApp: typeof microApp;
    console: typeof win.console;
    addEventListener: typeof win.addEventListener;
    removeEventListener: typeof win.removeEventListener;
    setTimeout: typeof win.setTimeout;
    setInterval: typeof win.setInterval;
}
const proxyWindow: ProxyWindow = Object.create(null);

Object.assign(proxyWindow, {
    microApp,
    $realWindow: window,
});
export default proxyWindow;
