!function(n){var o={};function t(e){if(o[e])return o[e].exports;var r=o[e]={i:e,l:!1,exports:{}};return n[e].call(r.exports,r,r.exports,t),r.l=!0,r.exports}t.m=n,t.c=o,t.d=function(n,o,e){t.o(n,o)||Object.defineProperty(n,o,{enumerable:!0,get:e})},t.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},t.t=function(n,o){if(1&o&&(n=t(n)),8&o)return n;if(4&o&&"object"==typeof n&&n&&n.__esModule)return n;var e=Object.create(null);if(t.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:n}),2&o&&"string"!=typeof n)for(var r in n)t.d(e,r,function(o){return n[o]}.bind(null,r));return e},t.n=function(n){var o=n&&n.__esModule?function(){return n.default}:function(){return n};return t.d(o,"a",o),o},t.o=function(n,o){return Object.prototype.hasOwnProperty.call(n,o)},t.p="",t(t.s=6)}([function(n,o,t){"use strict";n.exports=function(n){var o=[];return o.toString=function(){return this.map(function(o){var t=function(n,o){var t=n[1]||"",e=n[3];if(!e)return t;if(o&&"function"==typeof btoa){var r=(s=e,"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(s))))+" */"),i=e.sources.map(function(n){return"/*# sourceURL="+e.sourceRoot+n+" */"});return[t].concat(i).concat([r]).join("\n")}var s;return[t].join("\n")}(o,n);return o[2]?"@media "+o[2]+"{"+t+"}":t}).join("")},o.i=function(n,t){"string"==typeof n&&(n=[[null,n,""]]);for(var e={},r=0;r<this.length;r++){var i=this[r][0];null!=i&&(e[i]=!0)}for(r=0;r<n.length;r++){var s=n[r];null!=s[0]&&e[s[0]]||(t&&!s[2]?s[2]=t:t&&(s[2]="("+s[2]+") and ("+t+")"),o.push(s))}},o}},function(n,o,t){var e,r,i={},s=(e=function(){return window&&document&&document.all&&!window.atob},function(){return void 0===r&&(r=e.apply(this,arguments)),r}),a=function(n){var o={};return function(n,t){if("function"==typeof n)return n();if(void 0===o[n]){var e=function(n,o){return o?o.querySelector(n):document.querySelector(n)}.call(this,n,t);if(window.HTMLIFrameElement&&e instanceof window.HTMLIFrameElement)try{e=e.contentDocument.head}catch(n){e=null}o[n]=e}return o[n]}}(),c=null,l=0,d=[],u=t(2);function f(n,o){for(var t=0;t<n.length;t++){var e=n[t],r=i[e.id];if(r){r.refs++;for(var s=0;s<r.parts.length;s++)r.parts[s](e.parts[s]);for(;s<e.parts.length;s++)r.parts.push(g(e.parts[s],o))}else{var a=[];for(s=0;s<e.parts.length;s++)a.push(g(e.parts[s],o));i[e.id]={id:e.id,refs:1,parts:a}}}}function h(n,o){for(var t=[],e={},r=0;r<n.length;r++){var i=n[r],s=o.base?i[0]+o.base:i[0],a={css:i[1],media:i[2],sourceMap:i[3]};e[s]?e[s].parts.push(a):t.push(e[s]={id:s,parts:[a]})}return t}function p(n,o){var t=a(n.insertInto);if(!t)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var e=d[d.length-1];if("top"===n.insertAt)e?e.nextSibling?t.insertBefore(o,e.nextSibling):t.appendChild(o):t.insertBefore(o,t.firstChild),d.push(o);else if("bottom"===n.insertAt)t.appendChild(o);else{if("object"!=typeof n.insertAt||!n.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var r=a(n.insertAt.before,t);t.insertBefore(o,r)}}function b(n){if(null===n.parentNode)return!1;n.parentNode.removeChild(n);var o=d.indexOf(n);o>=0&&d.splice(o,1)}function v(n){var o=document.createElement("style");if(void 0===n.attrs.type&&(n.attrs.type="text/css"),void 0===n.attrs.nonce){var e=function(){0;return t.nc}();e&&(n.attrs.nonce=e)}return m(o,n.attrs),p(n,o),o}function m(n,o){Object.keys(o).forEach(function(t){n.setAttribute(t,o[t])})}function g(n,o){var t,e,r,i;if(o.transform&&n.css){if(!(i="function"==typeof o.transform?o.transform(n.css):o.transform.default(n.css)))return function(){};n.css=i}if(o.singleton){var s=l++;t=c||(c=v(o)),e=w.bind(null,t,s,!1),r=w.bind(null,t,s,!0)}else n.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(t=function(n){var o=document.createElement("link");return void 0===n.attrs.type&&(n.attrs.type="text/css"),n.attrs.rel="stylesheet",m(o,n.attrs),p(n,o),o}(o),e=function(n,o,t){var e=t.css,r=t.sourceMap,i=void 0===o.convertToAbsoluteUrls&&r;(o.convertToAbsoluteUrls||i)&&(e=u(e));r&&(e+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */");var s=new Blob([e],{type:"text/css"}),a=n.href;n.href=URL.createObjectURL(s),a&&URL.revokeObjectURL(a)}.bind(null,t,o),r=function(){b(t),t.href&&URL.revokeObjectURL(t.href)}):(t=v(o),e=function(n,o){var t=o.css,e=o.media;e&&n.setAttribute("media",e);if(n.styleSheet)n.styleSheet.cssText=t;else{for(;n.firstChild;)n.removeChild(n.firstChild);n.appendChild(document.createTextNode(t))}}.bind(null,t),r=function(){b(t)});return e(n),function(o){if(o){if(o.css===n.css&&o.media===n.media&&o.sourceMap===n.sourceMap)return;e(n=o)}else r()}}n.exports=function(n,o){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(o=o||{}).attrs="object"==typeof o.attrs?o.attrs:{},o.singleton||"boolean"==typeof o.singleton||(o.singleton=s()),o.insertInto||(o.insertInto="head"),o.insertAt||(o.insertAt="bottom");var t=h(n,o);return f(t,o),function(n){for(var e=[],r=0;r<t.length;r++){var s=t[r];(a=i[s.id]).refs--,e.push(a)}n&&f(h(n,o),o);for(r=0;r<e.length;r++){var a;if(0===(a=e[r]).refs){for(var c=0;c<a.parts.length;c++)a.parts[c]();delete i[a.id]}}}};var y,x=(y=[],function(n,o){return y[n]=o,y.filter(Boolean).join("\n")});function w(n,o,t,e){var r=t?"":e.css;if(n.styleSheet)n.styleSheet.cssText=x(o,r);else{var i=document.createTextNode(r),s=n.childNodes;s[o]&&n.removeChild(s[o]),s.length?n.insertBefore(i,s[o]):n.appendChild(i)}}},function(n,o){n.exports=function(n){var o="undefined"!=typeof window&&window.location;if(!o)throw new Error("fixUrls requires window.location");if(!n||"string"!=typeof n)return n;var t=o.protocol+"//"+o.host,e=t+o.pathname.replace(/\/[^\/]*$/,"/");return n.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(n,o){var r,i=o.trim().replace(/^"(.*)"$/,function(n,o){return o}).replace(/^'(.*)'$/,function(n,o){return o});return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(i)?n:(r=0===i.indexOf("//")?i:0===i.indexOf("/")?t+i:e+i.replace(/^\.\//,""),"url("+JSON.stringify(r)+")")})}},,,,function(n,o,t){"use strict";t.r(o);t(7);function e(n,o){if(!(n instanceof o))throw new TypeError("Cannot call a class as a function")}function r(n,o){for(var t=0;t<o.length;t++){var e=o[t];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(n,e.key,e)}}function i(n,o,t){return o&&r(n.prototype,o),t&&r(n,t),n}window.onload=function(){var n=document.getElementById("currentAnimationText"),o=!1,t=!1,r=1,s=[],a=function(n){var o=document.getElementById("myCanvas"),t=o.getContext("2d");t.clearRect(0,0,o.width,o.height),s.forEach(function(n){t.save(),n.draw(t),t.restore()}),"function"==typeof n&&(t.save(),n(t),t.restore())},c=function(){function n(o,t,r,i){e(this,n),this.xPos=o,this.yPos=t,this.width=r,this.color=i}return i(n,[{key:"draw",value:function(n){n.beginPath(),n.lineCap="round",n.strokeStyle=this.color,n.lineWidth=15,n.moveTo(this.xPos-5*this.width,this.yPos),n.lineTo(this.xPos+5*this.width,this.yPos),n.stroke()}}]),n}(),l=function(){function s(n,o,t,r){e(this,s),this.name=n,this.xPos=o,this.yPos=t,this.disks=r,this.width=40,this.height=130}return i(s,[{key:"moveTopDiskTo",value:function(e,i){var s=this.disks.pop();t||n.replaceChild(document.createTextNode("Moving "+s.color+" disk from "+this.name+" to "+e.name),n.lastChild);var c="move-up";o=!0;t||window.requestAnimationFrame(function n(){if(t)return e.pushDisk(s),o=!1,void i();if("move-up"===c)s.yPos-=r,s.yPos<=50&&(s.yPos=50,c="move-across");else if("move-across"===c)s.xPos<e.xPos&&(s.xPos+=r),s.xPos>e.xPos&&(s.xPos-=r),s.xPos>e.xPos-r&&s.xPos<e.xPos+r&&(s.xPos=e.xPos,c="move-down");else if("move-down"===c){var l=230;e.disks.length>0&&(l=e.disks[e.disks.length-1].yPos-20),s.yPos<l&&(s.yPos+=r),s.yPos>=l&&(s.yPos=l,c="finished")}else if("finished"===c)return e.pushDisk(s),o=!1,void i();a(function(n){s.draw(n)}),o&&window.requestAnimationFrame(n)})}},{key:"pushDisk",value:function(n){this.disks.length>0?n.yPos=this.disks[this.disks.length-1].yPos-20:n.yPos=230,this.disks.push(n),n.xPos=this.xPos}},{key:"draw",value:function(n){n.beginPath(),n.lineCap="square",n.strokeStyle="brown",n.lineWidth=5,n.moveTo(this.xPos,this.yPos),n.stroke(),n.moveTo(this.xPos,this.yPos),n.lineTo(this.xPos-this.width,this.yPos),n.stroke(),n.moveTo(this.xPos,this.yPos),n.lineTo(this.xPos+this.width,this.yPos),n.stroke(),n.moveTo(this.xPos,this.yPos),n.lineTo(this.xPos,this.yPos-this.height),n.stroke(),n.strokeStyle="black",n.lineWidth=1,n.textAlign="center",n.font="24px sans-serif",n.fillText(this.name,this.xPos,this.yPos+35),this.disks.forEach(function(o){o.draw(n)})}}]),s}(),d=function(){s=[new l("A",100,250,[new c(100,230,5,"purple"),new c(100,210,4,"blue"),new c(100,190,3,"green"),new c(100,170,2,"orange"),new c(100,150,1,"red")]),new l("B",300,250,[]),new l("C",500,250,[])]};!function(){document.getElementById("myCanvas");n.appendChild(document.createTextNode("Press the Go button to begin:")),d();var o=document.getElementById("animateButton");o.addEventListener("click",function(){o.disabled=!0;var e=[];!function n(o,t,e,r,i){o>=0&&(n(o-1,t,r,e,i),i.push(function(n){t.moveTopDiskTo(e,n)}),n(o-1,r,e,t,i))}(s[0].disks.length-1,s[0],s[2],s[1],e),function r(i,s){if(e.length<=s)return window.requestAnimationFrame(a),o.disabled=!1,n.replaceChild(document.createTextNode("All finished. Press reset to start over:"),n.lastChild),void(t&&(t=!1));(0,e[s])(function(){r(0,s+1)})}(0,0)}),document.getElementById("resetButton").addEventListener("click",function(){t=!0,n.replaceChild(document.createTextNode("Resetting"),n.lastChild),setTimeout(function(){o.disabled=!1,n.replaceChild(document.createTextNode("Press the Go button to begin:"),n.lastChild),d(),window.requestAnimationFrame(a),t=!1},1e3)});var e=document.getElementById("speedSlider");e.oninput=function(){r=parseInt(e.value,10)},r=parseInt(e.value,10),window.requestAnimationFrame(a)}()}},function(n,o,t){var e=t(8);"string"==typeof e&&(e=[[n.i,e,""]]);var r={hmr:!0,transform:void 0,insertInto:void 0};t(1)(e,r);e.locals&&(n.exports=e.locals)},function(n,o,t){(n.exports=t(0)(!1)).push([n.i,":root {\n    --background-color: white;\n    --main-color: rgb(63, 111, 139);\n    --text-color: black;\n    --disabled-color: rgb(207,207,207);\n    --hover-color: rgb(125, 177, 247);\n    --visited-color: rgb(107, 82, 139);\n    --hover-visited-color: rgb(168, 129, 218);\n}\n\n/* Use box sizing (https://css-tricks.com/box-sizing/) */\n\nhtml {\n    box-sizing: border-box;\n}\n\n*, *:before, *:after {\n    box-sizing: inherit;\n}\n\nbody {\n    margin: 3px;\n    background-color: white;\n    background-color: var(--background-color);\n    color: black;\n    color: var(--text-color);\n}\n\narticle {\n    font-family: sans-serif;\n    background-color: white;\n    background-color: var(--background-color);\n}\n\nheader {\n    color: rgb(63, 111, 139);\n    color: var(--main-color);\n}\n\nbutton {\n    border: 1px solid rgb(63, 111, 139);\n    border: 1px solid var(--main-color);\n    padding: 1em 3em;\n    background-color: white;\n    background-color: var(--background-color);\n    color: rgb(63, 111, 139);\n    color: var(--main-color);\n    font-weight: bold;\n}\n\nbutton:disabled {\n    border: 1px solid rgb(207,207,207);\n    border: 1px solid var(--disabled-color);\n    padding: 1em 3em;\n    background-color: white;\n    background-color: var(--background-color);\n    color: rgb(207,207,207);\n    color: var(--disabled-color);\n}\n\nbutton:disabled:hover {\n    border: 1px solid rgb(207,207,207);\n    border: 1px solid var(--disabled-color);\n    padding: 1em 3em;\n    background-color: white;\n    background-color: var(--background-color);\n    color: rgb(207,207,207);\n    color: var(--disabled-color);\n}\n\nbutton:hover {\n    padding: 1em 3em;\n    background-color: rgb(63, 111, 139);\n    background-color: var(--main-color);\n    color: white;\n    color: var(--background-color);\n    border: 1px solid rgb(63, 111, 139);\n    border: 1px solid var(--main-color);\n}\n\nbutton:active {\n    padding: 1em 3em;\n    background-color: rgb(63, 111, 139);\n    background-color: var(--main-color);\n    color: white;\n    color: var(--background-color);\n    border: 1px solid rgb(63, 111, 139);\n    border: 1px solid var(--main-color);\n}\n\nbutton:focus {\n    padding: 1em 3em;\n    background-color: rgb(63, 111, 139);\n    background-color: var(--main-color);\n    color: white;\n    color: var(--background-color);\n    border: 1px solid rgb(63, 111, 139);\n    border: 1px solid var(--main-color);\n}\n\na {\n    color: rgb(63, 111, 139);\n    color: var(--main-color);\n}\n\na:visited {\n    color: rgb(107, 82, 139);\n    color: var(--visited-color);\n}\n\na:hover {\n    color: rgb(125, 177, 247);\n    color: var(--hover-color);\n}\n\na:hover:visited {\n    color: rgb(168, 129, 218);\n    color: var(--hover-visited-color);\n}\n\n#myCanvas {\n    border: 3px solid rgb(63, 111, 139);\n    border: 3px solid var(--main-color);\n    width: 100%;\n    height: 300px;\n}\n\ndiv.action-controls {\n    width: 100%;\n}\n\ndiv.action-controls > button {\n    width: 100%;\n    margin-bottom: 10px;\n}\n\ndiv.speed-controls {\n}\n\n@media screen and (min-width: 228px) {\n    div.action-controls > button {\n        width: auto;\n    }\n}\n\n@media screen and (min-width: 475px) {\n    div.action-controls {\n        width: 50%;\n        float: left;\n    }\n    div.action-controls > button {\n        width: auto;\n        margin-bottom: 0;\n    }\n\n    div.speed-controls {\n        width: 50%;\n        float: left;\n    }\n}\n\n@media screen and (min-width: 606px) {\n    #myCanvas {\n        width: 600px;\n    }\n\n    div.action-controls {\n        width: 300px;\n        float: left;\n    }\n\n    div.speed-controls {\n        width: 300px;\n        float: left;\n    }\n}\n",""])}]);