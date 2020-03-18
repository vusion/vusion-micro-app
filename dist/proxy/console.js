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
                    log.call(console, "%c micro app [" + proxyWindow.microName + "] log", 'color:#0f0;');
                    rawConsole[property].apply(rawConsole, args);
                };
            }
        },
    });
}
