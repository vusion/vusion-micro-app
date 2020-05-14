var isMicroApp = function (appName) {
    return Object.values(window.micro.config).some(function (apps) { return apps.some(function (app) { return app.name === appName; }); }) || !!window.micro.subApps[appName];
};
var micro = window.micro = (window.micro || {});
micro.config = micro.config || {};
micro.subApps = micro.subApps || {};
var isMicro = MICRO_NAME && isMicroApp(MICRO_NAME);
export default isMicro;
