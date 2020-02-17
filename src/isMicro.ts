declare global {
    interface Window {
        __MICROAPP__: boolean;
    }
}
const isMicro = window.__MICROAPP__ === true;
export default isMicro;