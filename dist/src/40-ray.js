'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Ray = function () {
    function Ray(eventNamesToListen) {
        _classCallCheck(this, Ray);

        this.eventNamesToListen = eventNamesToListen || { document: 'DOMContentLoaded', window: 'load' };
        this.raydocument = new RayNS.Document(this.eventNamesToListen);
        this.eventBus = RayNS.Bus.create();
        this.commandDispatcher = new RayNS.CommandDispatcher(this.eventBus);
    }

    _createClass(Ray, [{
        key: 'begin',
        value: function begin() {
            this.raydocument.begin();
            var self = this;
            this.raydocument.ready(function () {
                self.commandDispatcher.loadNewComponents();
            });
            this.intervalId = setInterval(function () {
                self.commandDispatcher.loadNewComponents();
            }, 400);
        }
    }, {
        key: 'end',
        value: function end() {
            clearInterval(this.intervalId);
            this.raydocument.end();
            this.eventBus.end();
        }
    }, {
        key: 'getCommandDispatcher',
        value: function getCommandDispatcher() {
            return this.commandDispatcher;
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
    }]);

    return Ray;
}();

window.RayNS = window.RayNS || {};
window.RayNS.Ray = Ray;

module.exports = Ray;