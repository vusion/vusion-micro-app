var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var document = window.document;
var rawCreateElement = document.createElement;
export default function hijack(proxyWindow) {
    var proxyDocument = {};
    proxyWindow.document = new Proxy(proxyDocument, {
        get: function (target, property) {
            if (property === 'createElement') {
                return function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    var ele = rawCreateElement.call.apply(rawCreateElement, __spreadArrays([document], args));
                    ele.setAttribute('micro-app', proxyWindow.microName);
                    return ele;
                };
            }
            if (typeof document[property] === 'function') {
                return function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    return document[property].apply(document, args);
                };
            }
            return document[property];
        },
    });
}
