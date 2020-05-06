declare global {
    interface Window {
        micro: {
            config: {
                [prop: string]: {
                    name: string;
                    [prop: string]: any;
                };
            };
        };
    }
}
const isMicroApp = function (appName): boolean {
    return Object.values(window.micro.config).some((app) => app.name === appName);
};

const micro = window.micro = (window.micro || {}) as typeof window.micro;
micro.config = micro.config || {};
const isMicro = MICRO_NAME && isMicroApp(MICRO_NAME);
export default isMicro;