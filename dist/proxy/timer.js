var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var rawSetTimeout = window.setTimeout;
var rawSetInterval = window.setInterval;
export default function hijack(proxyWindow) {
    var timeIds = [];
    proxyWindow.setTimeout = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var id = rawSetTimeout.call.apply(rawSetTimeout, __spreadArrays([window], args));
        timeIds.push(id);
        return id;
    };
    var intervalIds = [];
    proxyWindow.setInterval = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var id = rawSetInterval.call.apply(rawSetInterval, __spreadArrays([window], args));
        intervalIds.push(id);
        return id;
    };
    return function () {
        timeIds.forEach(function (timeId) {
            clearTimeout(timeId);
        });
        timeIds.length = 0;
        intervalIds.forEach(function (timeId) {
            clearTimeout(timeId);
        });
        intervalIds.length = 0;
    };
}
