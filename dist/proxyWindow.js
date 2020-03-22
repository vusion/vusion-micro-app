var proxyWindow = Object.create(null);
var microApp = {
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
