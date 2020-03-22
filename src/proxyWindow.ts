interface ProxyWindow extends Window {
    microName?: string;
    [props: string]: any;
}
const proxyWindow: ProxyWindow = Object.create(null);
const microApp = {
    active: false,
    quiet: false,
};
Object.assign(proxyWindow, {
    $microApp: microApp,
    $root: window,
    $microName: '',
    $message: '',
});
export default proxyWindow;
