// Production steps of ECMA-262, Edition 5, 15.4.4.18
// Reference: http://es5.github.com/#x15.4.4.18
if (!Array.prototype.forEach) {

    Array.prototype.forEach = function forEach(callback, thisArg) {
        'use strict';
        var T, k;

        if (this == null) {
            throw new TypeError("this is null or not defined");
        }

        var kValue,
        // 1. Let O be the result of calling ToObject passing the |this| value as the argument.
            O = Object(this),

        // 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".
        // 3. Let len be ToUint32(lenValue).
            len = O.length >>> 0; // Hack to convert O.length to a UInt32

        // 4. If IsCallable(callback) is false, throw a TypeError exception.
        // See: http://es5.github.com/#x9.11
        if ({}.toString.call(callback) !== "[object Function]") {
            throw new TypeError(callback + " is not a function");
        }

        // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
        if (arguments.length >= 2) {
            T = thisArg;
        }

        // 6. Let k be 0
        k = 0;

        // 7. Repeat, while k < len
        while (k < len) {

            // a. Let Pk be ToString(k).
            //   This is implicit for LHS operands of the in operator
            // b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.
            //   This step can be combined with c
            // c. If kPresent is true, then
            if (k in O) {

                // i. Let kValue be the result of calling the Get internal method of O with argument Pk.
                kValue = O[k];

                // ii. Call the Call internal method of callback with T as the this value and
                // argument list containing kValue, k, and O.
                callback.call(T, kValue, k, O);
            }
            // d. Increase k by 1.
            k++;
        }
        // 8. return undefined
    };
}'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Document = function () {
    function Document(eventsToListen) {
        _classCallCheck(this, Document);

        this.callbacks = [];
        this.eventNamesToListen = eventsToListen;
        var self = this;
        this._notified = false;

        this.listener = function () {
            self._notifyReady(self.callbacks);
        };
    }

    _createClass(Document, [{
        key: 'begin',
        value: function begin() {
            document.addEventListener(this.eventNamesToListen.document, this.listener);
            window.addEventListener(this.eventNamesToListen.window, this.listener);
        }
    }, {
        key: 'end',
        value: function end() {
            this._notified = false;
            document.removeEventListener(this.eventNamesToListen.document, this.listener);
            window.removeEventListener(this.eventNamesToListen.window, this.listener);
            this.callbacks = [];
        }
    }, {
        key: 'ready',
        value: function ready(callback) {
            //if (this._documentIsReady()) {
            //    callback();
            //} else {
            this.callbacks.push(callback);
            //}
        }
    }, {
        key: '_notifyReady',
        value: function _notifyReady(callbacks) {
            if (this._notified) return;
            this._notified = true;
            callbacks.forEach(function (callback) {
                callback();
            });
            callbacks = [];
        }
    }, {
        key: '_documentIsReady',
        value: function _documentIsReady() {
            var readyState = document.readyState;
            var isScrolling = document.documentElement.doScroll;
            var isComplete = readyState === 'complete';
            var isLoading = readyState === 'loading';
            if (isComplete) return true;
            if (!isLoading && !isScrolling) {
                return true;
            }
            return false;
        }
    }]);

    return Document;
}();

window.RayNS = window.RayNS || {};
window.RayNS.Document = Document;"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ComponentData = function () {
    function ComponentData(domElement, bus, commandDispatcher) {
        _classCallCheck(this, ComponentData);

        this.DOMElement = domElement;
        this.bus = bus;
        this.commandDispatcher = commandDispatcher;
    }

    _createClass(ComponentData, [{
        key: "_init",
        value: function _init() {
            this.topics = {};
            this.id = 0;
        }
    }], [{
        key: "create",
        value: function create(domElement, bus, commandDispatcher) {
            //TODO: quitar commandDispatcher.
            //TODO: sustituir por un comando que tiramos al bus (ray.refresh)?
            return new ComponentData(domElement, bus, commandDispatcher);
        }
    }]);

    return ComponentData;
}();

