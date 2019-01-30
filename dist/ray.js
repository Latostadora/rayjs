"use strict";

// Production steps of ECMA-262, Edition 5, 15.4.4.18
// Reference: http://es5.github.com/#x15.4.4.18
if (!Array.prototype.forEach) {

    Array.prototype.forEach = function forEach(callback, thisArg) {
        var T = void 0;
        var k = void 0;

        if (this == null) {
            throw new TypeError("this is null or not defined");
        }

        var kValue = void 0; // Hack to convert O.length to a UInt32

        var // 1. Let O be the result of calling ToObject passing the |this| value as the argument.
        O = Object(this);

        var // 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".
        // 3. Let len be ToUint32(lenValue).
        len = O.length >>> 0;

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

var Commands = function () {
    function Commands() {
        _classCallCheck(this, Commands);
    }

    _createClass(Commands, null, [{
        key: "EXECUTE_NEW_COMPONENTS",
        get: function get() {
            return "ray.command.execute-new-components";
        }
    }]);

    return Commands;
}();

window.RayNS = window.RayNS || {};
window.RayNS.Commands = Commands;"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Events = function () {
    function Events() {
        _classCallCheck(this, Events);
    }

    _createClass(Events, null, [{
        key: "ERROR",
        get: function get() {
            return "ray.event.error";
        }
    }]);

    return Events;
}();

window.RayNS = window.RayNS || {};
window.RayNS.Events = Events;"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Events = RayNS.Events;

var ComponentData = function () {
    function ComponentData(domElement, bus) {
        _classCallCheck(this, ComponentData);

        this.DOMElement = domElement;
        this.bus = bus;
        this.params = this.getParams(domElement);
    }

    _createClass(ComponentData, [{
        key: "getParams",
        value: function getParams(domElement) {
            var domParams = domElement.dataset.rayParams;
            var params = {};
            if (domParams == undefined) {
                return params;
            }

            try {
                params = JSON.parse(domParams);
            } catch (e) {
                var errorMessage = "Invalid JSON syntax in data-ray-params: '" + domParams + "'";
                throw new Error(errorMessage);
            }

            this.DOMElement.removeAttribute('data-ray-params');

            return params;
        }
    }], [{
        key: "create",
        value: function create(domElement, bus) {
            return new ComponentData(domElement, bus);
        }
    }]);

    return ComponentData;
}();

window.RayNS = window.RayNS || {};
window.RayNS.ComponentData = ComponentData;"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Component = function () {
    function Component(componentConstructorFn, data) {
        _classCallCheck(this, Component);

        this.componentConstructorFn = componentConstructorFn;
        this.data = data;
    }

    _createClass(Component, [{
        key: "execute",
        value: function execute() {
            new this.componentConstructorFn(this.data);
        }
    }], [{
        key: "execute",
        value: function execute(domElement, bus) {

            var getComponentName = function getComponentName(dataRayComponentAttrValue) {
                var namespaces = dataRayComponentAttrValue.split(".");
                return namespaces.pop();
            };

            var getLastNamespaceObject = function getLastNamespaceObject(dataRayComponentAttrValue) {
                var namespaces = dataRayComponentAttrValue.split(".");
                namespaces.pop();

                var obj = window;
                namespaces.forEach(function (namespace) {
                    obj = obj[namespace];
                });
                return obj;
            };

            var data = RayNS.ComponentData.create(domElement, bus);
            var dataRayComponentsAttrValue = domElement.getAttribute(Component.DATA_RAY_ATTR).split(",");
            dataRayComponentsAttrValue.forEach(function (dataRayComponentAttrValue) {
                var componentsExecuted = domElement.getAttribute(Component.DATA_RAY_EXECUTED_ATTR);
                if (componentsExecuted === null) {
                    componentsExecuted = [];
                } else {
                    componentsExecuted = componentsExecuted.split(',');
                }

                var componentName = getComponentName(dataRayComponentAttrValue);

                if (componentsExecuted.indexOf(dataRayComponentAttrValue) > -1) {
                    return;
                }

                var lastNamespaceObject = getLastNamespaceObject(dataRayComponentAttrValue);
                var componentConstructorFn = lastNamespaceObject[componentName];
                if (componentConstructorFn === undefined) {
                    throw new Error("<" + componentName + "> JS object not Found");
                }
                var component = new Component(componentConstructorFn, data);
                component.execute();

                componentsExecuted.push(dataRayComponentAttrValue);
                domElement.setAttribute(Component.DATA_RAY_EXECUTED_ATTR, componentsExecuted.join(','));
            });
        }
    }, {
        key: "DATA_RAY_ATTR",
        get: function get() {
            return "data-ray-component";
        }
    }, {
        key: "DATA_RAY_EXECUTED_ATTR",
        get: function get() {
            return "data-ray-component-executed";
        }
    }]);

    return Component;
}();

