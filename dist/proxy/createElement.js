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
    document.createElement = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var ele = rawCreateElement.call.apply(rawCreateElement, __spreadArrays([document], args));
        if (proxyWindow.microApp.active) {
            ele.setAttribute('micro-app', proxyWindow.microApp.microName);
        }
        return ele;
    };
}
