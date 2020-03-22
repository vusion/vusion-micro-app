var proxyWindow = Object.create(null);
var microApp = {
    active: false,
    quiet: false,
    microName: window.microName,
    message: '',
};
Object.assign(proxyWindow, {
    microApp: microApp,
    $root: window,
});
export default proxyWindow;
