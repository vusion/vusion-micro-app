const rawConsole = window.console;
const log = rawConsole.log;
export default function hijack(proxyWindow): void {
    proxyWindow.console = new Proxy({}, {
        get(target, property): Function {
            if (typeof rawConsole[property] === 'function') {
                return function (...args): void {
                    const defaultLog = (): void => log.call(rawConsole, "%c microApp[" + proxyWindow.microApp.microName + ":log]", 'color:#0f0;');
                    if (proxyWindow.microApp && !proxyWindow.microApp.quiet) {
                        try {
                            throw new Error();
                        } catch (error) {
                            if (error.stack) {
                                let errorMsg = error.stack.split('\n')[2];
                                if (errorMsg) {
                                    const errorTarget = errorMsg.match(/\((.*?)\)$/);
                                    if (errorTarget) {
                                        errorMsg = errorTarget[1];
                                    }
                                    log.call(rawConsole, "%c microApp[" + proxyWindow.microApp.microName + `:log] ${errorMsg.trim()}`, 'color:#0f0;');
                                } else {
                                    defaultLog();
                                }
                            }
                        }
                    } else {
                        defaultLog();
                    }
                    rawConsole[property](...args);
                }
            }
        },
    });
}
