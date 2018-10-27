'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Component = RayNS.Component;

var CommandDispatcher = function () {
    function CommandDispatcher(eventBus) {
        _classCallCheck(this, CommandDispatcher);

        this.eventBus = eventBus;
    }

    _createClass(CommandDispatcher, [{
        key: 'loadNewComponents',
        value: function loadNewComponents() {
            var DATA_RAY_ATTR = RayNS.Component.DATA_RAY_ATTR;
            var self = this;
            return document.querySelectorAll('[' + DATA_RAY_ATTR + ']').forEach(function (domElement) {
                try {
                    var EXECUTED_ATTRIBUTE = 'data-ray-component-executed';
                    if (domElement.hasAttribute(EXECUTED_ATTRIBUTE)) {
                        return;
                    }
                    domElement.setAttribute(EXECUTED_ATTRIBUTE, '');

                    var component = Component.create(domElement, self.eventBus);
                    component.execute();
                } catch (e) {
                    self.eventBus.trigger("ray.error", e);
                    console.log('RayJS: Error loading components: ' + e.message);
                }
            });
        }
    }]);

    return CommandDispatcher;
}();

window.RayNS = window.RayNS || {};
window.RayNS.CommandDispatcher = CommandDispatcher;