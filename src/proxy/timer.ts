const rawSetTimeout = window.setTimeout;
const rawSetInterval = window.setInterval;
type rawSetTimeoutParameters = Parameters<typeof rawSetTimeout>;
type rawSetIntervalParameters = Parameters<typeof rawSetInterval>;
export default function hijack(proxyWindow): Function {
    const timeIds: number[] = [];
    proxyWindow.setTimeout = function (...args: rawSetTimeoutParameters): ReturnType<typeof rawSetTimeout> {
        const id = rawSetTimeout.call(window, ...args);
        timeIds.push(id);
        return id;
    };
    const intervalIds: number[] = [];
    proxyWindow.setInterval = function (...args: rawSetIntervalParameters): ReturnType<typeof rawSetInterval> {
        const id = rawSetInterval.call(window, ...args);
        intervalIds.push(id);
        return id;
    };
    return function(): void {
        timeIds.forEach((timeId): void => {
            clearTimeout(timeId);
        });
        timeIds.length = 0;
        intervalIds.forEach((timeId): void => {
            clearTimeout(timeId);
        });
        intervalIds.length = 0;
    }
}