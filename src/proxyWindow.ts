interface ProxyWindow extends Window {
    [props: string]: any;
}
declare global {
    interface Window {
        microName: string;
    }
}
const proxyWindow: ProxyWindow = Object.create(null);
const microApp = {
    active: false,
    quiet: false,
    microName: window.microName,
    message: '',
    isWrapRunning: false,
};
Object.assign(proxyWindow, {
    microApp,
    $root: window,
});
export default proxyWindow;
