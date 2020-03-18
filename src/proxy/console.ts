const rawConsole = window.console;
const log = rawConsole.log;
export default function hijack(proxyWindow): void {
    proxyWindow.console = new Proxy({}, {
        get(target, property): Function {
            if (typeof rawConsole[property] === 'function') {
                return function (...args): void {
                    const defaultLog = (): void => log.call(console, "%c microApp[" + proxyWindow.microName + ":log]", 'color:#0f0;');
                    if (process.env.NODE_ENV === 'development') {
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
                                    log.call(console, "%c microApp[" + proxyWindow.microName + `:log] ${errorMsg.trim()}`, 'color:#0f0;');
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
