const rawConsole = window.console;
const log = rawConsole.log;
export default function hijack(proxyWindow): void {
    proxyWindow.console = new Proxy({}, {
        get(target, property): Function {
            if (typeof rawConsole[property] === 'function') {
                return function (...args): void {
                    log.call(console, `%c micro app [${proxyWindow.microName}] log`, 'color:#0f0;');
                    rawConsole[property](...args);
                }
            }
        },
    });
}
