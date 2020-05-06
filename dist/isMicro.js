var isMicroApp = function (appName) {
    return Object.values(window.micro.config).some(function (app) { return app.name === appName; });
};
var micro = window.micro = (window.micro || {});
micro.config = micro.config || {};
var isMicro = MICRO_NAME && isMicroApp(MICRO_NAME);
export default isMicro;
