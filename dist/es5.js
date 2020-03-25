!function(n,r){"object"==typeof exports&&"object"==typeof module?module.exports=r():"function"==typeof define&&define.amd?define([],r):"object"==typeof exports?exports.microApp=r():n.microApp=r()}(window,(function(){return function(n){var r={};function e(t){if(r[t])return r[t].exports;var o=r[t]={i:t,l:!1,exports:{}};return n[t].call(o.exports,o,o.exports,e),o.l=!0,o.exports}return e.m=n,e.c=r,e.d=function(n,r,t){e.o(n,r)||Object.defineProperty(n,r,{enumerable:!0,get:t})},e.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},e.t=function(n,r){if(1&r&&(n=e(n)),8&r)return n;if(4&r&&"object"==typeof n&&n&&n.__esModule)return n;var t=Object.create(null);if(e.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:n}),2&r&&"string"!=typeof n)for(var o in n)e.d(t,o,function(r){return n[r]}.bind(null,o));return t},e.n=function(n){var r=n&&n.__esModule?function(){return n.default}:function(){return n};return e.d(r,"a",r),r},e.o=function(n,r){return Object.prototype.hasOwnProperty.call(n,r)},e.p="",e(e.s=0)}([function(n,r,e){"use strict";e.r(r);var t={};e.r(t),e.d(t,"subscribe",(function(){return d})),e.d(t,"publish",(function(){return v})),e.d(t,"clearTopic",(function(){return m}));var o=!0===window.__MICROAPP__,i=Object.create(null),u={active:!1,quiet:!1,microName:window.microName,message:"",isWrapRunning:!1};Object.assign(i,{microApp:u,$root:window});var c,a=i,f=Symbol.for("vusion-micro-data-empty"),l=Symbol.for("vusion-micro-data"),p=function(n){if(!c){var r=window.__MICROAPP__&&window.$root||window;c=r[l]=r[l]||{}}c[n]||(c[n]={queue:[],last:f})},s=function(){},d=function(n,r,e){p(n);var t=c[n],o=function(n){var r=t.queue;r.includes(n)&&r.splice(r.indexOf(n),1)};if(t.last!==f&&(r(t.last),e))return s;var i=function(){for(var n=[],e=0;e<arguments.length;e++)n[e]=arguments[e];r.apply(void 0,n),o(i)};return t.queue.push(e?i:r),function(){return o(r)}},v=function(n,r){p(n);var e=c[n];return e.queue.forEach((function(n){n(r)})),e.last=r,function(){e.last=f}},m=function(n,r){var e=c[n];e&&(e.queue.length=0,r||(e.last=f))},w=function(){for(var n=0,r=0,e=arguments.length;r<e;r++)n+=arguments[r].length;var t=Array(n),o=0;for(r=0;r<e;r++)for(var i=arguments[r],u=0,c=i.length;u<c;u++,o++)t[o]=i[u];return t},y=window.document,h=y.createElement;var g=new Map,b=function(n){g.size&&(g.forEach((function(n,r){n.appendChild(r)})),g.clear())},A=function(n){var r=n.microApp;Array.from(y.querySelectorAll('[micro-app="'+r.microName+'"]')).forEach((function(r){var e=r.tagName;["LINK","STYLE"].includes(e)?(g.set(r,r.parentNode),r.parentNode.removeChild(r)):"SCRIPT"!==e&&n.console.error("element can't remove:",r)}))},_=window.console,E=_.log;var O=function(){for(var n=0,r=0,e=arguments.length;r<e;r++)n+=arguments[r].length;var t=Array(n),o=0;for(r=0;r<e;r++)for(var i=arguments[r],u=0,c=i.length;u<c;u++,o++)t[o]=i[u];return t},j=window.setTimeout,x=window.setInterval;var N=function(){for(var n=0,r=0,e=arguments.length;r<e;r++)n+=arguments[r].length;var t=Array(n),o=0;for(r=0;r<e;r++)for(var i=arguments[r],u=0,c=i.length;u<c;u++,o++)t[o]=i[u];return t},P=window.addEventListener,T=window.removeEventListener,S={},q=Object.keys(window);e.d(r,"_console",(function(){return M})),e.d(r,"_setTimeout",(function(){return L})),e.d(r,"_setInterval",(function(){return C})),e.d(r,"_window",(function(){return I}));var I=window;o&&(I=function(){!function(n){n.console=new Proxy({},{get:function(r,e){if("function"==typeof _[e])return function(){for(var r=[],t=0;t<arguments.length;t++)r[t]=arguments[t];var o=function(){return E.call(_,"%c microApp["+n.microApp.microName+":log]","color:#0f0;")};if(n.microApp&&!n.microApp.quiet)try{throw new Error}catch(r){if(r.stack){var i=r.stack.split("\n")[2];if(i){var u=i.match(/\((.*?)\)$/);u&&(i=u[1]),E.call(_,"%c microApp["+n.microApp.microName+":log] "+i.trim(),"color:#0f0;")}else o()}}else o();_[e].apply(_,r)}}})}(a),function(n){y.createElement=function(){for(var r=[],e=0;e<arguments.length;e++)r[e]=arguments[e];var t=h.call.apply(h,w([y],r)),o=n.microApp;return o.isWrapRunning?t.setAttribute("micro-app",o.microName):o.active&&t.setAttribute("micro-app",o.microName),t}}(a);var n=function(n){var r=[];return n.addEventListener=function(){for(var n=[],e=0;e<arguments.length;e++)n[e]=arguments[e];return r.push(n),P.call.apply(P,N([window],n))},n.removeEventListener=function(){for(var n=[],e=0;e<arguments.length;e++)n[e]=arguments[e];N(r).forEach((function(e){e[0]===n[0]&&e[1]===n[1]&&e[2]===n[2]&&(r.splice(r.indexOf(e),1),T.call.apply(T,N([window],n)))}))},function(){r.forEach((function(n){T.call.apply(T,N([window],n))}))}}(a),r=function(n){var r=[];n.setTimeout=function(){for(var n=[],e=0;e<arguments.length;e++)n[e]=arguments[e];var t=j.call.apply(j,O([window],n));return r.push(t),t};var e=[];return n.setInterval=function(){for(var n=[],r=0;r<arguments.length;r++)n[r]=arguments[r];var t=x.call.apply(x,O([window],n));return e.push(t),t},function(){r.forEach((function(n){clearTimeout(n)})),r.length=0,e.forEach((function(n){clearTimeout(n)})),e.length=0}}(a);a.microApp.message=t;var e=new Proxy(Object.create(null),{get:function(n,r){if(["top","window","self"].includes(r))return e;if(r in a)return a[r];if(r in S)return S[r];if(q.includes(r)&&"function"==typeof window[r]){var t=window[r],o=function(){for(var n=[],e=0;e<arguments.length;e++)n[e]=arguments[e];return window[r].apply(window,n)};return Object.keys(t).forEach((function(n){return o[n]=t[n]})),o}return window[r]},set:function(n,r,e){if(["$root","microApp"].includes(r))return!1;if("string"==typeof r&&r.startsWith("on"))window[r]=e;else{if(window[r]===e)return!0;S[r]=e}return!0}}),o=a.microApp,i="app:"+o.microName;return d(i+":mount",(function(){o.active=!0,b(a)})),d(i+":unmount",(function(){o.active=!1})),d(i+":unmounted",(function(){n(),r(),A(a)})),e}());var M=I.console,L=I.setTimeout,C=I.setInterval;r.default=a}])}));