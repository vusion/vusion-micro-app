import * as Data from 'vusion-micro-data';
const microApp = {
    active: false,
    quiet: false,
    microName: MICRO_NAME,
    message: Data,
    isWrapRunning: false,
};
declare global {
    interface Window {
        microApp: typeof microApp;
    }
}
export default microApp;