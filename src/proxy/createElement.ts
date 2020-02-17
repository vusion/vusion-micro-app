const document = window.document;
const rawCreateElement = document.createElement;
type rawCreateElementParameters = Parameters<typeof rawCreateElement>;
export default function hijack(proxyWindow): void {
    const proxyDocument = {};
    proxyWindow.document = new Proxy(proxyDocument, {
        get(target, property): typeof rawCreateElement | any {
            if (property === 'createElement') {
                return function(...args: rawCreateElementParameters): ReturnType<(typeof rawCreateElement)> {
                    const ele = rawCreateElement.call(document, ...args);
                    ele.setAttribute('micro-app', proxyWindow.microName);
                    return ele;
                }
            }
            return document[property];
        },
    });
}


