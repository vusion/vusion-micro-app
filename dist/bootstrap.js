import proxyWindow from './proxyWindow';
import * as Data from 'vusion-micro-data';
import createElementHijack, { reBuildCSS } from './proxy/createElement';
import consoleHijack from './proxy/console';
import timerHijack from './proxy/timer';
import listenerHijack from './proxy/listener';
export default function () {
    consoleHijack(proxyWindow);
    createElementHijack(proxyWindow);
    var listenerFree = listenerHijack(proxyWindow);
    var timerFree = timerHijack(proxyWindow);
    var microApp = proxyWindow.microApp;
    var topic = 'app:' + microApp.microName;
    Data.subscribe(topic + ':mount', function () {
        microApp.active = true;
        reBuildCSS.mount();
    });
    Data.subscribe(topic + ':unmount', function () {
        microApp.active = false;
    });
    Data.subscribe(topic + ':unmounted', function () {
        listenerFree();
        timerFree();
        reBuildCSS.unmounted(proxyWindow);
    });
}
