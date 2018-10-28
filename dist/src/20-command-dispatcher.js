'use strict';

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
        key: 'begin',
        value: function begin() {
            var self = this;
            this.listenerToExecNewComponents = this.bus.on(Commands.EXECUTE_NEW_COMPONENTS, function () {
                self._executeNewComponents();
            });
        }
    }, {
        key: 'end',
        value: function end() {
            this.bus.off(this.listenerToExecNewComponents);
        }
    }, {
        key: '_executeNewComponents',
        value: function _executeNewComponents() {
            var DATA_RAY_ATTR = RayNS.Component.DATA_RAY_ATTR;
            var self = this;
            return document.querySelectorAll('[' + DATA_RAY_ATTR + ']').forEach(function (domElement) {
                try {
                    var EXECUTED_ATTRIBUTE = 'data-ray-component-executed';
                    if (domElement.hasAttribute(EXECUTED_ATTRIBUTE)) {
                        return;
                    }
                    domElement.setAttribute(EXECUTED_ATTRIBUTE, '');

                    var component = Component.create(domElement, self.bus);
                    component.execute();
                } catch (e) {
                    self.bus.trigger(Events.ERROR, e);
                    console.log('RayJS: Error loading components: ' + e.message);
                }
            });
        }
    }]);

    return CommandDispatcher;
}();

window.RayNS = window.RayNS || {};
window.RayNS.CommandDispatcher = CommandDispatcher;