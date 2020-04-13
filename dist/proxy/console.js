var rawConsole = window.console;
var log = rawConsole.log;
export default function hijack(proxyWindow) {
    var _console = {};
    proxyWindow.console = new Proxy(_console, {
        get: function (target, property) {
            if (typeof rawConsole[property] === 'function') {
                return function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    var defaultLog = function (msg) { return log.call(rawConsole, "%c microApp[" + proxyWindow.microApp.microName + (":log] " + msg), 'color:#0f0;'); };
                    if (!proxyWindow.microApp.quiet) {
                        try {
                            throw new Error();
                        }
                        catch (error) {
                            var errorMsg = (error.stack || '').split('\n')[2];
                            if (errorMsg) {
                                var errorTarget = errorMsg.match(/\((.*?)\)$/);
                                if (errorTarget) {
                                    errorMsg = errorTarget[1];
                                }
                                defaultLog(errorMsg.trim());
                            }
                            else {
                                defaultLog();
                            }
                        }
                    }
                    rawConsole[property].apply(rawConsole, args);
                };
            }
            return rawConsole[property];
        },
    });
}