window.RayNS = window.RayNS || {};
window.RayNS.ComponentData = ComponentData;(function (exports) {

    exports.RayNS=exports.RayNS || {};

    var Component=function(componentConstructorFn, data) {
        this.componentConstructorFn=componentConstructorFn;
        this.data=data;
    };

    Component.prototype.execute=function(){
        return new this.componentConstructorFn(this.data);
    };

    Component.DATA_RAY_ATTR= "data-ray-component";

    Component.create=function(domElement, bus) {
        function getComponentName(dataRayComponentAttrValue) {
            var namespaces = dataRayComponentAttrValue.split(".");
            return namespaces.pop();
        }

        function getLastNamespaceObject(dataRayComponentAttrValue) {
            var namespaces = dataRayComponentAttrValue.split(".");
            namespaces.pop();

            var obj=window;
            namespaces.forEach(function(namespace){
                obj=obj[namespace];
            });
            return obj;
        }

        var data=RayNS.ComponentData.create(domElement, bus);

        var dataRayComponentAttrValue = domElement.getAttribute(Component.DATA_RAY_ATTR);
        var componentName = getComponentName(dataRayComponentAttrValue);
        var lastNamespaceObject = getLastNamespaceObject(dataRayComponentAttrValue);
        var componentConstructorFn = lastNamespaceObject[componentName];
        if (componentConstructorFn==undefined) {
            throw new Error("<"+componentName+"> JS object not Found");
        }
        return new Component(componentConstructorFn, data);
    };

    exports.RayNS.Component=Component;
})(window);


(function (exports) {

    exports.RayNS=exports.RayNS || {};

    var Component=RayNS.Component;

    var CommandDispatcher=function(eventBus)
    {
        this.eventBus = eventBus;
    };

    CommandDispatcher.EXECUTED_ATTRIBUTE = 'data-ray-component-executed';

    CommandDispatcher.prototype.loadNewComponents = function() {
        var DATA_RAY_ATTR=RayNS.Component.DATA_RAY_ATTR;
        var self = this;
        return document.querySelectorAll("["+DATA_RAY_ATTR+"]").forEach(function(domElement){
            try {
                var EXECUTED_ATTRIBUTE = CommandDispatcher.EXECUTED_ATTRIBUTE;
                if (domElement.hasAttribute(EXECUTED_ATTRIBUTE)) {
                    return;
                }
                domElement.setAttribute(EXECUTED_ATTRIBUTE, '');

                var component=Component.create(domElement, self.eventBus);
                component.execute();
            } catch (e) {
                self.eventBus.trigger("ray.error", e);
                console.log("RayJS: Error loading components: "+ e.message);
            }
        });
    };

    exports.RayNS.CommandDispatcher=CommandDispatcher;
})(window);


//Adapted from https://gist.github.com/fatihacet/1290216

(function (exports) {

    exports.RayNS=exports.RayNS || {};

    var EventBus=function() {
        this._init();
    };

    EventBus.prototype._init=function() {
        this.topics = {};
        this.id = 0;
    };

    EventBus.prototype.on = function(topic, callback) {
        if (!this.topics[topic]) {
            this.topics[topic] = [];
        }
        this.id++;
        this.topics[topic].push({
            id: this.id,
            callback: callback
        });
        return this.id;
    };

    EventBus.prototype.off = function(id) {
        for (var m in this.topics) {
            if (!this.topics[m]) return false;
            for (var i = 0, len = this.topics[m].length; i < len; i++) {
                if (this.topics[m][i].id === id) {
                    this.topics[m].splice(i, 1);
                    return true;
                }
            }
        }
        return false;
    };

    EventBus.prototype.end = function() {
        this._init();
    };

    EventBus.prototype.trigger = function(topic, args) {
        if (!this.topics[topic]) {
            return false;
        }
        var self=this;
        setTimeout(function() {
            var subscribers = self.topics[topic];
            if (!subscribers) return;
            subscribers.forEach(function(suscriber){
                suscriber.callback(args);
            });
        }, 0);
        return true;
    };

    EventBus.create=function() {
        return new EventBus();
    };

    exports.RayNS.EventBus=EventBus;
})(window);


(function (exports) {

    exports.RayNS=exports.RayNS || {};

    var Ray=function(eventNamesToListen) {
        this.eventNamesToListen=eventNamesToListen || {document:'DOMContentLoaded', window:'load'};
        this.raydocument=new RayNS.Document(this.eventNamesToListen);
        this.eventBus=RayNS.EventBus.create();
        this.commandDispatcher = new RayNS.CommandDispatcher(this.eventBus);
    };

    Ray.prototype.begin=function() {
        this.raydocument.begin();
        var self = this;
        this.raydocument.ready(function(){
            self.commandDispatcher.loadNewComponents();
        });
        this.intervalId=setInterval(function(){
            self.commandDispatcher.loadNewComponents();
        },400);
    };

    Ray.prototype.end=function() {
        clearInterval(this.intervalId);
        this.raydocument.end();
        this.eventBus.end();
    };

    Ray.prototype.getCommandDispatcher=function() {
        return this.commandDispatcher;
    };

    Ray.createBus=function() {
        return RayNS.EventBus.create();
    };

    Ray.createComponent=function(domElement, bus) {
        return RayNS.Component.create(domElement, bus);
    };

    exports.RayNS.Ray=Ray;
})(window);

