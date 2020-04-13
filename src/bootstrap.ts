import proxyWindow from './proxyWindow';
import * as Data from 'vusion-micro-data';
import createElementHijack, { reBuildCSS } from './proxy/createElement';
import consoleHijack from './proxy/console';
import timerHijack from './proxy/timer';
import listenerHijack from './proxy/listener';
export default function (): void {
    consoleHijack(proxyWindow);
    createElementHijack(proxyWindow);
    const listenerFree = listenerHijack(proxyWindow);
    const timerFree = timerHijack(proxyWindow);
    const microApp = proxyWindow.microApp;
    const topic = 'app:' + microApp.microName;
    Data.subscribe(topic + ':mount', () => {
        microApp.active = true;
        reBuildCSS.mount();
    });
    Data.subscribe(topic + ':unmount', () => {
        microApp.active = false;
    });
    Data.subscribe(topic + ':unmounted', () => {
        listenerFree();
        timerFree();
        reBuildCSS.unmounted(proxyWindow);
    });
}