"use strict";Array.prototype.forEach||(Array.prototype.forEach=function(e,n){var t=void 0,a=void 0;if(null==this)throw new TypeError("this is null or not defined");var o=void 0,r=Object(this),i=r.length>>>0;if("[object Function]"!=={}.toString.call(e))throw new TypeError(e+" is not a function");for(2<=arguments.length&&(t=n),a=0;a<i;)a in r&&(o=r[a],e.call(t,o,a,r)),a++});var _createClass=function(){function a(e,n){for(var t=0;t<n.length;t++){var a=n[t];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(e,n,t){return n&&a(e.prototype,n),t&&a(e,t),e}}();function _classCallCheck(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}var Document=function(){function t(e){_classCallCheck(this,t),this.callbacks=[],this.eventNamesToListen=e;var n=this;this._notified=!1,this.listener=function(){n._notifyReady(n.callbacks)}}return _createClass(t,[{key:"begin",value:function(){document.addEventListener(this.eventNamesToListen.document,this.listener),window.addEventListener(this.eventNamesToListen.window,this.listener)}},{key:"end",value:function(){this._notified=!1,document.removeEventListener(this.eventNamesToListen.document,this.listener),window.removeEventListener(this.eventNamesToListen.window,this.listener),this.callbacks=[]}},{key:"ready",value:function(e){this.callbacks.push(e)}},{key:"_notifyReady",value:function(e){this._notified||(this._notified=!0,e.forEach(function(e){e()}),e=[])}},{key:"_documentIsReady",value:function(){var e=document.readyState,n=document.documentElement.doScroll;return!("complete"!==e)||!("loading"===e)&&!n}}]),t}();window.RayNS=window.RayNS||{},window.RayNS.Document=Document;_createClass=function(){function a(e,n){for(var t=0;t<n.length;t++){var a=n[t];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(e,n,t){return n&&a(e.prototype,n),t&&a(e,t),e}}();function _classCallCheck(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}var Commands=function(){function e(){_classCallCheck(this,e)}return _createClass(e,null,[{key:"EXECUTE_NEW_COMPONENTS",get:function(){return"ray.command.execute-new-components"}}]),e}();window.RayNS=window.RayNS||{},window.RayNS.Commands=Commands;_createClass=function(){function a(e,n){for(var t=0;t<n.length;t++){var a=n[t];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(e,n,t){return n&&a(e.prototype,n),t&&a(e,t),e}}();function _classCallCheck(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}var Events=function(){function e(){_classCallCheck(this,e)}return _createClass(e,null,[{key:"ERROR",get:function(){return"ray.event.error"}}]),e}();window.RayNS=window.RayNS||{},window.RayNS.Events=Events;_createClass=function(){function a(e,n){for(var t=0;t<n.length;t++){var a=n[t];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(e,n,t){return n&&a(e.prototype,n),t&&a(e,t),e}}();function _classCallCheck(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}Events=RayNS.Events;var ComponentData=function(){function a(e,n){_classCallCheck(this,a),this.DOMElement=e,this.bus=n,this.params={};var t=e.dataset.rayParams;if(null!=t)try{this.params=JSON.parse(t)}catch(e){throw this.params={},new Error("Invalid JSON syntax in data-ray-params: '"+t+"'")}}return _createClass(a,null,[{key:"create",value:function(e,n){return new a(e,n)}}]),a}();window.RayNS=window.RayNS||{},window.RayNS.ComponentData=ComponentData;_createClass=function(){function a(e,n){for(var t=0;t<n.length;t++){var a=n[t];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(e,n,t){return n&&a(e.prototype,n),t&&a(e,t),e}}();function _classCallCheck(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}var Component=function(){function i(e,n){_classCallCheck(this,i),this.componentConstructorFn=e,this.data=n}return _createClass(i,[{key:"execute",value:function(){new this.componentConstructorFn(this.data)}}],[{key:"execute",value:function(e,n){var t=RayNS.ComponentData.create(e,n),a=e.getAttribute(i.DATA_RAY_ATTR),o=a.split(".").pop(),r=function(e){var n=e.split(".");n.pop();var t=window;return n.forEach(function(e){t=t[e]}),t}(a)[o];if(void 0===r)throw new Error("<"+o+"> JS object not Found");new i(r,t).execute()}},{key:"DATA_RAY_ATTR",get:function(){return"data-ray-component"}}]),i}();window.RayNS=window.RayNS||{},window.RayNS.Component=Component;_createClass=function(){function a(e,n){for(var t=0;t<n.length;t++){var a=n[t];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(e,n,t){return n&&a(e.prototype,n),t&&a(e,t),e}}();function _classCallCheck(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}Component=RayNS.Component,Events=RayNS.Events,Commands=RayNS.Commands;var CommandDispatcher=function(){function n(e){_classCallCheck(this,n),this.bus=e}return _createClass(n,[{key:"begin",value:function(){var e=this;this.listenerToExecNewComponents=this.bus.on(Commands.EXECUTE_NEW_COMPONENTS,function(){e._executeNewComponents()}),this.listenerToCatchError=this.bus.on(Events.ERROR,function(e){console.error("RayJS Error: "+e.stack)})}},{key:"end",value:function(){this.bus.off(this.listenerToExecNewComponents),this.bus.off(this.listenerToCatchError)}},{key:"_executeNewComponents",value:function(){var e=RayNS.Component.DATA_RAY_ATTR,t=this;return document.querySelectorAll("["+e+"]").forEach(function(e){try{var n="data-ray-component-executed";if(e.hasAttribute(n))return;e.setAttribute(n,""),Component.execute(e,t.bus)}catch(e){t.bus.trigger(Events.ERROR,e)}})}}]),n}();window.RayNS=window.RayNS||{},window.RayNS.CommandDispatcher=CommandDispatcher;_createClass=function(){function a(e,n){for(var t=0;t<n.length;t++){var a=n[t];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(e,n,t){return n&&a(e.prototype,n),t&&a(e,t),e}}();function _classCallCheck(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}var Bus=function(){function e(){_classCallCheck(this,e),this._init()}return _createClass(e,[{key:"_init",value:function(){this.topics={},this.id=0}},{key:"on",value:function(e,n){return this.topics[e]||(this.topics[e]=[]),this.id++,this.topics[e].push({id:this.id,callback:n}),this.id}},{key:"off",value:function(e){for(var n in this.topics){if(!this.topics[n])return!1;for(var t=0,a=this.topics[n].length;t<a;t++)if(this.topics[n][t].id===e)return this.topics[n].splice(t,1),!0}return!1}},{key:"end",value:function(){this._init()}},{key:"trigger",value:function(e,n){if(!this.topics[e])return!1;var t=this.topics[e];return t?(t.forEach(function(e){e.callback(n)}),!0):void 0}}],[{key:"create",value:function(){return new e}}]),e}();window.RayNS=window.RayNS||{},window.RayNS.Bus=Bus;_createClass=function(){function a(e,n){for(var t=0;t<n.length;t++){var a=n[t];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(e,n,t){return n&&a(e.prototype,n),t&&a(e,t),e}}();function _classCallCheck(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}var Ray=function(){function n(e){_classCallCheck(this,n),this.eventNamesToListen=e||{document:"DOMContentLoaded",window:"load"},this.raydocument=new RayNS.Document(this.eventNamesToListen),this.bus=RayNS.Bus.create(),this.commandDispatcher=new RayNS.CommandDispatcher(this.bus)}return _createClass(n,[{key:"begin",value:function(){this.commandDispatcher.begin(),this.raydocument.begin();var e=this;this.raydocument.ready(function(){e.bus.trigger(RayNS.Commands.EXECUTE_NEW_COMPONENTS)}),this.intervalId=setInterval(function(){e.bus.trigger(RayNS.Commands.EXECUTE_NEW_COMPONENTS)},400)}},{key:"end",value:function(){clearInterval(this.intervalId),this.raydocument.end(),this.bus.end(),this.commandDispatcher.end()}}],[{key:"createBus",value:function(){return RayNS.Bus.create()}},{key:"executeComponent",value:function(e,n){RayNS.Component.execute(e,n)}},{key:"Events",get:function(){return RayNS.Events}},{key:"Commands",get:function(){return RayNS.Commands}}]),n}();window.Ray=Ray,module.exports=Ray;