const rawConsole = window.console;
const log = rawConsole.log;
import { ProxyWindow } from '../proxyWindow';
export default function hijack(proxyWindow: ProxyWindow): void {
    const _console = {} as Console;
    proxyWindow.console = new Proxy(_console, {
        get(target: Console, property: keyof Console): Function {
            if (typeof rawConsole[property] === 'function') {
                return function (...args): void {
                    const defaultLog = (msg?: string): void => log.call(rawConsole, "%c microApp[" + proxyWindow.microApp.microName + `:log] ${msg}`, 'color:#0f0;');
                    if (!proxyWindow.microApp.quiet) {
                        try {
                            throw new Error();
                        } catch (error) {
                            let errorMsg = (error.stack || '').split('\n')[2];
                            if (errorMsg) {
                                const errorTarget = errorMsg.match(/\((.*?)\)$/);
                                if (errorTarget) {
                                    errorMsg = errorTarget[1];
                                }
                                defaultLog(errorMsg.trim());
                            } else {
                                defaultLog();
                            }
                        }
                    }
                    rawConsole[property](...args);
                }
            }
            return rawConsole[property];
        },
    });
}
