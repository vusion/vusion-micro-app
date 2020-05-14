declare global {
    interface Window {
        micro: {
            config: {
                [prop: string]: {
                    name: string;
                    [prop: string]: any;
                };
            };
            subApps: {
                [prop: string]: {
                    name: string;
                    [prop: string]: any;
                };
            };
        };
    }
}
const isMicroApp = function (appName): boolean {
    return Object.values(window.micro.config).some((apps) => apps.some((app) => app.name === appName)) || !!window.micro.subApps[appName];
};

const micro = window.micro = (window.micro || {}) as typeof window.micro;
micro.config = micro.config || {};
micro.subApps = micro.subApps || {};
const isMicro = MICRO_NAME && isMicroApp(MICRO_NAME);
export default isMicro;