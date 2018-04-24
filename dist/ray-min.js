Array.prototype.forEach||(Array.prototype.forEach=function(t,n){"use strict";var e,i;if(null==this)throw new TypeError("this is null or not defined");var o,r=Object(this),s=r.length>>>0;if("[object Function]"!=={}.toString.call(t))throw new TypeError(t+" is not a function");for(2<=arguments.length&&(e=n),i=0;i<s;)i in r&&(o=r[i],t.call(e,o,i,r)),i++}),function(t){t.RayNS=t.RayNS||{};var n=function(t){this.callbacks=[],this.eventNamesToListen=t;var n=this;this._notified=!1,this.listener=function(){n._notifyReady(n.callbacks)}};n.prototype.begin=function(){document.addEventListener(this.eventNamesToListen.document,this.listener),window.addEventListener(this.eventNamesToListen.window,this.listener)},n.prototype.end=function(){this._notified=!1,document.removeEventListener(this.eventNamesToListen.document,this.listener),window.removeEventListener(this.eventNamesToListen.window,this.listener),this.callbacks=[]},n.prototype.ready=function(t){this.callbacks.push(t)},n.prototype._notifyReady=function(t){this._notified||(this._notified=!0,t.forEach(function(t){t()}),t=[])},n.prototype._documentIsReady=function(){var t=document.readyState,n=document.documentElement.doScroll;return!("complete"!==t)||!("loading"===t)&&!n},t.RayNS.Document=n}(window),function(t){t.RayNS=t.RayNS||{};var n=function(t){this.eventBus=t};n.prototype.execute=function(){var o="data-ray-component",r=this;return document.querySelectorAll("["+o+"]").forEach(function(t){var n="data-ray-component-executed";if(!t.hasAttribute(n)){t.setAttribute(n,"");var e=t.getAttribute(o),i=e.split(".").pop();new(0,function(t){var n=t.split(".");n.pop();var e=window;return n.forEach(function(t){e=e[t]}),e}(e)[i])({DOMElement:t,bus:r.eventBus})}})},t.RayNS.Watcher=n}(window),function(t){t.RayNS=t.RayNS||{};var n=function(){this._init()};n.prototype._init=function(){this.topics={},this.id=0},n.prototype.on=function(t,n){return this.topics[t]||(this.topics[t]=[]),this.id++,this.topics[t].push({id:this.id,callback:n}),this.id},n.prototype.off=function(t){for(var n in this.topics){if(!this.topics[n])return!1;for(var e=0,i=this.topics[n].length;e<i;e++)if(this.topics[n][e].id===t)return this.topics[n].splice(e,1),!0}return!1},n.prototype.end=function(){this._init()},n.prototype.trigger=function(n,e){if(!this.topics[n])return!1;var i=this;return setTimeout(function(){var t=i.topics[n];t&&t.forEach(function(t){t.callback(e)})},0),!0},t.RayNS.EventBus=n}(window),function(t){t.RayNS=t.RayNS||{};var n=function(t){this.eventNamesToListen=t||{document:"DOMContentLoaded",window:"load"},this.raydocument=new RayNS.Document(this.eventNamesToListen),this.eventBus=new RayNS.EventBus};n.prototype.begin=function(){this.raydocument.begin();var t=new RayNS.Watcher(this.eventBus);this.raydocument.ready(function(){t.execute()}),setInterval(function(){t.execute()},400)},n.prototype.end=function(){this.raydocument.end(),this.eventBus.end()},t.RayNS.Ray=n}(window);var ray=new RayNS.Ray;ray.begin();