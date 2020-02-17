const rawAddEventListener = window.addEventListener;
const rawRemoveEventListener = window.removeEventListener;
type rawAddEventListenerParameters = Parameters<typeof rawAddEventListener>;
type rawRemoveEventListenerParameters = Parameters<typeof rawRemoveEventListener>;
export default function (proxyWindow):  Function {
    const listenerList: rawAddEventListenerParameters[] = [];
  
    proxyWindow.addEventListener = (...args: rawAddEventListenerParameters): ReturnType<typeof rawAddEventListener> => {
        listenerList.push(args);
        return rawAddEventListener.call(window, ...args);
    };
  
    proxyWindow.removeEventListener = (...args: rawRemoveEventListenerParameters): ReturnType<typeof rawRemoveEventListener> => {
        [...listenerList].forEach((listener): void => {
            if (listener[0] === args[0] && listener[1] === args[1] && listener[2] === args[2]) {
                listenerList.splice(listenerList.indexOf(listener), 1);
                rawRemoveEventListener.call(window, ...args);
            }
        });
    };
  
    return function (): void {
        listenerList.forEach((listener): void => {
            rawRemoveEventListener.call(window, ...listener);
        });
    };
}