window.RayNS = window.RayNS || {};
window.RayNS.Component = Component;"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Component = RayNS.Component;
var Events = RayNS.Events;
var Commands = RayNS.Commands;

var CommandDispatcher = function () {
    function CommandDispatcher(bus) {
        _classCallCheck(this, CommandDispatcher);

        this.bus = bus;
    }

    _createClass(CommandDispatcher, [{
        key: "begin",
        value: function begin() {
            var self = this;
            this.listenerToExecNewComponents = this.bus.on(Commands.EXECUTE_NEW_COMPONENTS, function () {
                self._executeNewComponents();
            });
            this.listenerToCatchError = this.bus.on(Events.ERROR, function (e) {
                console.error("RayJS Error: " + e.stack);
            });
        }
    }, {
        key: "end",
        value: function end() {
            this.bus.off(this.listenerToExecNewComponents);
            this.bus.off(this.listenerToCatchError);
        }
    }, {
        key: "_executeNewComponents",
        value: function _executeNewComponents() {
            var DATA_RAY_ATTR = RayNS.Component.DATA_RAY_ATTR;
            var self = this;
            return document.querySelectorAll("[" + DATA_RAY_ATTR + "]").forEach(function (domElement) {
                try {
                    Component.execute(domElement, self.bus);
                } catch (e) {
                    self.bus.trigger(Events.ERROR, e);
                }
            });
        }
    }]);

    return CommandDispatcher;
}();

window.RayNS = window.RayNS || {};
window.RayNS.CommandDispatcher = CommandDispatcher;"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//Adapted from https://gist.github.com/fatihacet/1290216
var Bus = function () {
    function Bus() {
        _classCallCheck(this, Bus);

        this._init();
    }

    _createClass(Bus, [{
        key: "_init",
        value: function _init() {
            this.topics = {};
            this.id = 0;
        }
    }, {
        key: "on",
        value: function on(topic, callback) {
            if (!this.topics[topic]) {
                this.topics[topic] = [];
            }
            this.id++;
            this.topics[topic].push({
                id: this.id,
                callback: callback
            });
            return this.id;
        }
    }, {
        key: "off",
        value: function off(id) {
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
        }
    }, {
        key: "end",
        value: function end() {
            this._init();
        }
    }, {
        key: "trigger",
        value: function trigger(topic, args) {
            if (!this.topics[topic]) {
                return false;
            }
            var self = this;
            var subscribers = self.topics[topic];
            if (!subscribers) return;
            subscribers.forEach(function (suscriber) {
                suscriber.callback(args);
            });
            return true;
        }
    }], [{
        key: "create",
        value: function create() {
            return new Bus();
        }
    }]);

    return Bus;
}();

window.RayNS = window.RayNS || {};
window.RayNS.Bus = Bus;'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Ray = function () {
    function Ray(eventNamesToListen) {
        _classCallCheck(this, Ray);

        this.eventNamesToListen = eventNamesToListen || { document: 'DOMContentLoaded', window: 'load' };
        this.raydocument = new RayNS.Document(this.eventNamesToListen);
        this.bus = RayNS.Bus.create();
        this.commandDispatcher = new RayNS.CommandDispatcher(this.bus);
    }

    _createClass(Ray, [{
        key: 'begin',
        value: function begin() {
            this.commandDispatcher.begin();
            this.raydocument.begin();
            var self = this;
            this.raydocument.ready(function () {
                self.bus.trigger(RayNS.Commands.EXECUTE_NEW_COMPONENTS);
            });
            this.intervalId = setInterval(function () {
                self.bus.trigger(RayNS.Commands.EXECUTE_NEW_COMPONENTS);
            }, 400);
        }
    }, {
        key: 'end',
        value: function end() {
            clearInterval(this.intervalId);
            this.raydocument.end();
            this.bus.end();
            this.commandDispatcher.end();
        }
    }], [{
        key: 'createBus',
        value: function createBus() {
            return RayNS.Bus.create();
        }
    }, {
        key: 'executeComponent',
        value: function executeComponent(domElement, bus) {
            RayNS.Component.execute(domElement, bus);
        }
    }, {
        key: 'Events',
        get: function get() {
            return RayNS.Events;
        }
    }, {
        key: 'Commands',
        get: function get() {
            return RayNS.Commands;
        }
    }]);

    return Ray;
}();

window.Ray = Ray;
module.exports = Ray;