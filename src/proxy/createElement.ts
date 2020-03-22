const document = window.document;
const rawCreateElement = document.createElement;
type rawCreateElementParameters = Parameters<typeof rawCreateElement>;
export default function hijack(proxyWindow): void {
    document.createElement = function(...args: rawCreateElementParameters): ReturnType<(typeof rawCreateElement)> {
        const ele = rawCreateElement.call(document, ...args);
        if (proxyWindow.microApp.active) {
            ele.setAttribute('micro-app', proxyWindow.microApp.microName);
        }
        return ele;
    };
}
