'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Commands = RayNS.Commands;

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
                self.bus.trigger(Commands.EXECUTE_NEW_COMPONENTS);
            });
            this.intervalId = setInterval(function () {
                self.bus.trigger(Commands.EXECUTE_NEW_COMPONENTS);
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
        key: 'createComponent',
        value: function createComponent(domElement, bus) {
            return RayNS.Component.create(domElement, bus);
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

window.RayNS = window.RayNS || {};
window.RayNS.Ray = Ray;
module.exports = Ray;