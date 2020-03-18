var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var rawAddEventListener = window.addEventListener;
var rawRemoveEventListener = window.removeEventListener;
export default function (proxyWindow) {
    var listenerList = [];
    proxyWindow.addEventListener = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        listenerList.push(args);
        return rawAddEventListener.call.apply(rawAddEventListener, __spreadArrays([window], args));
    };
    proxyWindow.removeEventListener = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        __spreadArrays(listenerList).forEach(function (listener) {
            if (listener[0] === args[0] && listener[1] === args[1] && listener[2] === args[2]) {
                listenerList.splice(listenerList.indexOf(listener), 1);
                rawRemoveEventListener.call.apply(rawRemoveEventListener, __spreadArrays([window], args));
            }
        });
    };
    return function () {
        listenerList.forEach(function (listener) {
            rawRemoveEventListener.call.apply(rawRemoveEventListener, __spreadArrays([window], listener));
        });
    };
}
