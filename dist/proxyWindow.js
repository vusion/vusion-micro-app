import microApp from './microApp';
var win = window; // fix typescript error
var proxyWindow = Object.create(null);
Object.assign(proxyWindow, {
    microApp: microApp,
    $realWindow: window,
});
export default proxyWindow;
