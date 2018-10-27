"use strict";

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
window.RayNS.ComponentData = ComponentData;