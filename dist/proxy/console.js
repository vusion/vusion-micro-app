var rawConsole = window.console;
var log = rawConsole.log;
export default function hijack(proxyWindow) {
    proxyWindow.console = new Proxy({}, {
        get: function (target, property) {
            if (typeof rawConsole[property] === 'function') {
                return function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    var defaultLog = function () { return log.call(rawConsole, "%c microApp[" + proxyWindow.microApp.microName + ":log]", 'color:#0f0;'); };
                    if (proxyWindow.microApp && !proxyWindow.microApp.quiet) {
                        try {
                            throw new Error();
                        }
                        catch (error) {
                            if (error.stack) {
                                var errorMsg = error.stack.split('\n')[2];
                                if (errorMsg) {
                                    var errorTarget = errorMsg.match(/\((.*?)\)$/);
                                    if (errorTarget) {
                                        errorMsg = errorTarget[1];
                                    }
                                    log.call(rawConsole, "%c microApp[" + proxyWindow.microApp.microName + (":log] " + errorMsg.trim()), 'color:#0f0;');
                                }
                                else {
                                    defaultLog();
                                }
                            }
                        }
                    }
                    else {
                        defaultLog();
                    }
                    rawConsole[property].apply(rawConsole, args);
                };
            }
        },
    });
}
