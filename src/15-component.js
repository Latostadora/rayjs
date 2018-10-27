"use strict";

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
            return new this.componentConstructorFn(this.data);
        }
    }], [{
        key: "create",
        value: function create(domElement, bus) {

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

            var dataRayComponentAttrValue = domElement.getAttribute(Component.DATA_RAY_ATTR);
            var componentName = getComponentName(dataRayComponentAttrValue);
            var lastNamespaceObject = getLastNamespaceObject(dataRayComponentAttrValue);
            var componentConstructorFn = lastNamespaceObject[componentName];
            if (componentConstructorFn === undefined) {
                throw new Error("<" + componentName + "> JS object not Found");
            }
            return new Component(componentConstructorFn, data);
        }
    }, {
        key: "DATA_RAY_ATTR",
        get: function get() {
            return "data-ray-component";
        }
    }]);

    return Component;
}();

window.RayNS = window.RayNS || {};
window.RayNS.Component = Component;