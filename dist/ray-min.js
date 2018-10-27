Array.prototype.forEach||(Array.prototype.forEach=function(t,n){"use strict";var e,o;if(null==this)throw new TypeError("this is null or not defined");var i,a=Object(this),r=a.length>>>0;if("[object Function]"!=={}.toString.call(t))throw new TypeError(t+" is not a function");for(2<=arguments.length&&(e=n),o=0;o<r;)o in a&&(i=a[o],t.call(e,i,o,a)),o++});var _createClass=function(){function o(t,n){for(var e=0;e<n.length;e++){var o=n[e];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(t,n,e){return n&&o(t.prototype,n),e&&o(t,e),t}}();function _classCallCheck(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}var Document=function(){function e(t){_classCallCheck(this,e),this.callbacks=[],this.eventNamesToListen=t;var n=this;this._notified=!1,this.listener=function(){n._notifyReady(n.callbacks)}}return _createClass(e,[{key:"begin",value:function(){document.addEventListener(this.eventNamesToListen.document,this.listener),window.addEventListener(this.eventNamesToListen.window,this.listener)}},{key:"end",value:function(){this._notified=!1,document.removeEventListener(this.eventNamesToListen.document,this.listener),window.removeEventListener(this.eventNamesToListen.window,this.listener),this.callbacks=[]}},{key:"ready",value:function(t){this.callbacks.push(t)}},{key:"_notifyReady",value:function(t){this._notified||(this._notified=!0,t.forEach(function(t){t()}),t=[])}},{key:"_documentIsReady",value:function(){var t=document.readyState,n=document.documentElement.doScroll;return!("complete"!==t)||!("loading"===t)&&!n}}]),e}();window.RayNS=window.RayNS||{},window.RayNS.Document=Document;_createClass=function(){function o(t,n){for(var e=0;e<n.length;e++){var o=n[e];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(t,n,e){return n&&o(t.prototype,n),e&&o(t,e),t}}();function _classCallCheck(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}var ComponentData=function(){function o(t,n,e){_classCallCheck(this,o),this.DOMElement=t,this.bus=n,this.commandDispatcher=e}return _createClass(o,[{key:"_init",value:function(){this.topics={},this.id=0}}],[{key:"create",value:function(t,n,e){return new o(t,n,e)}}]),o}();window.RayNS=window.RayNS||{},window.RayNS.ComponentData=ComponentData;_createClass=function(){function o(t,n){for(var e=0;e<n.length;e++){var o=n[e];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(t,n,e){return n&&o(t.prototype,n),e&&o(t,e),t}}();function _classCallCheck(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}var Component=function(){function r(t,n){_classCallCheck(this,r),this.componentConstructorFn=t,this.data=n}return _createClass(r,[{key:"execute",value:function(){return new this.componentConstructorFn(this.data)}}],[{key:"create",value:function(t,n){var e=RayNS.ComponentData.create(t,n),o=t.getAttribute(r.DATA_RAY_ATTR),i=o.split(".").pop(),a=function(t){var n=t.split(".");n.pop();var e=window;return n.forEach(function(t){e=e[t]}),e}(o)[i];if(void 0===a)throw new Error("<"+i+"> JS object not Found");return new r(a,e)}},{key:"DATA_RAY_ATTR",get:function(){return"data-ray-component"}}]),r}();window.RayNS=window.RayNS||{},window.RayNS.Component=Component;_createClass=function(){function o(t,n){for(var e=0;e<n.length;e++){var o=n[e];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(t,n,e){return n&&o(t.prototype,n),e&&o(t,e),t}}();function _classCallCheck(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}Component=RayNS.Component;var CommandDispatcher=function(){function n(t){_classCallCheck(this,n),this.eventBus=t}return _createClass(n,[{key:"loadNewComponents",value:function(){var t=RayNS.Component.DATA_RAY_ATTR,e=this;return document.querySelectorAll("["+t+"]").forEach(function(t){try{var n="data-ray-component-executed";if(t.hasAttribute(n))return;t.setAttribute(n,""),Component.create(t,e.eventBus).execute()}catch(t){e.eventBus.trigger("ray.error",t),console.log("RayJS: Error loading components: "+t.message)}})}}]),n}();window.RayNS=window.RayNS||{},window.RayNS.CommandDispatcher=CommandDispatcher,function(t){t.RayNS=t.RayNS||{};var n=function(){this._init()};n.prototype._init=function(){this.topics={},this.id=0},n.prototype.on=function(t,n){return this.topics[t]||(this.topics[t]=[]),this.id++,this.topics[t].push({id:this.id,callback:n}),this.id},n.prototype.off=function(t){for(var n in this.topics){if(!this.topics[n])return!1;for(var e=0,o=this.topics[n].length;e<o;e++)if(this.topics[n][e].id===t)return this.topics[n].splice(e,1),!0}return!1},n.prototype.end=function(){this._init()},n.prototype.trigger=function(n,e){if(!this.topics[n])return!1;var o=this;return setTimeout(function(){var t=o.topics[n];t&&t.forEach(function(t){t.callback(e)})},0),!0},n.create=function(){return new n},t.RayNS.EventBus=n}(window),function(t){t.RayNS=t.RayNS||{};var n=function(t){this.eventNamesToListen=t||{document:"DOMContentLoaded",window:"load"},this.raydocument=new RayNS.Document(this.eventNamesToListen),this.eventBus=RayNS.EventBus.create(),this.commandDispatcher=new RayNS.CommandDispatcher(this.eventBus)};n.prototype.begin=function(){this.raydocument.begin();var t=this;this.raydocument.ready(function(){t.commandDispatcher.loadNewComponents()}),this.intervalId=setInterval(function(){t.commandDispatcher.loadNewComponents()},400)},n.prototype.end=function(){clearInterval(this.intervalId),this.raydocument.end(),this.eventBus.end()},n.prototype.getCommandDispatcher=function(){return this.commandDispatcher},n.createBus=function(){return RayNS.EventBus.create()},n.createComponent=function(t,n){return RayNS.Component.create(t,n)},t.RayNS.Ray=n}(window);