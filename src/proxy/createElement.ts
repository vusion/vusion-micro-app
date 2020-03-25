const document = window.document;
const rawCreateElement = document.createElement;
type rawCreateElementParameters = Parameters<typeof rawCreateElement>;
export default function hijack(proxyWindow): void {
    document.createElement = function(...args: rawCreateElementParameters): ReturnType<(typeof rawCreateElement)> {
        const ele = rawCreateElement.call(document, ...args);
        const microApp = proxyWindow.microApp;
        if (microApp.isWrapRunning) {
            ele.setAttribute('micro-app', microApp.microName);
        } else if (microApp.active) {
            ele.setAttribute('micro-app', microApp.microName);
        }
        return ele;
    };
}
const cssCache = new Map<Element, Node & ParentNode>();
export const reBuildCSS = {
    mount(proxyWindow): void {
        if (cssCache.size) {
            cssCache.forEach((parentNode, element) => {
                parentNode.appendChild(element);
            });
            cssCache.clear();
        }
    },
    unmounted(proxyWindow): void {
        const microApp = proxyWindow.microApp;
        const elements = Array.from(document.querySelectorAll(`[micro-app="${microApp.microName}"]`));
        elements.forEach((element) => {
            const tagName = element.tagName;
            if (['LINK', 'STYLE'].includes(tagName)) {
                cssCache.set(element, element.parentNode);
                element.parentNode.removeChild(element);
            } else if (tagName !== 'SCRIPT') {
                proxyWindow.console.error(`element can't remove:`, element);
            }
        });
    },
};
