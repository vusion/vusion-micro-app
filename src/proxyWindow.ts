interface ProxyWindow extends Window {
    microName?: string;
    [props: string]: any;
}
const proxyWindow: ProxyWindow = Object.create(null);

export default proxyWindow;
