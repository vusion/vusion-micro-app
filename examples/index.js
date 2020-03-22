import proxyWindow, { _window as window, _console as console, _setTimeout as setTimeout, _setInterval as setInterval, } from '../dist';
window.microApp.microName = 'test';
window.microApp.active = true;
console.log(1111);
console.error(3333);

const div = document.createElement('div');
console.log(div.getAttribute('micro-app') === window.microName);
console.log(document.head);

setTimeout(() => {
    console.log(1);
}, 100);

const id = setInterval(() => {
    console.log(2);
    clearInterval(id);
}, 1000);


window.addEventListener('click', () => {
    console.log('click');
});

window.addEventListener('resize', () => {
    console.log('resize');
});

console.log(window.atob);
proxyWindow.atob = function () {
    // rewrite
};
console.log(window.atob);

window.xx = {
    test: 1,
};
console.log(window.$root.xx, window.xx);