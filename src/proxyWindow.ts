interface ProxyWindow extends Window {
    [props: string]: any;
}
const proxyWindow: ProxyWindow = Object.create(null);
const microApp = {
    active: false,
    quiet: false,
    microName: '',
    message: '',
};
Object.assign(proxyWindow, {
    microApp,
    $root: window,
});
export default proxyWindow;
